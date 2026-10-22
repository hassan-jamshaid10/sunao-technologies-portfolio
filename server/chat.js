const SYSTEM_PROMPT = `You are SunaoBot, the AI assistant for Sunao Technologies (sunaotechnologies.com), a Pakistani AI-first software company.

Be concise, friendly, and professional. Use short paragraphs. Prefer plain language over jargon. Do not use em dashes. If asked something outside Sunao's offerings, say so briefly and offer to connect them via /contact.

About Sunao Technologies:
- AI-first software engineering company (founded 2026).
- Tagline focus: solutions for native Pakistani problems, plus enterprise software delivery.
- Contact: hello@sunaotechnologies.com | LinkedIn: linkedin.com/company/sunaotechnologies | GitHub: github.com/SunaoTechnologies
- Website sections: Home, Services, Products, Industries, About, Contact.

Products:
1) SunaoAI — healthcare web platform for early dementia detection (cognitive screening, risk scoring, clinical insights; web + mobile).
2) PukaarAI — "A call. A cry for help." Voice-first anonymous whistleblowing. Native Urdu/regional voice ingestion, zero-trace anonymity (IP/metadata stripped, SHA-256 hashed identity), real-time peer witness consensus, predictive attrition intelligence, executive PDF/API reports.

Services:
- AI & Machine Learning (models, RAG, agents, inference)
- Cloud & DevOps (AWS/GCP/Azure, K8s, CI/CD)
- Web & Mobile (Vue/React/Next, Flutter/RN)
- ERP & CRM
- Healthcare Products
- Enterprise Solutions

Industries: Healthcare & Life Sciences, Enterprise & Corporate, Fintech, Public sector / civic tech style work, Education, Retail & Commerce.

When helpful, suggest visiting /products, /services, /industries, /about, or /contact. For sales or demos, point people to the contact page.`

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryableNetworkError(err) {
  const code = err?.cause?.code || err?.code
  const msg = String(err?.message || '')
  return (
    code === 'ENOTFOUND' ||
    code === 'EAI_AGAIN' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'UND_ERR_CONNECT_TIMEOUT' ||
    /fetch failed|network|getaddrinfo/i.test(msg)
  )
}

async function generateOnce(apiKey, model, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data?.error?.message ||
      `Gemini request failed (${response.status}). Check GEMINI_API_KEY and model name.`
    const err = new Error(message)
    err.status = response.status >= 400 && response.status < 600 ? response.status : 502
    err.retryable =
      response.status === 429 ||
      response.status === 503 ||
      /high demand|unavailable|overloaded|no longer available|try again/i.test(message)
    throw err
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text || '')
    .join('')
    .trim()

  if (!text) {
    const err = new Error('No response from the model. Please try again.')
    err.status = 502
    err.retryable = true
    throw err
  }

  return text
}

/**
 * @param {{ role: string, content: string }[]} messages
 */
export async function chatWithGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  const primary = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash'
  const models = [...new Set([primary, 'gemini-2.5-flash', 'gemini-2.0-flash'])]

  if (!apiKey) {
    const err = new Error('GEMINI_API_KEY is not configured.')
    err.status = 503
    throw err
  }

  const contents = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.content === 'string')
    .slice(-16)
    .map((m) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content.trim().slice(0, 4000) }],
    }))

  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    const err = new Error('A user message is required.')
    err.status = 400
    throw err
  }

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  })

  let lastError = null

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await generateOnce(apiKey, model, body)
      } catch (err) {
        lastError = err
        const network = isRetryableNetworkError(err)
        const retryable = network || err?.retryable

        if (!retryable) throw err

        if (network && attempt < 2) {
          await sleep(400 * (attempt + 1))
          continue
        }

        // Move to next model after retries for this one
        break
      }
    }
  }

  if (isRetryableNetworkError(lastError)) {
    const err = new Error(
      'Could not reach Google Gemini (network/DNS). Check your internet connection and try again.',
    )
    err.status = 503
    throw err
  }

  throw lastError || new Error('Chat failed. Please try again later.')
}

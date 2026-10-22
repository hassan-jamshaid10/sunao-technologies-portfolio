import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'
import { chatWithGemini } from './chat.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json({ limit: '96kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, chat: Boolean(process.env.GEMINI_API_KEY?.trim()) })
})

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  if (messages.length > 24) {
    return res.status(400).json({ error: 'Too many messages in this conversation.' })
  }

  try {
    const reply = await chatWithGemini(messages)
    return res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err)
    const status = typeof err?.status === 'number' ? err.status : 500
    return res.status(status).json({
      error: err?.message || 'Chat failed. Please try again later.',
    })
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body ?? {}

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  if (!emailOk) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !CONTACT_FROM) {
    return res.status(503).json({
      error:
        'Email is not configured yet. Set SMTP_* and CONTACT_* variables in your .env file.',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const safeCompany =
      typeof company === 'string' && company.trim() ? company.trim() : 'Not provided'

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email.trim(),
      subject: `Sunao Technologies inquiry from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Company: ${safeCompany}`,
        '',
        message.trim(),
      ].join('\n'),
      html: `
        <h2>New inquiry, Sunao Technologies</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Company:</strong> ${escapeHtml(safeCompany)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
      `,
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('Contact mail error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
})

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const server = app.listen(PORT, () => {
  console.log(`Sunao API listening on http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err?.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Stop the other process (or change PORT) and try again.`,
    )
    process.exit(1)
  }
  console.error(err)
  process.exit(1)
})

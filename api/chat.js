import { chatWithGemini } from '../server/chat.js'

export const config = {
  maxDuration: 60,
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  if (messages.length > 24) {
    return res.status(400).json({ error: 'Too many messages in this conversation.' })
  }

  try {
    const reply = await chatWithGemini(messages)
    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat error:', err)
    const status = typeof err?.status === 'number' ? err.status : 500
    return res.status(status).json({
      error: err?.message || 'Chat failed. Please try again later.',
    })
  }
}

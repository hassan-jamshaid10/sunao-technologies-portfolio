import nodemailer from 'nodemailer'

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
        'Email is not configured yet. Set SMTP_* and CONTACT_* variables in your project settings.',
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

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact mail error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}

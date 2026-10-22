# Sunao Technologies

Portfolio site for Sunao Technologies, AI-first software engineering.

## Stack

- Vue 3 + TypeScript + Vite
- Vercel Serverless Functions (`/api`) for chat + contact
- Express (`server/`) for local API during `npm run dev`
- Gemini-powered **SunaoBot** chat widget

## Setup

```bash
npm install
cp .env.example .env
```

Fill `.env` for local development:

```
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
CONTACT_TO=
CONTACT_FROM=
PORT=3001
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.8-flash
```

## Develop

```bash
npm run dev
```

- Site: http://localhost:5173  
- API: http://localhost:3001 (proxied as `/api` by Vite)

If port `3001` is already in use, stop the old Node process or run:

```bash
npx kill-port 3001
npm run dev
```

## Deploy on Vercel

1. Import the repo in Vercel (framework: Vite, output: `dist`).
2. Add **Environment Variables** (Production + Preview):

| Name | Required | Notes |
|------|----------|--------|
| `GEMINI_API_KEY` | Yes (for SunaoBot) | Server-only. Never use a `VITE_` prefix. |
| `GEMINI_MODEL` | Optional | Defaults to `gemini-3.8-flash` (do not use retired `gemini-2.0-flash`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | For contact form | |
| `CONTACT_TO` / `CONTACT_FROM` | For contact form | |

3. Deploy. Chat hits `POST /api/chat` as a serverless function (60s max).

Local Express is not used on Vercel. Production traffic uses `/api/chat.js` and `/api/contact.js`.

## Scripts

| Command         | Description               |
|-----------------|---------------------------|
| `npm run dev`   | Vite + local Express API  |
| `npm run build` | Production frontend build |
| `npm run start` | Local Express API only    |

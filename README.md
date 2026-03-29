# Portfolio Website

Production-oriented portfolio site for **Anam Tabassum** built with React, TypeScript, Vite, Tailwind CSS, and a Node/Express contact backend.

## What changed

- Reworked the portfolio layout to feel cleaner and less template-generated
- Removed filler sections, decorative cursor effects, and unused shadcn/Supabase/test scaffolding
- Moved portfolio content into a single source file for easier updates
- Fixed the backend to run in ESM mode and added validation, spam protection, rate limiting, and SMTP email delivery

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Nodemailer

## Local development

1. Install dependencies:

```sh
npm install
```

2. Copy the environment file and fill the values:

```sh
copy .env.example .env
```

3. Start frontend and backend together:

```sh
npm run dev:full
```

4. Open:

- Frontend: `http://localhost:8080`
- Backend health check: `http://localhost:5000/health`

## Required environment variables

### Frontend

- `VITE_API_BASE_URL`
  - The public URL of your backend API
  - Local example: `http://localhost:5000`

### Backend

- `CORS_ORIGIN`
  - Your frontend URL
  - Local example: `http://localhost:8080`
- `SMTP_HOST`
  - Your mail server host
- `SMTP_PORT`
  - Usually `587` for TLS or `465` for SSL
- `SMTP_SECURE`
  - `true` for SSL, `false` for STARTTLS/587
- `SMTP_USER`
  - SMTP login username
- `SMTP_PASS`
  - SMTP password or app password
- `CONTACT_TO_EMAIL`
  - Inbox where portfolio messages should arrive
- `CONTACT_FROM_EMAIL`
  - Verified sender email used by the SMTP provider
- `PORTFOLIO_NAME`
  - Brand name shown in outgoing emails
- `PORTFOLIO_OWNER_NAME`
  - Name used in the thank-you reply
- `PORTFOLIO_OWNER_ROLE`
  - Role line shown in the thank-you reply
- `PORTFOLIO_LOCATION`
  - Location shown in the thank-you reply
- `PORTFOLIO_EMAIL`
  - Contact email shown in the thank-you reply
- `PORTFOLIO_SITE_URL`
  - Website URL shown in the thank-you reply

## How to get the credentials

### Gmail SMTP

1. Use a Google account with 2-Step Verification enabled.
2. Open Google Account settings and search for `App passwords`.
3. Create an app password for Mail.
4. Use:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=your-gmail-address`
   - `SMTP_PASS=the-16-character-app-password`
   - `CONTACT_FROM_EMAIL=your-gmail-address`
   - `CONTACT_TO_EMAIL=the inbox you want to receive messages in`

### Other mail providers

Use the SMTP settings from your provider dashboard. You need:

- SMTP host
- SMTP port
- SMTP username
- SMTP password
- A sender email the provider allows

## Contact API

### `GET /health`

Returns current backend status, including whether SMTP is configured.

### `POST /api/contact`

Request body:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "subject": "Project inquiry",
  "message": "Tell me about your project",
  "company": ""
}
```

Notes:

- `company` is a hidden honeypot field and should stay empty
- The backend rate-limits repeated submissions
- If SMTP credentials are missing, the endpoint returns `503`
- When SMTP is configured, the backend sends two emails:
  - A styled notification to `CONTACT_TO_EMAIL`
  - A styled thank-you auto-reply to the sender

## Deployment

### Frontend deployment

1. Add `VITE_API_BASE_URL` in your frontend host settings.
2. Build the app:

```sh
npm run build
```

3. Deploy `dist` to Vercel, Netlify, or another static host.

### Backend deployment

1. Deploy the repository to Render, Railway, or another Node host.
2. Set the backend environment variables listed above.
3. Use the start command:

```sh
npm run server
```

4. Confirm `GET /health` reports the expected SMTP status.
5. Update the frontend `VITE_API_BASE_URL` to the final backend URL.

## Final checklist before deploying

1. Run `npm install` so the cleaned dependency list is applied.
2. Fill `.env` or host environment variables with real SMTP values.
3. Test `POST /api/contact` locally.
4. Build the frontend with `npm run build`.
5. Deploy backend first, then frontend.

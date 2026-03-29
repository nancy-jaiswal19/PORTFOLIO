import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const isPlaceholderValue = (value) => {
  const normalized = String(value || '').trim();
  return (
    !normalized ||
    normalized === 'YOUR_SMTP_USERNAME' ||
    normalized === 'YOUR_SMTP_APP_PASSWORD' ||
    normalized === 'your@email.com'
  );
};

const getEnvValue = (key, fallback = '') => {
  const value = process.env[key];
  return isPlaceholderValue(value) ? fallback : value;
};

const getFirstEnvValue = (keys, fallback = '') => {
  for (const key of keys) {
    const value = getEnvValue(key, '');
    if (value) {
      return value;
    }
  }
  return fallback;
};

const parseCsvEnv = (value) =>
  String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const PORT = Number(process.env.PORT || 5000);
const DEFAULT_CORS_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8081',
];
const LOCAL_DEV_ORIGIN_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?$/i;
const CORS_ORIGINS = parseCsvEnv(process.env.CORS_ORIGIN);
const ALLOWED_CORS_ORIGINS = CORS_ORIGINS.length > 0 ? CORS_ORIGINS : DEFAULT_CORS_ORIGINS;
const PRIMARY_CORS_ORIGIN = ALLOWED_CORS_ORIGINS[0] || 'http://localhost:8080';
const SMTP_HOST = getFirstEnvValue(['SMTP_HOST'], '');
const SMTP_PORT = Number(getFirstEnvValue(['SMTP_PORT'], '587'));
const SMTP_SECURE = getFirstEnvValue(['SMTP_SECURE'], 'false') === 'true';
const SMTP_USER = getFirstEnvValue(['SMTP_USER', 'EMAIL_USER', 'GMAIL_USER'], '');
const SMTP_PASS = getFirstEnvValue(['SMTP_PASS', 'EMAIL_PASS', 'GMAIL_APP_PASSWORD'], '');
const CONTACT_TO_EMAIL = getFirstEnvValue(['CONTACT_TO_EMAIL', 'RECEIVER_EMAIL'], '');
const CONTACT_FROM_EMAIL = getFirstEnvValue(
  ['CONTACT_FROM_EMAIL', 'SMTP_FROM_EMAIL', 'SENDER_EMAIL'],
  SMTP_USER || '',
);
const PORTFOLIO_NAME = process.env.PORTFOLIO_NAME || 'Olive Grove Studio';
const PORTFOLIO_OWNER_NAME = process.env.PORTFOLIO_OWNER_NAME || 'Nancy Jaiswal';
const PORTFOLIO_OWNER_ROLE =
  process.env.PORTFOLIO_OWNER_ROLE || 'Software Engineer and FullStack Developer';
const PORTFOLIO_LOCATION = process.env.PORTFOLIO_LOCATION || 'SiddharthNagar, Uttar Pradesh, India';
const PORTFOLIO_EMAIL = process.env.PORTFOLIO_EMAIL || CONTACT_TO_EMAIL || CONTACT_FROM_EMAIL;
const PORTFOLIO_SITE_URL = process.env.PORTFOLIO_SITE_URL || PRIMARY_CORS_ORIGIN;

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        ALLOWED_CORS_ORIGINS.includes(origin) ||
        LOCAL_DEV_ORIGIN_PATTERN.test(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);
app.use(express.json({ limit: '1mb' }));

const rateLimitStore = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeText = (value, maxLength) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (value) => escapeHtml(value).replace(/\n/g, '<br />');

const renderEmailShell = ({ eyebrow, title, intro, body, footer }) => `
  <div style="margin:0;padding:32px 16px;background:#f5f0e6;font-family:Arial,sans-serif;color:#2f2416;">
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(180deg,#fffdf8 0%,#f7f1e6 100%);border:1px solid #ded4bf;border-radius:28px;overflow:hidden;box-shadow:0 24px 60px rgba(73,52,24,0.12);">
      <div style="padding:32px 36px;background:linear-gradient(135deg,#5b4631 0%,#7c6243 100%);color:#f9f4ea;">
        <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.78;">${escapeHtml(eyebrow)}</div>
        <div style="margin-top:14px;font-size:30px;line-height:1.2;font-weight:700;">${escapeHtml(title)}</div>
        <div style="margin-top:12px;font-size:15px;line-height:1.75;color:#efe5d2;">${escapeHtml(intro)}</div>
      </div>
      <div style="padding:32px 36px 16px;">${body}</div>
      <div style="padding:0 36px 32px;font-size:13px;line-height:1.75;color:#6b5a43;">${footer}</div>
    </div>
  </div>
`;

const renderOwnerNotificationEmail = (payload) =>
  renderEmailShell({
    eyebrow: 'New inquiry',
    title: 'A new message arrived from your portfolio',
    intro: 'Someone just used the contact form. Their details and message are included below.',
    body: `
      <div style="display:grid;gap:14px;">
        <div style="padding:18px 20px;background:#fbf7ef;border:1px solid #e8dcc6;border-radius:20px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">Sender</div>
          <div style="margin-top:8px;font-size:18px;font-weight:700;color:#342717;">${escapeHtml(payload.name)}</div>
          <div style="margin-top:4px;font-size:14px;color:#6d5b44;">${escapeHtml(payload.email)}</div>
        </div>
        <div style="padding:18px 20px;background:#fbf7ef;border:1px solid #e8dcc6;border-radius:20px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">Subject</div>
          <div style="margin-top:8px;font-size:16px;font-weight:700;color:#342717;">${escapeHtml(payload.subject)}</div>
        </div>
        <div style="padding:20px;background:#ffffff;border:1px solid #e8dcc6;border-radius:20px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">Message</div>
          <div style="margin-top:12px;font-size:15px;line-height:1.8;color:#3d301f;">${nl2br(payload.message)}</div>
        </div>
      </div>
    `,
    footer: `
      Reply directly to this email to answer ${escapeHtml(payload.name)}.
    `,
  });

const renderAutoReplyEmail = (payload) =>
  renderEmailShell({
    eyebrow: PORTFOLIO_NAME,
    title: `Thanks for reaching out, ${payload.name}`,
    intro: `Your message has been received by ${PORTFOLIO_OWNER_NAME}. This is a confirmation that your inquiry was delivered successfully.`,
    body: `
      <div style="padding:22px;background:#ffffff;border:1px solid #e8dcc6;border-radius:20px;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">Your message</div>
        <div style="margin-top:10px;font-size:16px;font-weight:700;color:#342717;">${escapeHtml(payload.subject)}</div>
        <div style="margin-top:12px;font-size:15px;line-height:1.8;color:#3d301f;">${nl2br(payload.message)}</div>
      </div>
      <div style="margin-top:18px;padding:22px;background:#f6efe2;border:1px solid #e8dcc6;border-radius:20px;">
        <div style="font-size:18px;font-weight:700;color:#342717;">${escapeHtml(PORTFOLIO_OWNER_NAME)}</div>
        <div style="margin-top:4px;font-size:14px;color:#6d5b44;">${escapeHtml(PORTFOLIO_OWNER_ROLE)}</div>
        <div style="margin-top:12px;font-size:14px;line-height:1.8;color:#5d4b36;">
          Location: ${escapeHtml(PORTFOLIO_LOCATION)}<br />
          Email: <a href="mailto:${escapeHtml(PORTFOLIO_EMAIL)}" style="color:#5b4631;">${escapeHtml(PORTFOLIO_EMAIL)}</a><br />
          Website: <a href="${escapeHtml(PORTFOLIO_SITE_URL)}" style="color:#5b4631;">${escapeHtml(PORTFOLIO_SITE_URL)}</a>
        </div>
      </div>
    `,
    footer: `
      You can reply to this email if you want to add context before the full response arrives.
    `,
  });

const renderOwnerNotificationText = (payload) =>
  `New portfolio inquiry\n\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`;

const renderAutoReplyText = (payload) =>
  `Hi ${payload.name},\n\nThanks for reaching out to ${PORTFOLIO_OWNER_NAME}. This is a confirmation that your message was received.\n\nSubject: ${payload.subject}\nMessage:\n${payload.message}\n\nYou can reply to this email if you want to add more details.\n\n${PORTFOLIO_OWNER_NAME}\n${PORTFOLIO_OWNER_ROLE}\n${PORTFOLIO_EMAIL}\n${PORTFOLIO_SITE_URL}`;

const missingSmtpEnv = [
  !SMTP_HOST ? 'SMTP_HOST' : null,
  !SMTP_USER ? 'SMTP_USER' : null,
  !SMTP_PASS ? 'SMTP_PASS' : null,
  !CONTACT_TO_EMAIL ? 'CONTACT_TO_EMAIL' : null,
  !CONTACT_FROM_EMAIL ? 'CONTACT_FROM_EMAIL' : null,
].filter(Boolean);

const hasEmailConfig = missingSmtpEnv.length === 0;

let transporter = null;
if (hasEmailConfig) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  transporter
    .verify()
    .then(() => {
      console.log('[contact-backend] SMTP connection verified.');
    })
    .catch((error) => {
      console.error('[contact-backend] SMTP verification failed:', error.message);
    });
}

if (!hasEmailConfig) {
  console.warn(
    `[contact-backend] SMTP credentials are incomplete. Missing: ${missingSmtpEnv.join(
      ', ',
    )}. Email forwarding is disabled.`,
  );
}

const applyRateLimit = (req, res, next) => {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now - current.windowStart > WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  if (current.count >= MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too many requests. Please wait a few minutes before trying again.',
    });
    return;
  }

  current.count += 1;
  next();
};

const validatePayload = (body) => {
  const company = sanitizeText(body.company, 200);
  if (company) {
    return { ok: false, status: 400, error: 'Spam protection triggered.' };
  }

  const payload = {
    name: sanitizeText(body.name, 100),
    email: sanitizeText(body.email, 255),
    subject: sanitizeText(body.subject, 200),
    message: sanitizeText(body.message, 2000),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return { ok: false, status: 400, error: 'All fields are required.' };
  }

  if (!emailPattern.test(payload.email)) {
    return { ok: false, status: 400, error: 'Enter a valid email address.' };
  }

  return { ok: true, payload };
};

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    email: hasEmailConfig ? 'configured' : 'not-configured',
    missing: {
      smtp: hasEmailConfig ? [] : missingSmtpEnv,
    },
  });
});

app.post('/api/contact', applyRateLimit, async (req, res) => {
  const result = validatePayload(req.body || {});

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  if (!hasEmailConfig) {
    res.status(503).json({
      error: 'Contact service is not configured yet. Set SMTP credentials before using this form.',
      missing: {
        smtp: missingSmtpEnv,
      },
    });
    return;
  }

  const { payload } = result;

  try {
    if (transporter) {
      await Promise.all([
        transporter.sendMail({
          to: CONTACT_TO_EMAIL,
          from: CONTACT_FROM_EMAIL,
          replyTo: payload.email,
          subject: `[Portfolio Contact] ${payload.subject}`,
          text: renderOwnerNotificationText(payload),
          html: renderOwnerNotificationEmail(payload),
        }),
        transporter.sendMail({
          to: payload.email,
          from: CONTACT_FROM_EMAIL,
          replyTo: CONTACT_TO_EMAIL || CONTACT_FROM_EMAIL,
          subject: `Thanks for contacting ${PORTFOLIO_OWNER_NAME}`,
          text: renderAutoReplyText(payload),
          html: renderAutoReplyEmail(payload),
        }),
      ]);
    }

    res.status(201).json({
      message: 'Message sent successfully. A thank-you email has been sent to your inbox.',
      emailed: true,
      autoReplied: true,
    });
  } catch (error) {
    console.error('Error handling /api/contact:', error);
    if (error?.code === 'EAUTH' || error?.responseCode === 535) {
      res.status(502).json({
        error:
          'SMTP login failed. Update SMTP_USER and SMTP_PASS (use a valid Gmail App Password) and try again.',
      });
      return;
    }

    if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT') {
      res.status(502).json({
        error: 'Unable to connect to SMTP server right now. Please try again in a moment.',
      });
      return;
    }

    if (error?.code === 'EENVELOPE') {
      res.status(400).json({
        error: 'Email address is invalid or rejected by the mail provider.',
      });
      return;
    }

    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend listening on port ${PORT}`);
});

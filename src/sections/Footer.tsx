import { useEffect, useState } from 'react';
import { profile } from '@/content/portfolio';

const menuLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks: Array<{ label: string; href?: string; phone?: string }> = [
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
  { label: 'Email', href: profile.links.email },
  { label: 'Phone', phone: profile.phone },
];

const labelStyle = {
  margin: 0,
  fontFamily: "'Syne', sans-serif",
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: 'rgba(97, 67, 37, 0.7)',
};

const timeZone = 'Asia/Kolkata';

const getClockParts = () => {
  const now = new Date();
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .formatToParts(now)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {});

  const dateLabel = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(now);

  return {
    hour: timeParts.hour ?? '00',
    minute: timeParts.minute ?? '00',
    second: timeParts.second ?? '00',
    dateLabel,
  };
};

const Footer = () => {
  const [clock, setClock] = useState(getClockParts);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 1500);
    } catch {
      setPhoneCopied(false);
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(getClockParts());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <footer
        style={{
          position: 'relative',
          overflow: 'hidden',
          color: '#24170f',
          background:
            'linear-gradient(180deg, #fbf6ef 0%, #f4e6d3 30%, #f0d0bc 65%, #ebb08f 100%)',
          padding: '34px 28px 12px',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 14%, rgba(255,255,255,0.55), transparent 28%), radial-gradient(circle at 85% 24%, rgba(255,244,236,0.65), transparent 26%)',
            pointerEvents: 'none',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-90px',
            bottom: '-110px',
            width: '280px',
            height: '280px',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(255,247,241,0.35) 0%, rgba(255,247,241,0) 72%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '1320px',
            margin: '0 auto',
            borderTop: '1px solid rgba(99, 68, 37, 0.18)',
            paddingTop: '34px',
          }}
        >
          <div className="footer-grid">
            <div>
              <p style={labelStyle}>Navigate</p>
              <nav className="footer-links">
                {menuLinks.map((link) => (
                  <a key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p style={labelStyle}>Connect</p>
              <div className="footer-links">
                {socialLinks.map((link) => {
                  const isPhoneLink = link.label === 'Phone';

                  if (isPhoneLink) {
                    return (
                      <span key={link.label} className="footer-phone-wrap">
                        <button
                          type="button"
                          onClick={copyPhoneNumber}
                          className="footer-link footer-link-phone"
                          aria-label="Copy phone number"
                          title="Copy phone number"
                        >
                          {link.label}
                        </button>
                        <span className="footer-phone-popup">{phoneCopied ? 'Copied' : (link.phone ?? profile.phone)}</span>
                      </span>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href ?? '#'}
                      target={link.href?.startsWith('http') ? '_blank' : undefined}
                      rel={link.href?.startsWith('http') ? 'noreferrer' : undefined}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <a href="#contact" className="footer-cta">
              <span className="footer-cta-shine" aria-hidden />
              <div className="footer-timer-shell">
                <div
                  className="footer-timer"
                  aria-label={`Local time ${clock.hour}:${clock.minute}:${clock.second}`}
                >
                  {[clock.hour, clock.minute, clock.second].map((unit, index) => (
                    <div key={`${index}-${unit}`} className="footer-time-group">
                      <div className="footer-time-card">
                        <span className="footer-time-value">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="footer-timer-date">{clock.dateLabel}</div>
              </div>
            </a>
          </div>

          <div className="footer-status">
            <span className="footer-status-dot" />
            <span>Always learning and open to new technologies and collaborations.</span>
          </div>

          <div className="footer-wordmark">{profile.name.toUpperCase()}</div>

          <div className="footer-bottom">
            <p style={{ margin: 0 }}>© 2026 {profile.name}</p>
            <p style={{ margin: 0 }}>Built for backend, data, and clear storytelling.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(140px, 0.7fr)) minmax(320px, 1.15fr);
          gap: 28px;
          align-items: start;
        }

        .footer-links {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          width: fit-content;
          text-decoration: none;
          color: #24170f;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.15rem, 2vw, 1.6rem);
          line-height: 1.15;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }

        .footer-link:hover {
          transform: translateX(5px);
          color: #7d5730;
          opacity: 0.86;
        }

        .footer-link-phone {
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .footer-phone-wrap {
          position: relative;
          width: fit-content;
        }

        .footer-phone-popup {
          position: absolute;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%) translateX(-6px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(138, 108, 62, 0.28);
          background: rgba(255, 251, 244, 0.96);
          color: #5b4128;
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          user-select: text;
          box-shadow: 0 8px 22px rgba(58, 44, 26, 0.14);
          transition: opacity 220ms ease, transform 220ms ease;
          z-index: 3;
        }

        .footer-phone-wrap:hover .footer-phone-popup,
        .footer-phone-wrap:focus-within .footer-phone-popup {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .footer-cta {
          position: relative;
          overflow: hidden;
          display: block;
          text-decoration: none;
          transition: transform 300ms ease, opacity 300ms ease;
        }

        .footer-cta:hover {
          transform: translateY(-4px);
          opacity: 0.98;
        }

        .footer-cta-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.46) 45%, transparent 72%);
          transform: translateX(-140%);
          transition: transform 800ms ease;
          pointer-events: none;
        }

        .footer-cta:hover .footer-cta-shine {
          transform: translateX(140%);
        }

        .footer-timer-shell {
          position: relative;
          padding: 4px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-timer {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .footer-time-group {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-time-card {
          position: relative;
          width: 100%;
          min-width: 0;
          padding: 4px 2px 10px;
          text-align: center;
          overflow: hidden;
          animation: footerFloat 4.6s ease-in-out infinite;
        }

        .footer-time-group:nth-child(2) .footer-time-card {
          animation-delay: 0.16s;
        }

        .footer-time-group:nth-child(3) .footer-time-card {
          animation-delay: 0.32s;
        }

        .footer-time-card::before {
          content: '';
          position: absolute;
          left: 20%;
          right: 20%;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,101,62,0.2), transparent);
        }

        .footer-time-value {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.9rem);
          font-weight: 700;
          line-height: 0.95;
          color: #2c1b11;
          letter-spacing: -0.05em;
          animation: footerTick 0.52s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-time-group:not(:last-child)::after {
          content: ':';
          position: absolute;
          right: -11px;
          top: 14%;
          font-family: 'Manrope', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1;
          color: rgba(138, 98, 56, 0.48);
        }

        .footer-timer-date {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(90, 61, 36, 0.72);
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        @keyframes footerFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes footerTick {
          0% {
            opacity: 0.22;
            transform: translateY(12px) scale(0.92);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .footer-wordmark {
          margin-top: 28px;
          text-align: center;
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.35rem, 6.4vw, 5rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.075em;
          color: rgba(20, 11, 7, 0.96);
          word-break: keep-all;
        }

        .footer-status {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid rgba(99, 68, 37, 0.14);
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #6a4a2b;
        }

        .footer-status-dot {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          border-radius: 999px;
          background: #67df6c;
          box-shadow: 0 0 0 6px rgba(103, 223, 108, 0.08);
        }

        .footer-bottom {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: #5e4331;
        }

        @media (max-width: 1080px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 900px) {
          .footer-wordmark {
            font-size: clamp(2.3rem, 11vw, 4.2rem);
            line-height: 0.96;
            letter-spacing: -0.05em;
          }
        }

        @media (max-width: 720px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .footer-timer-shell {
            padding: 0;
          }

          .footer-timer {
            gap: 8px;
          }

          .footer-time-card {
            padding: 4px 2px 8px;
          }

          .footer-time-value {
            font-size: clamp(1.6rem, 9vw, 2.2rem);
          }

          .footer-time-group:not(:last-child)::after {
            right: -6px;
            top: 12%;
            font-size: 1.2rem;
          }

          .footer-wordmark {
            margin-top: 28px;
            text-align: left;
            font-size: clamp(3.2rem, 18vw, 5.8rem);
            line-height: 0.95;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-status {
            font-size: 13px;
          }

          .footer-phone-popup {
            left: 0;
            top: calc(100% + 8px);
            transform: translateY(0);
          }

          .footer-phone-wrap:hover .footer-phone-popup,
          .footer-phone-wrap:focus-within .footer-phone-popup {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

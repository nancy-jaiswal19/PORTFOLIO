import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/portfolio';

const links = [
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.links.github, Icon: Github },
  { label: 'Email', href: profile.links.email, Icon: Mail },
];

const FloatingSocialRail = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: '8px',
          top: '58%',
          transform: 'translateY(-50%)',
          zIndex: 45,
        }}
        className="global-social-rail"
      >
        <div
          style={{
            borderRadius: '32px',
            padding: '10px',
            border: '1px solid rgba(255,255,255,0.22)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(125,95,79,0.34) 34%, rgba(84,61,50,0.82) 100%)',
            boxShadow: '0 22px 56px rgba(76, 50, 34, 0.26)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f7ede3',
                  background: 'rgba(97, 76, 63, 0.9)',
                  transition: 'transform 220ms ease, background 220ms ease',
                }}
                onMouseEnter={(event) => {
                  const el = event.currentTarget;
                  el.style.transform = 'translateY(-2px)';
                  el.style.background = 'rgba(71, 52, 42, 0.98)';
                }}
                onMouseLeave={(event) => {
                  const el = event.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.background = 'rgba(97, 76, 63, 0.9)';
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .global-social-rail {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingSocialRail;

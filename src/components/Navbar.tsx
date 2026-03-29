import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { profile } from '@/content/portfolio';
import brandLogo from '../../logo.png';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'CV', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

/* ── tiny animated dot indicator ── */
const ActiveDot = () => (
  <motion.span
    layoutId="nav-dot"
    className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#8a6c3e]"
    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
  />
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#about');

  /* scroll → glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* scroll spy → highlight active section */
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    let ticking = false;

    const updateActiveLink = () => {
      const marker = window.scrollY + 140;
      let currentHref = `#${ids[0]}`;

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.offsetTop <= marker) {
          currentHref = `#${id}`;
        }
      }

      setActiveLink((prev) => (prev === currentHref ? prev : currentHref));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
    };

    updateActiveLink();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const firstName = profile?.name?.split(' ')[0] ?? 'Portfolio';

  return (
    <>
      {/* ── Google Font ── */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500&display=swap');`}</style>

      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s',
          background: scrolled
            ? 'rgba(240,235,225,0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(138,108,62,0.12), 0 8px 32px rgba(58,44,26,0.06)' : 'none',
        }}
      >
        {/* ── Thin top accent line ── */}
        <div style={{
          height: '2px',
          background: scrolled
            ? 'linear-gradient(90deg, transparent, #c5a876 30%, #a0844a 50%, #c5a876 70%, transparent)'
            : 'transparent',
          transition: 'background 0.5s',
        }} />

        <div
          className="nav-shell"
          style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          height: '72px',
          fontFamily: "'DM Sans', sans-serif",
          }}
        >

          {/* ── Logo ── */}
          <a
            href="#top"
            className="nav-brand"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}
          >
           
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', transform: 'translateY(1px)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '1px' }}>
                <span
                  className="nav-brand-name"
                  style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px', fontWeight: 700,
                  color: '#2a1f10', letterSpacing: '-0.02em',
                  }}
                >
                  {firstName}
                </span>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px', fontWeight: 700,
                  color: '#a0844a', lineHeight: 1,
                }}>.</span>
              </span>
              {/* small tagline beside logo */}
              <span
                className="nav-brand-tag"
                style={{
                fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#a0844a', opacity: 0.7,
                lineHeight: 1,
                alignSelf: 'baseline',
                paddingBottom: '2px',
                }}
              >
                Portfolio
              </span>
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginLeft: 'auto',
              flexShrink: 0,
            }}
            className="hidden-mobile"
          >
            {navLinks.map(link => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    padding: '6px 14px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#2a1f10' : '#6b5230',
                    textDecoration: 'none',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(197,168,118,0.18)' : 'transparent',
                    transition: 'all 0.2s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(197,168,118,0.10)';
                    (e.currentTarget as HTMLElement).style.color = '#2a1f10';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = isActive ? '#2a1f10' : '#6b5230';
                  }}
                >
                  {link.label}
                  {isActive && <ActiveDot />}
                </a>
              );
            })}

            {/* Divider */}
            <div style={{ width: '1px', height: '18px', background: 'rgba(138,108,62,0.25)', margin: '0 6px' }} />

            {/* Resume link */}
            <a
              href={profile?.resumePath ?? '#'}
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '6px 14px',
                fontSize: '13.5px', fontWeight: 500,
                color: '#6b5230', textDecoration: 'none',
                borderRadius: '999px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(197,168,118,0.10)';
                (e.currentTarget as HTMLElement).style.color = '#2a1f10';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#6b5230';
              }}
            >
              <Download size={12} strokeWidth={2.2} />
              CV
            </a>

            {/* CTA pill */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                marginLeft: '8px',
                padding: '9px 22px',
                fontSize: '13px', fontWeight: 600,
                color: '#f5f0e8',
                background: 'linear-gradient(135deg, #4a3520 0%, #3a2c1a 60%, #5c4020 100%)',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(58,44,26,0.30), inset 0 1px 0 rgba(255,255,255,0.08)',
                transition: 'all 0.25s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-1.5px)';
                el.style.boxShadow = '0 8px 22px rgba(58,44,26,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 14px rgba(58,44,26,0.30), inset 0 1px 0 rgba(255,255,255,0.08)';
              }}
            >
              Let's Talk
              <span style={{ fontSize: '15px', lineHeight: 1 }}>→</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'none',
              marginLeft: 'auto',
              background: 'rgba(197,168,118,0.15)',
              border: '1px solid rgba(138,108,62,0.25)',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              color: '#3a2c1a',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="nav-mobile-drawer"
              style={{
                background: 'rgba(240,235,225,0.96)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(197,168,118,0.25)',
                padding: '20px 24px 28px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {/* Mobile links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '12px 16px',
                      fontSize: '15px', fontWeight: 500,
                      color: activeLink === link.href ? '#2a1f10' : '#6b5230',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      background: activeLink === link.href ? 'rgba(197,168,118,0.18)' : 'transparent',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}
                  >
                    {link.label}
                    {activeLink === link.href && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a0844a' }} />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Mobile bottom row */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(197,168,118,0.2)' }}>
                <a
                  href={profile?.resumePath ?? '#'}
                  download
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '11px', fontSize: '13px', fontWeight: 500,
                    color: '#3a2c1a', textDecoration: 'none',
                    border: '1px solid rgba(138,108,62,0.35)',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.4)',
                  }}
                >

                  <Download size={13} /> CV
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '11px', fontSize: '13px', fontWeight: 600,
                    color: '#f5f0e8', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #4a3520, #3a2c1a)',
                    borderRadius: '999px',
                    boxShadow: '0 3px 12px rgba(58,44,26,0.25)',
                  }}
                >
                  Let's Talk →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Responsive helpers ── */}
      <style>{`
        @media (max-width: 1360px) {
          .nav-shell { padding: 0 22px !important; }
        }
        @media (max-width: 1100px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
          .nav-shell {
            padding: 0 16px !important;
            height: 66px !important;
          }
          .nav-brand-tag { display: none !important; }
        }
        @media (max-width: 620px) {
          .nav-shell {
            padding: 0 12px !important;
            height: 62px !important;
          }
          .nav-brand-name { font-size: 19px !important; }
          .nav-mobile-drawer {
            max-height: calc(100svh - 62px);
            overflow-y: auto;
          }
        }
        @media (max-width: 420px) {
          .nav-brand {
            gap: 7px !important;
          }
          .nav-brand-name { font-size: 17px !important; }
        }
        @media (min-width: 1101px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

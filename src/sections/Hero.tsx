import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { SiCplusplus, SiNextdotjs, SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import { FaBolt, FaDatabase } from "react-icons/fa";

/* ─── Animated Counter ─────────────────────────────────────────────── */
const Counter = ({ target, suffix = "", duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const tick = () => {
        start += step;
        if (start >= target) { setCount(target); return; }
        setCount(Math.floor(start));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Skill Pill ───────────────────────────────────────────────────── */
const SkillPill = ({ label, icon: Icon, delay }) => (
  <span className="skill-pill" style={{ animationDelay: `${delay}ms` }}>
    {Icon && (
      <span className="pill-icon">
        <Icon />
      </span>
    )}
    {label}
  </span>
);

/* ─── Main Hero ────────────────────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  const scrollToSection = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const navOffset = 86;
    const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const skills = [
    { label: "C++", icon: SiCplusplus },
    { label: "Next.js", icon: SiNextdotjs },
    { label: "React", icon: SiReact },
    { label: "Node.js", icon: SiNodedotjs },
    { label: "Socket.io", icon: FaBolt },
    { label: "MongoDB", icon: SiMongodb },
    { label: "SQL", icon: FaDatabase },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --sand-light:   #faf7f1;
          --sand-mid:     #f7f1e6;
          --sand-warm:    #ead8c3;
          --sand-tan:     #e2ccb4;
          --ink-deep:     #24170f;
          --ink-dark:     #2a1f10;
          --ink-rich:     #3f2f1f;
          --ink-med:      #4a3621;
          --walnut:       #705136;
          --honey:        #b08949;
          --amber:        #a0844a;
          --gold:         #c5a876;
          --gold-light:   #d4aa70;
          --sienna:       #7b5930;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--sand-light);
          min-height: 100vh;
        }

        /* Hero wrapper */
        .hero-wrap {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--sand-light);
          padding: 90px 24px;
        }

        /* ── Layered backgrounds ── */
        .bg-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 256px;
        }

        .bg-radial {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: background 0.5s ease;
        }

        .bg-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.055;
          background-image: radial-gradient(circle, #7b5930 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%);
        }

        /* ── Floating orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(60px);
          will-change: transform;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(212,170,112,0.28) 0%, transparent 65%);
          top: -120px; right: -100px;
          animation-duration: 9s;
        }
        .orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(176,137,73,0.20) 0%, transparent 65%);
          bottom: -80px; left: -80px;
          animation-duration: 11s; animation-delay: -4s;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(197,168,118,0.22) 0%, transparent 65%);
          top: 40%; left: 10%;
          animation-duration: 13s; animation-delay: -7s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-24px) scale(1.03); }
          66% { transform: translateY(14px) scale(0.97); }
        }

        /* ── Corner marks ── */
        .corner {
          position: absolute;
          width: 64px; height: 64px;
          z-index: 3;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .corner.visible { opacity: 0.3; }
        .corner-tl { top: 28px; left: 28px; }
        .corner-br { bottom: 28px; right: 28px; }

        /* ── Horizontal rule lines ── */
        .hero-halo {
          position: absolute;
          pointer-events: none;
          z-index: 2;
          border-radius: 999px;
          border: 1px solid rgba(197,168,118,0.22);
          background: radial-gradient(circle at center, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 38%, transparent 72%);
          box-shadow: inset 0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(197,168,118,0.08);
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s;
        }
        .hero-halo.visible { opacity: 0.7; transform: scale(1); }
        .hero-halo-left {
          width: 260px;
          height: 260px;
          top: 18%;
          left: 6%;
        }
        .hero-halo-right {
          width: 320px;
          height: 320px;
          right: 4%;
          bottom: 14%;
        }
        .hero-halo::after {
          content: '';
          position: absolute;
          inset: 18%;
          border-radius: inherit;
          border: 1px dashed rgba(160,132,74,0.18);
        }

        /* ── Label chip ── */
        .label-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212,170,112,0.12);
          border: 1px solid rgba(197,168,118,0.4);
          border-radius: 999px;
          padding: 6px 16px 6px 10px;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--sienna);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .label-chip.visible { opacity: 1; transform: translateY(0); }
        .chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold);
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* ── Headline ── */
        .headline-wrap {
          position: relative;
          overflow: visible;
          padding-bottom: 0.12em;
        }
        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5.4vw, 68px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--ink-dark);
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .headline.visible {
          opacity: 1; transform: translateY(0);
        }
        .headline em {
          font-style: italic;
          color: var(--amber);
          position: relative;
        }
        .headline em::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, var(--gold-light), var(--amber));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1s;
          border-radius: 2px;
        }
        .headline.visible em::after { transform: scaleX(1); }

        /* ── Tagline ── */
        .tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 300;
          color: var(--ink-med);
          line-height: 1.75;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s;
        }
        .tagline.visible { opacity: 0.8; transform: translateY(0); }

        /* ── CTA buttons ── */
        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s;
        }
        .btn-row.visible { opacity: 1; transform: translateY(0); }
        .btn-row a {
          transform: translateY(0) scale(1);
          transition: transform 0.26s cubic-bezier(0.16,1,0.3,1), box-shadow 0.26s ease, background-color 0.26s ease, border-color 0.26s ease;
          will-change: transform;
        }
        .btn-row a:hover { transform: translateY(-3px) scale(1.01); }
        .btn-row a:active { transform: translateY(-1px) scale(0.99); }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 999px;
          background: var(--ink-dark);
          color: var(--sand-light);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
          box-shadow: 0 6px 28px rgba(42,31,16,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(197,168,118,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-primary:hover { box-shadow: 0 12px 40px rgba(42,31,16,0.3); }
        .btn-primary:hover::before { opacity: 1; }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 30px;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
          color: var(--ink-rich);
          border: 1.5px solid rgba(197,168,118,0.6);
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 6px 20px rgba(60,42,20,0.07);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.65);
          border-color: var(--gold);
          box-shadow: 0 10px 28px rgba(60,42,20,0.14);
        }

        /* ── Skill pills ── */
        .pills-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }
        .pills-row.visible { opacity: 1; transform: translateY(0); }

        .skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--ink-rich);
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(197,168,118,0.45);
          background: rgba(250,247,241,0.6);
          backdrop-filter: blur(8px);
          cursor: default;
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          animation: pillIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .skill-pill:hover {
          border-color: var(--gold);
          background: rgba(255,255,255,0.75);
          transform: translateY(-2px) scale(1.02) !important;
        }
        @keyframes pillIn {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pill-icon { font-size: 14px; }

        /* ── Stats bar ── */
        .stats-bar {
          display: flex;
          gap: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s ease 0.75s, transform 0.9s ease 0.75s;
          border: 1px solid rgba(197,168,118,0.3);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(16px);
          background: rgba(250,247,241,0.55);
        }
        .stats-bar.visible { opacity: 1; transform: translateY(0); }
        .stat-item {
          padding: 18px 36px;
          text-align: center;
          position: relative;
        }
        .stat-item + .stat-item::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; height: 60%;
          width: 1px;
          background: rgba(197,168,118,0.35);
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--ink-dark);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--amber);
          margin-top: 4px;
        }

        /* ── Scroll cue ── */
        .scroll-cue {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 3;
          opacity: 0;
          transition: opacity 1s ease 1.4s;
        }
        .scroll-cue.visible { opacity: 0.45; }
        .scroll-text {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--amber);
        }
        .scroll-track {
          width: 1px;
          height: 40px;
          background: var(--sand-tan);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .scroll-thumb {
          width: 100%;
          height: 40%;
          background: linear-gradient(to bottom, var(--gold), transparent);
          border-radius: 2px;
          animation: scrollThumb 1.8s ease-in-out infinite;
        }
        @keyframes scrollThumb {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }

        /* ── Decorative diagonal line ── */
        .deco-line { display: none; }

        /* ── Content column ── */
        .content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          max-width: 860px;
          width: 100%;
          margin-top: 0;
        }

        /* ── Floating accent badge ── */
        .accent-badge {
          position: absolute;
          z-index: 4;
          opacity: 0;
          transition: opacity 1s ease 1.1s;
        }
        .accent-badge.visible { opacity: 1; }
        .badge-left { top: 30%; left: 4%; }
        .badge-right { top: 25%; right: 4%; }
        .badge-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          writing-mode: vertical-lr;
          font-family: 'Syne', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.6;
        }
        .badge-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--gold-light), transparent);
          margin: 0 auto;
        }

        @media (max-width: 1100px) {
          .hero-wrap {
            min-height: 92svh;
            padding: 86px 20px;
          }
          .content {
            max-width: 760px;
            gap: 20px;
          }
          .headline {
            font-size: clamp(32px, 6vw, 56px);
            line-height: 1.1;
          }
          .tagline {
            font-size: clamp(15px, 2vw, 18px);
            line-height: 1.62;
          }
          .pills-row {
            gap: 9px;
          }
        }

        @media (max-width: 768px) {
          .hero-wrap {
            min-height: 100dvh;
            padding: 80px 16px;
          }
          .content {
            gap: 18px;
          }
          .btn-row {
            width: 100%;
            gap: 10px;
          }
          .btn-primary,
          .btn-outline {
            width: 100%;
            justify-content: center;
          }
          .pills-row {
            gap: 8px;
          }
          .scroll-cue {
            bottom: 20px;
          }
          .accent-badge { display: none; }
          .stat-item { padding: 14px 22px; }
          .stat-num { font-size: 26px; }
        }

        @media (max-width: 520px) {
          .headline br { display: none; }
          .headline {
            font-size: clamp(28px, 10.5vw, 38px);
            line-height: 1.08;
          }
          .tagline {
            font-size: 14px;
            line-height: 1.55;
          }
          .btn-primary,
          .btn-outline {
            padding: 12px 18px;
            font-size: 12px;
            letter-spacing: 0.045em;
          }
          .pills-row {
            gap: 7px;
          }
          .skill-pill {
            padding: 7px 12px;
            font-size: 11.5px;
          }
        }
      `}</style>

      <section
        id="top"
        className="hero-wrap"
      >
        {/* ── Content ── */}
        <div className="content">

          {/* Headline */}
          <div className="headline-wrap">
            <h1
              className={`headline ${loaded ? "visible" : ""}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Engineering <em>real-time</em> systems <br/>with web architecture<br/> & algorithmic precision.
              {/* High-performance full<br/>-stack engineering driven<br/> by <em>algorithmic excellence</em> */}
              
            </h1>
          </div>

          {/* Tagline */}
          <p
            className={`tagline ${loaded ? "visible" : ""}`}
            style={{ maxWidth: 580 }}
          >
            Where curiosity meets code — and raw data becomes
            meaningful innovation that actually moves the needle.
          </p>

          {/* CTA row */}
          <div className={`btn-row ${loaded ? "visible" : ""}`}>
            <a href="#projects" onClick={scrollToSection("projects")} className="btn-primary">
              View Projects <ArrowRight size={13} />
            </a>
            <a href="#contact" onClick={scrollToSection("contact")} className="btn-outline">
              <Mail size={13} /> Contact Me
            </a>
            <a href={profile.resumePath} download={profile.resumeFileName} className="btn-outline">
              <Download size={13} /> Resume
            </a>
          </div>

          {/* Skill pills */}
          <div className={`pills-row ${loaded ? "visible" : ""}`}>
            {skills.map((s, i) => (
              <SkillPill key={s.label} label={s.label} icon={s.icon} delay={700 + i * 80} />
            ))}
          </div>

        </div>

        {/* Scroll cue */}
        <div className={`scroll-cue ${loaded ? "visible" : ""}`}>
          <div className="scroll-text">Scroll</div>
          <div className="scroll-track">
            <div className="scroll-thumb" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

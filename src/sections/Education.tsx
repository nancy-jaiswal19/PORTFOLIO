'use client';

import { useEffect, useRef, useState } from 'react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';

const educationData = [
  {
    idx: '01',
    school: 'Lovely Professional University',
    degree: 'Bachelor of Technology - Computer Science & Engineering',
    location: 'Phagwara, Punjab',
    period: '2023 - Present',
    badge: 'CGPA 7.82',
    note: 'Focused on software engineering, data systems, and applied problem-solving through academic and practical work.',
  },
  {
    idx: '02',
    school: 'Delhi School Of Excellence',
    degree: 'Intermediate',
    location: 'Basti, Uttar Pradesh',
    period: '2021 - 2023',
    badge: '68.4%',
    note: 'Built a strong academic base in analytical thinking, mathematics, and disciplined exam performance.',
  },
  {
    idx: '03',
    school: 'Delhi School Of Excellence',
    degree: 'Matriculation',
    location: 'Basti, Uttar Pradesh',
    period: '2020 - 2021',
    badge: '78%',
    note: 'Established early consistency, curiosity, and the academic confidence that shaped later technical interests.',
  },
];

const EducationCard = ({
  item,
  index,
  visible,
}: {
  item: (typeof educationData)[0];
  index: number;
  visible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <article
      className="education-entry"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(42px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.14 + 0.2}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.14 + 0.2}s`,
      }}
    >
      <div className="education-node" aria-hidden>
        <span className={`education-node-dot ${hovered ? 'is-hovered' : ''}`} />
      </div>

      <div
        ref={cardRef}
        className={`education-card ${hovered ? 'is-hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: hovered
            ? `perspective(1100px) rotateY(${tilt.x * 5}deg) rotateX(${-tilt.y * 4}deg) translateY(-4px)`
            : 'perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(0px)',
        }}
      >
        <div className="education-card-noise" aria-hidden />
        <div className="education-card-glow" aria-hidden />

        <div className="education-card-top">
          <span className="education-index">{item.idx}</span>
          <span className="education-period">{item.period}</span>
        </div>

        <div className="education-grid">
          <div className="education-primary">
            <p className="education-label">Institution</p>
            <h3 className="education-school">{item.school}</h3>
            <p className="education-degree">{item.degree}</p>
          </div>

          <div className="education-secondary">
            <p className="education-label">Location</p>
            <p className="education-location">{item.location}</p>

            <div className="education-badge">
              <span className="education-badge-dot" />
              {item.badge}
            </div>
          </div>
        </div>

        <div className="education-note-wrap">
          <p className="education-note">{item.note}</p>
        </div>
      </div>
    </article>
  );
};

const Education = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [glow, setGlow] = useState({ x: -999, y: -999 });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t1 = window.setTimeout(() => setHeaderVisible(true), 60);
    const t2 = window.setTimeout(() => setCardsVisible(true), 180);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setGlow({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap');

        .education-section * {
          box-sizing: border-box;
        }

        .education-section {
          position: relative;
          overflow: hidden;
          padding: 96px 24px 110px;
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 18%, rgba(212,170,112,0.18), transparent 26%),
            radial-gradient(circle at 84% 24%, rgba(176,137,73,0.12), transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(176,137,73,0.10), transparent 30%),
            linear-gradient(180deg, #fffaf3 0%, #f5ebdd 48%, #fcf6ee 100%);
        }

        .education-cursor-glow {
          position: fixed;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176,137,73,0.13), transparent 72%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          filter: blur(8px);
          transition: left 0.08s linear, top 0.08s linear;
        }

        .education-orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(90px);
          z-index: 0;
        }

        .education-shell {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .education-header {
          margin: 0 auto 68px;
          max-width: 620px;
        }

        .education-rail {
          position: relative;
          padding-left: 46px;
        }

        .education-rail-line {
          position: absolute;
          left: 18px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(176,137,73,0.28) 8%, rgba(176,137,73,0.28) 92%, transparent);
        }

        .education-entry {
          position: relative;
          margin-bottom: 12px;
        }

        .education-node {
          position: absolute;
          left: -34px;
          top: 24px;
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .education-node-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid rgba(176,137,73,0.52);
          background: #fffaf4;
          box-shadow: 0 0 0 4px rgba(255,248,238,0.9);
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), border-color 0.35s ease;
          position: relative;
        }

        .education-node-dot::after {
          content: '';
          position: absolute;
          inset: 1.8px;
          border-radius: 50%;
          background: #b08949;
        }

        .education-node-dot.is-hovered {
          transform: scale(1.25);
          border-color: rgba(176,137,73,0.92);
        }

        .education-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: 14px 16px 14px;
          border: 1px solid rgba(176,137,73,0.16);
          background:
            linear-gradient(145deg, rgba(255,252,248,0.96), rgba(248,240,229,0.92)),
            rgba(255,255,255,0.72);
          box-shadow:
            0 20px 40px rgba(98,74,43,0.06),
            inset 0 1px 0 rgba(255,255,255,0.85);
          transition:
            transform 0.55s cubic-bezier(.22,1,.36,1),
            border-color 0.45s ease,
            box-shadow 0.45s ease,
            background 0.45s ease;
          transform-style: preserve-3d;
        }

        .education-card.is-hovered {
          border-color: rgba(176,137,73,0.32);
          box-shadow:
            0 28px 62px rgba(98,74,43,0.10),
            inset 0 1px 0 rgba(255,255,255,0.92);
        }

        .education-card-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(176,137,73,0.06) 0.8px, transparent 0.8px);
          background-size: 18px 18px;
          opacity: 0.22;
          pointer-events: none;
        }

        .education-card-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 100% 0%, rgba(212,170,112,0.22), transparent 34%),
            linear-gradient(135deg, rgba(176,137,73,0.08), transparent 50%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }

        .education-card.is-hovered .education-card-glow {
          opacity: 1;
        }

        .education-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .education-index {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(122,88,43,0.62);
        }

        .education-period {
          display: inline-flex;
          align-items: center;
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(176,137,73,0.08);
          border: 1px solid rgba(176,137,73,0.18);
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b4d22;
        }

        .education-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(170px, 0.65fr);
          gap: 12px;
          align-items: start;
        }

        .education-label {
          margin: 0 0 7px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(122,88,43,0.58);
        }

        .education-school {
          margin: 0 0 8px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 2.1vw, 1.75rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #24170f;
        }

        .education-degree {
          margin: 0;
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #4b3723;
          max-width: 560px;
        }

        .education-location {
          margin: 0 0 10px;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 14px;
          line-height: 1.3;
          color: #8a6337;
        }

        .education-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 999px;
          background: rgba(176,137,73,0.08);
          border: 1px solid rgba(176,137,73,0.18);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6a4c2f;
        }

        .education-badge-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #b08949;
        }

        .education-note-wrap {
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid rgba(176,137,73,0.14);
        }

        .education-note {
          margin: 0;
          max-width: 760px;
          font-family: 'Manrope', sans-serif;
          font-size: 10.5px;
          line-height: 1.55;
          color: #7b5930;
        }

        @media (max-width: 960px) {
          .education-section {
            min-height: auto;
            padding: 86px 22px 94px;
          }

          .education-header {
            margin-bottom: 64px;
          }

          .education-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .education-section {
            min-height: auto;
            padding: 78px 18px 84px;
          }

          .education-cursor-glow {
            display: none;
          }

          .education-rail {
            padding-left: 24px;
          }

          .education-rail-line {
            left: 8px;
          }

          .education-node {
            left: -18px;
            top: 22px;
          }

          .education-card {
            padding: 14px 12px 13px;
            border-radius: 16px;
          }

          .education-school {
            font-size: clamp(1.15rem, 6vw, 1.45rem);
          }

          .education-location {
            font-size: 13px;
          }

          .education-note,
          .education-degree {
            font-size: 14px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="education" className="education-section">
        <div
          className="education-cursor-glow"
          aria-hidden
          style={{ left: glow.x, top: glow.y }}
        />

        <div
          className="education-orb"
          aria-hidden
          style={{
            width: 620,
            height: 620,
            top: -220,
            right: -120,
            background: 'radial-gradient(circle, rgba(176,137,73,0.14), transparent 70%)',
          }}
        />
        <div
          className="education-orb"
          aria-hidden
          style={{
            width: 420,
            height: 420,
            bottom: 70,
            left: -120,
            background: 'radial-gradient(circle, rgba(176,137,73,0.09), transparent 70%)',
          }}
        />

        <div className="education-shell">
          <header
            className="education-header"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0px)' : 'translateY(34px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <EditorialSectionHeader
              number="04"
              eyebrow="Education"
              title="Education"
              description="A more editorial snapshot of the places that shaped my thinking, discipline, and technical foundation across school, college, and engineering studies."
              className="mx-auto max-w-xl"
            />
          </header>

          <div className="education-rail">
            <div className="education-rail-line" aria-hidden />

            {educationData.map((item, index) => (
              <EducationCard
                key={item.idx}
                item={item}
                index={index}
                visible={cardsVisible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;

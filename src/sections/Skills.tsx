import { useEffect, useRef, useState } from 'react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';

const SVG = (d: string, width = 16, height = 16) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
  >
    <path d={d} />
  </svg>
);

const Icon = ({ children, width = 16, height = 16 }: { children: React.ReactNode; width?: number; height?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
  >
    {children}
  </svg>
);

const skillsData = [
  {
    num: '01',
    name: 'Algorithmic Engineering',
    tag: 'Problem Solving',
    desc: 'Expertise in Data Structures and Algorithms with a 1700+ LeetCode rating and 400+ problems solved.',
    icon: (
      <Icon width={26} height={26}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M13 14h4" />
      </Icon>
    ),
    skills: [
      {
        n: 'C++',
        w: '95%',
        ico: (
          <Icon>
            <path d="M12 2C9.2 2 7 3.1 7 5v3h5v1H5.5C3.6 9 2 10.8 2 13s1.6 4 3.5 4H5v-3c0-1.9 2.2-3 5-3s5 1.1 5 3v5c0 1.9-2.2 3-5 3s-5-1.1-5-3v-1" />
            <path d="M12 22c2.8 0 5-1.1 5-3v-3h-5v-1h6.5c1.9 0 3.5-1.8 3.5-4s-1.6-4-3.5-4H19v3c0 1.9-2.2 3-5 3" />
          </Icon>
        ),
      },
      {
        n: 'Data Structures',
        w: '94%',
        ico: (
          <Icon>
            <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" />
            <path d="M12 12v5M12 12L7.5 9.5M12 12l4.5-2.5" />
          </Icon>
        ),
      },
      {
        n: 'Algorithms',
        w: '92%',
        ico: (
          <Icon>
            <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H13L13 2z" />
          </Icon>
        ),
      },
      {
        n: 'Problem Solving',
        w: '95%',
        ico: (
          <Icon>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 7h2v10H8zM12 7h4v2h-4z" />
          </Icon>
        ),
      },
    ],
  },
  {
    num: '02',
    name: 'Full-Stack Web',
    tag: 'Architecture',
    desc: 'Building real-time collaborative platforms and responsive interfaces using modern frameworks.',
    icon: (
      <Icon width={26} height={26}>
        <path d="M3 20h18M3 20V4M7 16l4-6 4 4 4-8" />
        <circle cx="7" cy="16" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="11" cy="10" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="6" r="1.2" fill="currentColor" stroke="none" />
      </Icon>
    ),
    skills: [
      {
        n: 'Next.js',
        w: '88%',
        ico: (
          <Icon>
            <path d="M12 2v20M5 5.8l7-3.8 7 3.8M5 12l7-3.8M12 8.2L19 12M5 18.2l7-3.8 7 3.8" />
          </Icon>
        ),
      },
      {
        n: 'React.js',
        w: '90%',
        ico: (
          <Icon>
            <rect x="3" y="3" width="4" height="18" rx="1" />
            <rect x="10" y="3" width="4" height="18" rx="1" />
            <rect x="17" y="3" width="4" height="18" rx="1" />
          </Icon>
        ),
      },
      {
        n: 'Node.js',
        w: '85%',
        ico: (
          <Icon>
            <circle cx="12" cy="12" r="3" />
            <circle cx="5" cy="7" r="2" />
            <circle cx="19" cy="7" r="2" />
            <circle cx="19" cy="17" r="2" />
            <circle cx="5" cy="17" r="2" />
            <path d="M7 7l3.5 3.5M14.5 10.5L17 7M17 17l-2.5-2.5M7 17l2.5-2.5" />
          </Icon>
        ),
      },
      {
        n: 'Socket.io',
        w: '82%',
        ico: (
          <Icon>
            <path d="M3 6l9-4 9 4v8l-9 4-9-4V6z" />
            <path d="M3 6l9 4 9-4M12 10v8" />
          </Icon>
        ),
      },
      {
        n: 'JavaScript',
        w: '93%',
        ico: (
          <Icon>
            <path d="M3 20h18M3 20V4" />
            <path d="M5 15l4-5 4 3 5-7" />
          </Icon>
        ),
      },
    ],
  },
  {
    num: '03',
    name: 'Databases & Tools',
    tag: 'Infrastructure',
    desc: 'Managing relational and NoSQL data with optimized queries and robust version control.',
    icon: (
      <Icon width={26} height={26}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </Icon>
    ),
    skills: [
      {
        n: 'MongoDB',
        w: '84%',
        ico: (
          <Icon>
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </Icon>
        ),
      },
      {
        n: 'MySQL',
        w: '86%',
        ico: (
          <Icon>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 9h10M12 9v8" />
          </Icon>
        ),
      },
      {
        n: 'Git & GitHub',
        w: '95%',
        ico: (
          <Icon>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9l7 7M9 16V9h2" />
          </Icon>
        ),
      },
      {
        n: 'Postman',
        w: '88%',
        ico: (
          <Icon>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 16.5c0 1 .7 1.5 1.5 1.5s1.5-.5 1.5-2v-5" />
          </Icon>
        ),
      },
      
    ],
  },
  
];

const Skills = () => {
  const [heroOn, setHeroOn] = useState(false);
  const [footOn, setFootOn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const footRef = useRef<HTMLDivElement | null>(null);
  const domainRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const footNode = footRef.current;
    if (!sectionNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionNode && entry.isIntersecting) {
            setHeroOn(true);
          }
          if (entry.target === footNode && entry.isIntersecting) {
            setFootOn(true);
          }
        });
      },
      { threshold: 0.18, rootMargin: '-5% 0px -5% 0px' }
    );

    observer.observe(sectionNode);
    if (footNode) observer.observe(footNode);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let closest = -1;
      let closestDist = Infinity;

      domainRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < closestDist && rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
          closestDist = dist;
          closest = index;
        }
      });

      if (closest !== -1) {
        setActiveIdx(closest);
      }
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(onScroll, 400);

    return () => {
      document.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-ref">
      <div className={`skills-hero ${heroOn ? 'on' : ''}`}>
        <EditorialSectionHeader
          number="03"
          eyebrow="Skills"
          title="Skills"
          description="A specialized toolkit focused on algorithmic efficiency, real-time synchronization, and scalable full-stack architecture."
          className="mx-auto max-w-xl"
        />
      </div>

      <div className="skills-domains">
        {skillsData.map((domain, index) => {
          const isActive = activeIdx === index;

          return (
            <div
              key={domain.num}
              ref={(node) => {
                domainRefs.current[index] = node;
              }}
              className={`skills-domain ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIdx(index)}
            >
              <div className="skills-domain-row">
                <span className="skills-domain-num">{domain.num}</span>
                <span className="skills-domain-name">{domain.name}</span>
                <div className="skills-domain-right">
                  <span className="skills-domain-tag">{domain.tag}</span>
                  <span className="skills-domain-count">{domain.skills.length} skills</span>
                </div>
              </div>

              <div className="skills-domain-panel">
                <div className="skills-domain-inner">
                  <div className="skills-domain-content">
                    <div className="skills-domain-left">
                      <div className="skills-domain-icon">{domain.icon}</div>
                      <div className="skills-domain-desc">{domain.desc}</div>
                    </div>

                    <div className="skills-domain-skills">
                      {domain.skills.map((skill, skillIndex) => (
                        <div
                          key={skill.n}
                          className={`skills-skill ${isActive ? 'reveal' : ''}`}
                          style={{ transitionDelay: isActive ? `${skillIndex * 70}ms` : '0ms' }}
                        >
                          <div className="skills-skill-icon">{skill.ico}</div>
                          <div className="skills-skill-name">{skill.n}</div>
                          <div className="skills-skill-bar-wrap">
                            <div
                              className="skills-skill-bar"
                              style={{ width: isActive ? skill.w : '0%' }}
                            />
                          </div>
                          <div className="skills-skill-pct">{skill.w}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={footRef} className={`skills-foot ${footOn ? 'on' : ''}`}>
        <div className="skills-foot-left">
          <span className="skills-foot-dot" />
          <span className="skills-foot-text">
            Always learning — open to new technologies and collaborations.
          </span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@1&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .skills-ref{
          background:
            radial-gradient(circle at 12% 18%, rgba(212,170,112,0.16), transparent 24%),
            radial-gradient(circle at 84% 22%, rgba(176,137,73,0.10), transparent 22%),
            linear-gradient(180deg, #fffaf3 0%, #f3e8d9 52%, #fbf5eb 100%);
          color:#2a1e0e;
          overflow:hidden;
        }

        .skills-ref *{box-sizing:border-box;}

        .skills-hero{
          padding:48px 52px 28px;
          border-bottom:1px solid rgba(176,137,73,.14);
          opacity:0;
          transform:translateY(40px);
          transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1);
        }
        .skills-hero.on{opacity:1;transform:translateY(0);}

        .skills-domain{
          position:relative;
          border-bottom:1px solid rgba(176,137,73,.10);
          transition:background .4s ease;
          overflow:hidden;
        }
        .skills-domain.active{
          background:
            linear-gradient(90deg, rgba(176,137,73,.08), rgba(255,255,255,0) 22%),
            rgba(255,251,246,.45);
        }
        .skills-domain::before{
          content:'';
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          width:2px;
          background:linear-gradient(180deg,#b08949,#d4aa70);
          transform:scaleY(0);
          transform-origin:top;
          transition:transform .5s cubic-bezier(.22,1,.36,1);
        }
        .skills-domain.active::before{transform:scaleY(1);}

        .skills-domain-row{
          display:flex;
          align-items:center;
          padding:0 52px;
          height:88px;
          position:relative;
          z-index:1;
        }
        .skills-domain-num{
          font-family:'DM Mono',monospace;
          font-size:12px;
          letter-spacing:.2em;
          color:rgba(122,88,43,.45);
          width:52px;
          flex-shrink:0;
          transition:color .35s ease;
        }
        .skills-domain.active .skills-domain-num{color:rgba(122,88,43,.92);}

        .skills-domain-name{
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(30px,4.8vw,56px);
          letter-spacing:.005em;
          line-height:1;
          color:rgba(58,40,20,.34);
          flex:1;
          transition:color .45s cubic-bezier(.22,1,.36,1),letter-spacing .45s cubic-bezier(.22,1,.36,1);
        }
        .skills-domain.active .skills-domain-name{color:#24170f;letter-spacing:.02em;}

        .skills-domain-right{
          display:flex;
          align-items:center;
          gap:20px;
          flex-shrink:0;
        }
        .skills-domain-tag{
          font-family:'DM Mono',monospace;
          font-size:12px;
          letter-spacing:.15em;
          text-transform:uppercase;
          color:rgba(176,137,73,0);
          transition:color .35s ease;
        }
        .skills-domain.active .skills-domain-tag{color:rgba(122,88,43,.78);}

        .skills-domain-count{
          font-family:'DM Mono',monospace;
          font-size:12px;
          letter-spacing:.1em;
          color:rgba(122,88,43,.34);
          transition:color .35s ease;
        }
        .skills-domain.active .skills-domain-count{color:rgba(122,88,43,.68);}

        .skills-domain-panel{
          display:grid;
          grid-template-rows:0fr;
          transition:grid-template-rows .55s cubic-bezier(.22,1,.36,1);
        }
        .skills-domain.active .skills-domain-panel{grid-template-rows:1fr;}
        .skills-domain-inner{overflow:hidden;}

        .skills-domain-content{
          padding:0 52px 44px 104px;
          display:grid;
          grid-template-columns:260px 1fr;
          gap:40px;
        }
        .skills-domain-icon{
          width:52px;
          height:52px;
          border-radius:14px;
          border:1px solid rgba(176,137,73,.18);
          display:flex;
          align-items:center;
          justify-content:center;
          color:rgba(122,88,43,.72);
          background:rgba(176,137,73,.08);
          margin-bottom:18px;
          transition:color .3s ease,border-color .3s ease;
        }
        .skills-domain.active .skills-domain-icon{
          color:#9d7035;
          border-color:rgba(176,137,73,.4);
        }
        .skills-domain-desc{
          font-size:15px;
          line-height:1.8;
          color:#6a4c2f;
          font-style:italic;
          font-family:'Syne',sans-serif;
        }
        .skills-domain-skills{
          display:flex;
          flex-direction:column;
          gap:0;
        }

        .skills-skill{
          display:flex;
          align-items:center;
          gap:14px;
          padding:12px 8px;
          margin:0 -8px;
          border-bottom:1px solid rgba(176,137,73,.08);
          opacity:0;
          transform:translateX(-18px);
          transition:opacity .38s ease,transform .42s cubic-bezier(.34,1.2,.64,1),background .25s ease;
          border-radius:6px;
        }
        .skills-skill:last-child{border-bottom:none;}
        .skills-skill.reveal{opacity:1;transform:translateX(0);}
        .skills-skill:hover{background:rgba(176,137,73,.07);}

        .skills-skill-icon{
          width:30px;
          height:30px;
          border-radius:7px;
          border:1px solid rgba(176,137,73,.12);
          display:flex;
          align-items:center;
          justify-content:center;
          color:rgba(122,88,43,.48);
          flex-shrink:0;
          transition:color .25s ease,border-color .25s ease,transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .skills-skill:hover .skills-skill-icon{
          color:#9d7035;
          border-color:rgba(176,137,73,.4);
          transform:rotate(-7deg) scale(1.1);
        }

        .skills-skill-name{
          font-family:'Syne',sans-serif;
          font-size:16px;
          font-weight:700;
          color:#3a2810;
          flex:1;
          letter-spacing:-.01em;
          transition:color .25s ease;
        }
        .skills-skill:hover .skills-skill-name{color:#1f140d;}

        .skills-skill-bar-wrap{
          width:90px;
          height:2px;
          background:rgba(176,137,73,.14);
          border-radius:999px;
          overflow:hidden;
          flex-shrink:0;
        }
        .skills-skill-bar{
          height:100%;
          border-radius:999px;
          background:linear-gradient(90deg,#b08949,#d4aa70);
          transition:width .9s .15s cubic-bezier(.22,1,.36,1);
        }
        .skills-skill-pct{
          font-family:'DM Mono',monospace;
          font-size:12px;
          color:rgba(122,88,43,.58);
          width:28px;
          text-align:right;
          transition:color .25s ease;
        }
        .skills-skill:hover .skills-skill-pct{color:rgba(74,54,31,.88);}

        .skills-foot{
          display:flex;
          align-items:center;
          justify-content:flex-start;
          flex-wrap:wrap;
          gap:12px;
          padding:28px 52px 28px;
          border-top:1px solid rgba(176,137,73,.12);
          opacity:0;
          transform:translateY(16px);
          transition:opacity .6s .2s cubic-bezier(.22,1,.36,1),transform .6s .2s cubic-bezier(.22,1,.36,1);
        }
        .skills-foot.on{opacity:1;transform:translateY(0);}
        .skills-foot-left{display:flex;align-items:center;gap:9px;}
        .skills-foot-dot{
          width:7px;
          height:7px;
          border-radius:50%;
          background:#5fe26f;
          animation:skills-glo 3s ease-in-out infinite;
        }
        @keyframes skills-glo{
          0%,100%{box-shadow:0 0 0 3px rgba(95,226,111,.18);}
          50%{box-shadow:0 0 0 7px rgba(95,226,111,.04);}
        }
        .skills-foot-text{
          font-family:'Syne',sans-serif;
          font-size:14px;
          color:#6a4c2f;
          letter-spacing:.03em;
        }
        @media (max-width: 1024px){
          .skills-hero{padding:42px 32px 24px;}
          .skills-domain-row{padding:0 32px;height:82px;}
          .skills-domain-content{
            grid-template-columns:1fr;
            padding:0 32px 38px 32px;
            gap:26px;
          }
          .skills-foot{padding:24px 32px 24px;}
          .skills-domain-tag{display:none;}
        }
        @media (max-width: 720px){
          .skills-hero{padding:40px 20px 22px;}
          .skills-domain-row{padding:0 20px;height:78px;}
          .skills-domain-num{width:36px;}
          .skills-domain-name{font-size:clamp(26px,8vw,40px);}
          .skills-domain-right{gap:10px;}
          .skills-domain-tag{display:none;}
          .skills-domain-content{
            grid-template-columns:1fr;
            padding:0 20px 36px 20px;
            gap:24px;
          }
          .skills-foot{padding:24px 20px 24px;}
        }
      `}</style>
    </section>
  );
};

export default Skills;

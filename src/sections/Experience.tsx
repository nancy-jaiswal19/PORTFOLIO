import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { projects } from '@/content/portfolio';

/* ─── Text Scramble ────────────────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function useTextScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number>(0);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (running.current) return;
    running.current = true;
    let frame = 0;
    const total = 22;
    const run = () => {
      const p = frame / total;
      setDisplay(
        original.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i / original.length < p) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      frame++;
      if (frame <= total) frameRef.current = requestAnimationFrame(run);
      else { setDisplay(original); running.current = false; }
    };
    run();
  }, [original]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    running.current = false;
    setDisplay(original);
  }, [original]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  return { display, scramble, reset };
}

/* ─── Animated Grid Canvas ─────────────────────────────────────────────────── */
const CartographyGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const t = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t.current += 0.0025;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const G = 56; // grid cell size
      const cols = Math.ceil(w / G) + 2;
      const rows = Math.ceil(h / G) + 2;
      const ox = (t.current * 7) % G;
      const oy = (t.current * 3.5) % G;

      // ── Major grid lines ──
      ctx.strokeStyle = 'rgba(120,85,40,0.09)';
      ctx.lineWidth = 0.6;
      for (let c = -1; c < cols; c++) {
        const x = c * G - ox;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let r = -1; r < rows; r++) {
        const y = r * G - oy;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // ── Fine subdivision (¼ cell) ──
      const sub = G / 4;
      ctx.strokeStyle = 'rgba(120,85,40,0.033)';
      ctx.lineWidth = 0.25;
      const subCols = Math.ceil(w / sub) + 4;
      const subRows = Math.ceil(h / sub) + 4;
      for (let c = -2; c < subCols; c++) {
        const x = c * sub - ox;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let r = -2; r < subRows; r++) {
        const y = r * sub - oy;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // ── Slow diagonal hatching ──
      ctx.strokeStyle = 'rgba(120,85,40,0.035)';
      ctx.lineWidth = 0.35;
      const diagSpan = G * 7;
      const nDiag = Math.ceil((w + h) / diagSpan) + 2;
      for (let d = -2; d < nDiag; d++) {
        const sx = d * diagSpan - (t.current * 5 % diagSpan);
        ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx + h * 0.8, h); ctx.stroke();
      }

      // ── Every-intersection pulsing dot ──
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const x = c * G - ox;
          const y = r * G - oy;
          const pulse = 0.5 + 0.5 * Math.sin(t.current * 2.2 + c * 0.8 + r * 1.3);
          ctx.beginPath();
          ctx.arc(x, y, 0.9 + 0.55 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,105,45,${0.12 + 0.18 * pulse})`;
          ctx.fill();
        }
      }

      // ── Landmark nodes every 4th intersection ──
      for (let c = 0; c < cols; c += 4) {
        for (let r = 0; r < rows; r += 4) {
          const x = c * G - ox;
          const y = r * G - oy;
          const pulse = 0.5 + 0.5 * Math.sin(t.current * 1.4 + c * 0.4 + r * 0.6);

          // inner dot
          ctx.beginPath();
          ctx.arc(x, y, 2.2 + 0.8 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,105,45,${0.22 + 0.14 * pulse})`;
          ctx.fill();

          // outer ring
          ctx.beginPath();
          ctx.arc(x, y, 5 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150,105,45,${0.07 + 0.05 * pulse})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // tiny cross hair
          ctx.strokeStyle = `rgba(150,105,45,${0.08 + 0.06 * pulse})`;
          ctx.lineWidth = 0.4;
          const cr = 7 + pulse * 2;
          ctx.beginPath(); ctx.moveTo(x - cr, y); ctx.lineTo(x + cr, y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, y - cr); ctx.lineTo(x, y + cr); ctx.stroke();
        }
      }

      // ── Wandering highlight beam (horizontal) ──
      const beamY = (Math.sin(t.current * 0.4) * 0.5 + 0.5) * h;
      const beamGrad = ctx.createLinearGradient(0, beamY - 30, 0, beamY + 30);
      beamGrad.addColorStop(0, 'rgba(190,145,70,0)');
      beamGrad.addColorStop(0.5, 'rgba(190,145,70,0.025)');
      beamGrad.addColorStop(1, 'rgba(190,145,70,0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, beamY - 30, w, 60);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ─── Card Border Trace ─────────────────────────────────────────────────────── */
const BorderTrace = ({ inView }: { inView: boolean }) => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    aria-hidden
  >
    <motion.rect
      x="0.5" y="0.5"
      width="calc(100% - 1px)" height="calc(100% - 1px)"
      fill="none"
      stroke="rgba(130,90,40,0.28)"
      strokeWidth="1"
      strokeDasharray="2400"
      initial={{ strokeDashoffset: 2400, opacity: 0 }}
      animate={inView ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: 2400, opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', height: '100%' }}
    />
  </svg>
);

/* ─── Hover Border Glow ─────────────────────────────────────────────────────── */
const HoverBorderGlow = ({ active }: { active: boolean }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    initial={false}
    animate={{ opacity: active ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    style={{
      boxShadow: 'inset 0 0 0 1px rgba(160,115,50,0.45)',
    }}
  />
);

/* ─── Corner Ticks ──────────────────────────────────────────────────────────── */
const CornerTick = ({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const cls = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    br: 'bottom-0 right-0',
    bl: 'bottom-0 left-0',
  }[pos];
  return (
    <span className={`pointer-events-none absolute ${cls} z-20`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M0 9 L0 0 L9 0" stroke="rgba(140,100,45,0.65)" strokeWidth="1.4" />
      </svg>
    </span>
  );
};

const HoverCorners = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
      <motion.div key={pos} className="absolute inset-0 pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.22, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <CornerTick pos={pos} />
      </motion.div>
    ))}
  </AnimatePresence>
);

/* ─── Scanline ───────────────────────────────────────────────────────────────── */
const Scanline = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(160,115,50,0.3) 25%, rgba(160,115,50,0.55) 50%, rgba(160,115,50,0.3) 75%, transparent 100%)',
          }}
          initial={{ top: '-3px' }}
          animate={{ top: ['-3px', '103%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Index Badge ────────────────────────────────────────────────────────────── */
const IndexBadge = ({ index }: { index: number }) => (
  <div className="absolute top-0 right-0 z-20">
    <div
      className="flex items-center gap-1 px-2.5 py-1"
      style={{ background: 'rgba(140,100,45,0.07)', borderBottom: '1px solid rgba(140,100,45,0.14)', borderLeft: '1px solid rgba(140,100,45,0.14)' }}
    >
      <span className="font-mono text-[7.5px] tracking-[0.3em] uppercase" style={{ color: 'rgba(120,85,35,0.45)' }}>no.</span>
      <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: 'rgba(120,85,35,0.65)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  </div>
);

/* ─── Column Dividers ────────────────────────────────────────────────────────── */
const ColumnDividers = () => (
  <div className="pointer-events-none absolute inset-y-0 w-full hidden lg:block" aria-hidden>
    {[1, 2].map(i => (
      <motion.div
        key={i}
        className="absolute top-0 bottom-0"
        style={{ left: `${(i / 3) * 100}%`, width: '1px' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 + i * 0.12, duration: 1.3, ease: [0.22, 1, 0.36, 1], originY: 0 }}
      >
        {/* Static gradient rule */}
        <div className="h-full w-full" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(130,90,40,0.16) 15%, rgba(130,90,40,0.2) 50%, rgba(130,90,40,0.16) 85%, transparent 100%)'
        }} />
        {/* Traveling pulse */}
        <motion.div
          className="absolute left-0 w-full"
          style={{
            height: 80,
            background: 'linear-gradient(to bottom, transparent, rgba(160,115,50,0.35), transparent)',
          }}
          initial={{ top: '-80px' }}
          animate={{ top: ['-80px', '110%'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: i * 1.5, repeatDelay: 0.5 }}
        />
      </motion.div>
    ))}
  </div>
);

/* ─── Horizontal Rule ────────────────────────────────────────────────────────── */
const HRule = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-full h-px"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1], originX: 0 }}
    style={{ background: 'linear-gradient(to right, transparent, rgba(130,90,40,0.22) 20%, rgba(130,90,40,0.22) 80%, transparent)' }}
    aria-hidden
  />
);

/* ─── Tilt Card ──────────────────────────────────────────────────────────────── */
const TILT = 5;

const TiltCard = ({
  children, className = '', inView,
}: { children: React.ReactNode; className?: string; inView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 26 });
  const sy = useSpring(ry, { stiffness: 200, damping: 26 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * TILT * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * TILT);
  }, [rx, ry]);

  const onLeave = useCallback(() => { rx.set(0); ry.set(0); setHov(false); }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      whileHover={{ zIndex: 3, scale: 1.016 }}
      transition={{ scale: { duration: 0.28 } }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
    >
      <BorderTrace inView={inView} />
      <HoverBorderGlow active={hov} />
      <HoverCorners visible={hov} />
      <Scanline active={hov} />
      {children}
    </motion.div>
  );
};

/* ─── Slide Link ─────────────────────────────────────────────────────────────── */
const SlideLink = ({ href }: { href: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative inline-flex items-center gap-1.5 pt-4 font-mono text-[9px] tracking-[0.24em] uppercase transition-colors duration-300"
      style={{ color: hov ? 'rgba(110,75,30,0.9)' : 'rgba(110,75,30,0.45)' }}
    >
      <span
        className="absolute bottom-3 left-0 h-px transition-all duration-500"
        style={{ width: hov ? '100%' : '0%', background: 'rgba(110,75,30,0.5)' }}
      />
      <span className="relative overflow-hidden inline-block">
        <motion.span className="block" animate={{ y: hov ? '-110%' : '0%' }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
          View repo
        </motion.span>
        <motion.span className="absolute inset-0" animate={{ y: hov ? '0%' : '110%' }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
          View repo
        </motion.span>
      </span>
      <motion.span animate={hov ? { x: 2, y: -2 } : { x: 0, y: 0 }} transition={{ type: 'spring', stiffness: 360, damping: 18 }}>
        <ArrowUpRight size={11} />
      </motion.span>
    </a>
  );
};

/* ─── Project Card ───────────────────────────────────────────────────────────── */
const ProjectCard = ({
  project, index, isHovered, anyHovered, onEnter, onLeave,
}: {
  project: (typeof projects)[0]; index: number;
  isHovered: boolean; anyHovered: boolean;
  onEnter: () => void; onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { display, scramble, reset } = useTextScramble(project.title);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.11, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div animate={{ opacity: anyHovered && !isHovered ? 0.32 : 1 }} transition={{ duration: 0.3 }}>
        <TiltCard
          className="relative overflow-hidden p-7"
          style={{ background: 'rgba(253,250,244,0.92)' } as React.CSSProperties}
          inView={isInView}
        >
          {/* Per-card inner grid texture */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <svg width="100%" height="100%" className="opacity-[0.025]">
              <defs>
                <pattern id={`inner-g-${index}`} width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(100,70,25,1)" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#inner-g-${index})`} />
            </svg>
          </div>

          {/* Top-right hover glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse 65% 50% at 100% 0%, rgba(190,145,70,0.08) 0%, transparent 70%)' }}
          />

          <IndexBadge index={index} />

          <div
            onMouseEnter={() => { onEnter(); scramble(); }}
            onMouseLeave={() => { onLeave(); reset(); }}
            className="relative z-10 flex h-full flex-col"
          >
            {/* Period + Github */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="h-px"
                  style={{ background: 'rgba(130,90,40,0.35)' }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 20 } : {}}
                  transition={{ delay: index * 0.11 + 0.5, duration: 0.55 }}
                />
                <p className="font-mono text-[8.5px] tracking-[0.28em] uppercase" style={{ color: 'rgba(110,75,30,0.5)' }}>
                  {project.period}
                </p>
              </div>

              <motion.a
                href={project.github} target="_blank" rel="noreferrer"
                aria-label={`${project.title} source`}
                whileHover={{ rotate: 12, scale: 1.12 }} whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center transition-all duration-300"
                style={{ border: '1px solid rgba(130,90,40,0.22)', color: 'rgba(120,85,35,0.5)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(130,90,40,0.12)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(130,90,40,0.5)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(100,65,20,0.9)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = '';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(130,90,40,0.22)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(120,85,35,0.5)';
                }}
              >
                <Github size={12} />
              </motion.a>
            </div>

            {/* Title */}
            <h3
              className="mb-4 font-mono text-[1.12rem] font-semibold leading-snug tracking-tight"
              style={{ color: 'rgba(60,40,15,0.88)' }}
            >
              {display}
            </h3>

            {/* Animated separator */}
            <motion.div
              className="mb-4 h-px"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ delay: index * 0.11 + 0.55, duration: 0.85 }}
              style={{ background: 'linear-gradient(to right, rgba(140,100,45,0.22), transparent)' }}
            />

            <p className="mb-2.5 text-[0.8rem] font-semibold leading-relaxed" style={{ color: 'rgba(70,48,20,0.72)' }}>
              {project.summary}
            </p>
            <p className="mb-5 flex-1 text-[0.78rem] leading-relaxed" style={{ color: 'rgba(80,55,25,0.42)' }}>
              {project.details}
            </p>

            {/* Outcome — left-ruled */}
            <div
              className="mb-5 pl-3"
              style={{ borderLeft: '2px solid rgba(140,100,45,0.28)' }}
            >
              <p className="font-mono text-[7.5px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(120,85,35,0.4)' }}>
                Outcome
              </p>
              <p className="text-[0.75rem] leading-relaxed" style={{ color: 'rgba(70,48,20,0.6)' }}>
                {project.outcome}
              </p>
            </div>

            {/* Stack tags */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.stack.map((item, ti) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 5 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.42 + ti * 0.05, duration: 0.32 }}
                  whileHover={{ y: -2 }}
                  className="font-mono text-[8px] tracking-[0.16em] uppercase px-2.5 py-0.5 transition-all duration-200"
                  style={{
                    border: '1px solid rgba(130,90,40,0.2)',
                    background: 'rgba(140,100,45,0.05)',
                    color: 'rgba(110,75,30,0.55)',
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <SlideLink href={project.github} />
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────────────── */
const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-16 lg:px-24 lg:py-24"
      style={{ background: '#faf7f1' }}
    >
      {/* Animated cartography grid */}
      <CartographyGrid />

      {/* Soft radial centre vignette — lifts cards off the grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 85% 70% at 50% 50%, rgba(250,247,241,0.55) 0%, transparent 75%)',
        }}
      />

      {/* Top / bottom edge fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 z-0" style={{ background: 'linear-gradient(to bottom, #faf7f1, transparent)' }} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-0" style={{ background: 'linear-gradient(to top, #faf7f1, transparent)' }} aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-xl text-center">
          <EditorialSectionHeader
            number="03"
            eyebrow="Experience"
            title="Career"
            accent="timeline"
            description="A clearer view of the roles, responsibilities, and growth that shaped this portfolio."
            className="mx-auto max-w-xl"
          />
        </div>

        {/* Grid container */}
        <div className="relative">
          <ColumnDividers />
          <HRule delay={0} />

          <div className="relative z-10 grid lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                anyHovered={hoveredIndex !== null}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          <HRule delay={0.2} />
        </div>
      </div>
    </section>
  );
};

export default Projects;

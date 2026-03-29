import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/content/portfolio';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import codeSyncImage from '@/content/projects/codeSyncImage.svg';
import pathfindingImage from '@/content/projects/pathfindingImage.svg';
import homeSpaceImage from '@/content/projects/homeSpaceImage.svg';

/* ─── Text Scramble Hook ─────────────────────────────────────────────────── */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;
const EASE_SOFT = [0.33, 1, 0.68, 1] as const;
const BOX_FLIP_DURATION = 2.3;
const projectImageMap: Record<string, string> = {
  'CodeSync Pro': codeSyncImage,
  'Pathfinding Visualizer': pathfindingImage,
  'HomeSpace': homeSpaceImage,
};

function useTextScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const scramble = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    let frame = 0;
    const total = 58;
    const run = () => {
      const progress = frame / total;
      setDisplay(
        original.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i / original.length < progress) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      frame++;
      if (frame <= total) { frameRef.current = requestAnimationFrame(run); }
      else { setDisplay(original); isRunningRef.current = false; }
    };
    run();
  }, [original]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    isRunningRef.current = false;
    setDisplay(original);
  }, [original]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  return { display, scramble, reset };
}

/* ─── Marquee Strip ──────────────────────────────────────────────────────── */

const MarqueeStrip = ({
  items,
  inverted = false,
}: {
  items: string[];
  inverted?: boolean;
}) => {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                inverted ? 'text-[#d2b893]' : 'text-olive-400'
              }`}
            >
              {item}
            </span>
            <span className={inverted ? 'text-[#9f845f]' : 'text-olive-200'}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Project Row ────────────────────────────────────────────────────────── */

const ProjectRow = ({
  project,
  index,
  isOpen,
  onToggle,
  isAnyOpen,
  onHoverOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isAnyOpen: boolean;
  onHoverOpen: (index: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const { display, scramble, reset } = useTextScramble(project.title.toUpperCase());

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.95, ease: EASE_SOFT }}
    >
      <motion.div
        onMouseEnter={() => onHoverOpen(index)}
        onFocus={() => onHoverOpen(index)}
        animate={{ opacity: isAnyOpen && !isOpen ? 0.35 : 1 }}
        transition={{
          opacity: { duration: 0.55, ease: EASE_SMOOTH },
        }}
        className="group relative overflow-hidden border-t border-olive-100"
      >
        <motion.div
          aria-hidden
          initial={false}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: BOX_FLIP_DURATION, ease: EASE_SOFT }}
          className="pointer-events-none absolute inset-0 origin-top bg-[#7a6540]"
        />

        {/* Row trigger */}
        <motion.button
          onClick={onToggle}
          onMouseEnter={() => {
            onHoverOpen(index);
            scramble();
          }}
          onMouseLeave={reset}
          className="relative w-full py-0 text-left focus:outline-none"
        >
          {/* Left accent bar */}
          <motion.div
            className={`absolute inset-y-0 left-0 w-1 origin-top ${isOpen ? 'bg-[#d2b893]' : 'bg-olive-600'}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isOpen ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASE_SOFT }}
          />

          <div className="flex items-center gap-3 px-5 py-5 sm:px-6 lg:px-12 lg:py-6">
            {/* Title */}
            <h3
              className={`flex-1 font-['Playfair_Display',_serif] text-[clamp(1.62rem,3.35vw,2.45rem)] font-medium tracking-tight transition-colors duration-1000 ${
                isOpen ? 'text-[#f7f3ed]' : 'text-olive-900 group-hover:text-olive-700'
              }`}
            >
              {display}
            </h3>

            {/* Period */}
            <span
              className={`hidden w-32 shrink-0 text-right font-mono text-[11px] tracking-[0.15em] lg:block ${
                isOpen ? 'text-[#d2b893]' : 'text-olive-400'
              }`}
            >
              {project.period}
            </span>

            {/* Stack preview */}
            <div className="hidden w-48 shrink-0 justify-end gap-1.5 lg:flex">
              {project.stack.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    isOpen ? 'border-[#b4884b] text-[#d2b893]' : 'border-olive-200 text-olive-400'
                  }`}
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 2 && (
                <span className={`self-center font-mono text-[10px] ${isOpen ? 'text-[#d2b893]' : 'text-olive-300'}`}>
                  +{project.stack.length - 2}
                </span>
              )}
            </div>

            {/* Expand indicator */}
            <div className="ml-3 shrink-0 sm:ml-5 lg:ml-8">
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.55, ease: EASE_SMOOTH }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-700 ${
                  isOpen
                    ? 'border-[#b4884b] text-[#f7f3ed]'
                    : 'border-olive-200 text-olive-400 group-hover:border-olive-400 group-hover:text-olive-700'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.button>

        {/* Expanded panel */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.85, ease: EASE_SMOOTH }}
              className="relative z-10 overflow-hidden"
            >
              <div className="grid gap-8 px-5 py-8 sm:px-6 sm:py-9 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-12">
                {/* Left — summary + details */}
                <div className="lg:col-span-5">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d2b893]">Overview</p>
                  <p className="mb-5 text-[clamp(1.08rem,1.88vw,1.36rem)] font-medium leading-relaxed text-[#f7f3ed]">
                    {project.summary}
                  </p>
                  <p className="text-[clamp(0.94rem,1.2vw,1.02rem)] leading-relaxed text-[#eadcc9]">
                    {project.details}
                  </p>
                </div>

                {/* Middle — outcome + stack */}
                <div className="lg:col-span-4">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d2b893]">Outcome</p>
                  <div className="relative pl-4 mb-7">
                    <div className="absolute inset-y-0 left-0 w-px bg-[#b4884b]" />
                    <p className="text-[clamp(0.94rem,1.2vw,1.02rem)] leading-relaxed text-[#eadcc9]">
                      {project.outcome}
                    </p>
                  </div>

                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d2b893]">Stack</p>
                  <MarqueeStrip items={project.stack} inverted />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((item, ti) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ti * 0.06, duration: 0.5, ease: EASE_SMOOTH }}
                        className="rounded-full border border-[#b4884b] bg-[#6f5a37] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f1e6d7]"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right — image + links */}
                <div className="flex flex-col items-start justify-between gap-6 lg:col-span-3 lg:items-end">
                  <div className="w-full max-w-[260px] rounded-[24px] border border-[#b4884b] bg-[#7f6b46] p-2 shadow-[0_16px_40px_rgba(40,28,14,0.34)] lg:max-w-[275px] lg:-translate-y-4">
                    <div className="overflow-hidden rounded-[18px] border border-[#c7ac7a]">
                      <img
                        src={projectImageMap[project.title]}
                        alt={`${project.title} preview`}
                        className="h-[150px] w-full object-cover md:h-[170px] lg:h-[182px]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d2b893]">
                    {project.period}
                  </p>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.9 }}
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f7f3ed] transition-colors duration-400 hover:text-[#d2b893]"
                  >
                    <Github size={12} />
                    <span>Source Code</span>
                    <ArrowUpRight size={11} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────────── */

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const handleHoverOpen = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? prev : index));
  }, []);

  return (
    <section id="projects" className="overflow-hidden bg-white px-0 py-16 lg:py-24">
      <div ref={sectionRef} className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="mb-10 px-5 sm:px-6 lg:mb-14 lg:px-12"
        >
          <EditorialSectionHeader
            number="03"
            eyebrow="Projects"
            title="Projects"
            description="A selection of full-stack platforms and algorithmic tools focused on real-time performance and seamless user interaction."
            className="mx-auto max-w-4xl"
          />
        </motion.div>

        {/* Ledger rows */}
        <div>
          {projects.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(prev => prev === index ? null : index)}
              isAnyOpen={openIndex !== null}
              onHoverOpen={handleHoverOpen}
            />
          ))}
          <div className="border-t border-olive-100" />
        </div>

        {/* Footer rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.05, duration: 0.9, ease: 'easeInOut' }}
          className="mt-8 flex items-center gap-4 px-5 sm:px-6 lg:mt-10 lg:gap-6 lg:px-12"
        >
          <div className="h-px flex-1 bg-olive-100" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-olive-300">
            End of engineering ledger
          </span>
          <div className="h-px flex-1 bg-olive-100" />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

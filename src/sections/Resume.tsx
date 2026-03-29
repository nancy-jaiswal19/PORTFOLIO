import {
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  ArrowUpRight,
  Zap,
  Compass,
  Clock,
} from 'lucide-react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { profile } from '@/content/portfolio';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const highlights = [
  {
    label: 'Core Focus',
    value: profile.role,
    desc: 'High-impact digital experiences',
    Icon: Zap,
  },
  {
    label: 'Location',
    value: profile.location,
    desc: 'Global remote · Available worldwide',
    Icon: Compass,
  },
  {
    label: 'Direct Line',
    value: profile.email,
    desc: 'Open for collaborations',
    Icon: Mail,
  },
];

const extracurriculars = [
  {
    title: 'LeetCode Knight Level',
    achievement: 'Achieved a global contest rating of 1700+ in weekly competitive programming contests.',
    link: 'https://leetcode.com/u/nancy-jaiswal19/',
  },
  {
    title: '400+ Algorithmic Problems',
    achievement: 'Solved over 400 problems across LeetCode and GFG, focusing on optimized data structures.',
    link: 'https://github.com/nancy-jaiswal19',
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const Resume = () => {
  return (
    <section
      id="resume"
      className="relative overflow-hidden bg-[#f7f3ed] px-4 py-8 sm:px-6 lg:px-16 lg:py-12 xl:px-24"
    >
      {/* ── Geometric decoration ── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] opacity-[0.055]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="350" cy="50" r="200" stroke="#6c522d" strokeWidth="1" />
        <circle cx="350" cy="50" r="150" stroke="#6c522d" strokeWidth="0.5" />
        <circle cx="350" cy="50" r="100" stroke="#6c522d" strokeWidth="0.5" />
        <line x1="150" y1="50" x2="350" y2="250" stroke="#6c522d" strokeWidth="0.5" />
        <line x1="350" y1="50" x2="150" y2="250" stroke="#6c522d" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-6xl">

        {/* ══ HEADER ══ */}
        <div className="mb-6 border-b border-olive-200 pb-5 text-center lg:mb-8 lg:pb-6">
          <EditorialSectionHeader
            number="06"
            eyebrow="Resume"
            title="Resume"
            description="A curated dossier of professional evolution where technical precision meets creative direction."
            className="mx-auto max-w-3xl -mt-3 lg:-mt-8"
          />
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="mb-2 grid gap-5 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch">

          {/* ── Document card ── */}
          <div className="group relative overflow-hidden border border-olive-200 bg-white transition-[border-color] duration-700 hover:border-olive-500">

            {/* Dark wipe reveal */}
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-olive-700 transition-transform duration-1000 ease-in-out group-hover:scale-y-100" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              {/* Top row */}
              <div className="mb-8 flex items-center justify-between lg:mb-10">
                <span className="font-syne text-[9px] font-bold uppercase tracking-[.28em] text-olive-500 transition-colors duration-700 group-hover:text-olive-300">
                  Master Document
                </span>

                {/* Animated page icon */}
                <div className="relative flex h-[68px] w-[52px] items-center justify-center border border-olive-200 bg-[#f7f3ed] transition-[border-color,background,transform] duration-800 ease-out group-hover:rotate-6 group-hover:scale-110 group-hover:border-olive-500 group-hover:bg-olive-500">
                  <span className="absolute right-0 top-0 block h-[14px] w-[14px] border-b border-l border-olive-200 bg-[#f7f3ed] transition-[background,border-color] duration-700 group-hover:border-olive-600 group-hover:bg-olive-700" />
                  <FileText
                    size={20}
                    className="text-olive-600 transition-colors duration-700 group-hover:text-white"
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-3 font-cormorant text-[clamp(1.6rem,4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.015em] text-olive-700 transition-colors duration-700 group-hover:text-[#f7f3ed]">
                Nancy Jaiswal
                <br />Resume, 2026
              </h3>

              <p className="mb-8 max-w-[46ch] font-mono text-[11px] leading-[1.9] tracking-[.03em] text-olive-600 transition-colors duration-700 group-hover:text-olive-200">
                Focused on full-stack engineering, real-time systems, and high-performance web applications with a strong foundation in data structures and algorithms.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="/resume-preview"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-olive-700 bg-olive-700 px-4 py-3 font-syne text-[9px] font-bold uppercase tracking-[.18em] text-[#f7f3ed] transition-[background,border-color] duration-500 hover:border-olive-500 hover:bg-olive-500 group-hover:border-olive-500 group-hover:bg-olive-500 sm:px-5 sm:tracking-[.2em]"
                >
                  <Eye size={12} />
                  Preview
                  <ArrowUpRight size={10} />
                </a>
                <a
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  className="inline-flex items-center gap-2 border border-olive-200 bg-transparent px-4 py-3 font-syne text-[9px] font-bold uppercase tracking-[.18em] text-olive-600 transition-[border-color,color,background] duration-500 hover:border-olive-500 hover:text-olive-500 group-hover:border-white/20 group-hover:bg-white/5 group-hover:text-white/70 sm:px-5 sm:tracking-[.2em]"
                >
                  <Download size={12} />
                  Download PDF
                </a>
              </div>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-3 border-t border-olive-200 transition-[border-color] duration-700 group-hover:border-white/15 lg:mt-8">
                {[
                  { val: '1', label: 'Pages' },
                  { val: '10+', label: 'Projects' },
                  { val: "'26", label: 'Edition' },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={[
                      'py-4 text-center',
                      i < 2 ? 'border-r border-olive-200 transition-[border-color] duration-700 group-hover:border-white/10' : '',
                    ].join(' ')}
                  >
                    <div className="font-cormorant text-2xl font-normal text-olive-500 transition-colors duration-700 group-hover:text-olive-300">
                      {s.val}
                    </div>
                    <div className="mt-0.5 font-syne text-[9px] uppercase tracking-[.18em] text-olive-400 transition-colors duration-700 group-hover:text-white/40">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-3 lg:h-full">
            {/* Info rows */}
            {highlights.map(({ label, value, desc, Icon }) => (
              <div
                key={label}
                className="group/item relative overflow-hidden border border-olive-200 bg-white p-5 transition-[border-color,transform] duration-600 hover:translate-x-1 hover:border-olive-500"
              >
                {/* Left accent bar */}
                <div className="absolute bottom-0 left-0 top-0 w-0 bg-olive-500 transition-[width] duration-700 ease-in-out group-hover/item:w-[3px]" />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-1.5 flex items-center gap-2">
                      <Icon size={10} className="text-olive-500" strokeWidth={1.5} />
                      <span className="font-syne text-[8.5px] font-bold uppercase tracking-[.28em] text-olive-400">
                        {label}
                      </span>
                    </div>
                    <div className="font-cormorant text-lg text-olive-700 leading-tight">
                      {value}
                    </div>
                    <div className="mt-1 font-mono text-[9.5px] tracking-[.04em] text-olive-500 leading-relaxed">
                      {desc}
                    </div>
                  </div>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-olive-200 transition-[background,border-color,transform] duration-500 group-hover/item:rotate-[-45deg] group-hover/item:border-olive-500 group-hover/item:bg-olive-500">
                    <ArrowUpRight
                      size={10}
                      className="text-olive-500 transition-colors duration-500 group-hover/item:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="border border-olive-200 bg-white p-5">
              <div className="mb-3 font-syne text-[8.5px] font-bold uppercase tracking-[.28em] text-olive-400">
                Extracurricular Activities
              </div>
              <ul className="space-y-3">
                {extracurriculars.map((activity) => (
                  <li key={activity.title} className="border-l border-olive-200 pl-3">
                    <div className="font-cormorant text-lg leading-tight text-olive-700">{activity.title}</div>
                    <div className="mt-1 font-mono text-[9.5px] leading-relaxed tracking-[.04em] text-olive-500">
                      {activity.achievement}
                    </div>
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 font-syne text-[8px] font-bold uppercase tracking-[.2em] text-olive-600 transition-colors hover:text-olive-800"
                    >
                      View Link
                      <ArrowUpRight size={9} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Available card — dark */}
            <div className="border border-olive-200 bg-olive-700 p-6 lg:mt-auto">
              <div className="mb-3 font-syne text-[9px] font-bold uppercase tracking-[.28em] text-olive-300">
                Current Status
              </div>
              <div className="mb-2 font-cormorant text-[1.4rem] font-light leading-snug text-[#f7f3ed]">
                Open for strategic<br />opportunities.
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[.06em] text-olive-400">
                <Clock size={9} strokeWidth={1.5} />
                Mar 2025 · Resume verified &amp; current
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Resume;

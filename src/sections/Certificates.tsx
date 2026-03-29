import { ArrowUpRight, Award } from 'lucide-react';
import { useState } from 'react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { certificates } from '@/content/portfolio';

// const previewCertificates = [
//   {
//     title: 'Add your primary certification',
//     issuer: 'Preview card',
//     year: '2025',
//     summary:
//       'Use this space for your strongest credential, course completion, or specialization so the section keeps the intended editorial layout.',
//     skills: ['Credential', 'Specialization', 'Verified'],
//   },
//   {
//     title: 'Showcase a frontend or backend course',
//     issuer: 'Preview card',
//     year: '2025',
//     summary:
//       'Add a second item to highlight the tools, frameworks, or development practices that support the projects shown elsewhere in the portfolio.',
//     skills: ['React', 'APIs', 'Databases'],
//   },
//   {
//     title: 'Highlight a cloud or data milestone',
//     issuer: 'Preview card',
//     year: '2024',
//     summary:
//       'Technical certifications in cloud, analytics, or deployment work well here and make the section feel substantial at a glance.',
//     skills: ['Cloud', 'Analytics', 'Deployment'],
//   },
//   {
//     title: 'Replace preview items with real entries',
//     issuer: 'Preview card',
//     year: 'Ready',
//     summary:
//       'Once you add real certificate objects in src/content/portfolio.ts, these preview cards disappear automatically and your actual credentials will show here.',
//     skills: ['Portfolio', 'Content', 'Update'],
//   },
// ];

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayCertificates = certificates.length > 0 ? certificates : previewCertificates;
  const certificateCount = displayCertificates.length;

  return (
    <section
      id="certificates"
      className="overflow-hidden bg-[#f7f3ed] px-4 py-12 sm:px-6 sm:py-14 lg:px-16 lg:py-16 xl:px-24"
      style={{ background: '#f7f3ed' }}
    >
      <div className="mx-auto max-w-[980px]">
        <EditorialSectionHeader
          number="04"
          eyebrow="Certificates"
          title="Certificates"
          description="Verified credentials behind the work."
          className="mb-8 lg:mb-10"
        />

        <div className="overflow-hidden rounded-[28px] border border-[#eadcc9] bg-[rgba(255,255,255,0.3)] shadow-[0_18px_50px_rgba(108,82,45,0.06)] backdrop-blur-[2px]">
          <ul className="flex flex-col">
            {displayCertificates.map((cert, idx) => (
              <li
                key={`${cert.title}-${cert.issuer}`}
                className="group relative border-t border-[#e1cfb7] last:border-b last:border-[#e1cfb7]"
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(0)}
                onFocus={() => setActiveIndex(idx)}
                onBlur={() => setActiveIndex(0)}
              >
                <div
                  className="absolute inset-y-0 left-0 w-0 bg-[#6c522d] transition-[width] duration-500 group-hover:w-full group-focus-within:w-full"
                  style={{ transitionTimingFunction: 'cubic-bezier(.77,0,.175,1)' }}
                />

                <div className="relative z-10 grid gap-4 px-5 py-7 sm:grid-cols-[64px_1fr_auto] sm:gap-0 sm:px-7 sm:py-8">
                  <span className="pt-1 font-syne text-[12px] font-bold tracking-[.18em] text-[#c3a06f] transition-colors duration-300 group-hover:text-[#d2b893] group-focus-within:text-[#d2b893]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="sm:pr-6">
                    <p className="mb-[0.65rem] font-syne text-[10px] font-bold uppercase tracking-[.28em] text-[#b4884b] transition-colors duration-300 group-hover:text-[#d2b893] group-focus-within:text-[#d2b893]">
                      {cert.issuer}
                    </p>
                    <h3 className="mb-2.5 font-playfair text-[clamp(1.4rem,2.8vw,1.85rem)] font-normal leading-[1.15] tracking-[-0.01em] text-[#6c522d] transition-colors duration-300 group-hover:text-[#f7f3ed] group-focus-within:text-[#f7f3ed]">
                      {cert.title}
                    </h3>
                    <p className="max-w-[58ch] font-mono text-[12px] leading-[1.85] tracking-[.02em] text-[#906d3c] transition-colors duration-300 group-hover:text-[#e1cfb7] group-focus-within:text-[#e1cfb7]">
                      {cert.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-[#e1cfb7] px-3 py-1.5 font-syne text-[10px] font-bold uppercase tracking-[.18em] text-[#906d3c] transition-[color,border-color] duration-300 group-hover:border-[#b4884b] group-hover:text-[#e1cfb7] group-focus-within:border-[#b4884b] group-focus-within:text-[#e1cfb7]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-3 pt-1 sm:min-w-16 sm:flex-col sm:items-end sm:justify-start sm:gap-3">
                    <span className="font-syne text-[12px] font-bold tracking-[.2em] text-[#c3a06f] transition-colors duration-300 group-hover:text-[#d2b893] group-focus-within:text-[#d2b893]">
                      {cert.year}
                    </span>
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${cert.title} certificate`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1cfb7] text-[#6c522d] transition-[transform,background,border-color,color] duration-300 group-hover:-rotate-45 group-hover:border-[#b4884b] group-hover:bg-[#b4884b] group-hover:text-white group-focus-within:-rotate-45 group-focus-within:border-[#b4884b] group-focus-within:bg-[#b4884b] group-focus-within:text-white"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1cfb7] text-[#c3a06f] transition-[transform,border-color,color] duration-300 group-hover:-rotate-45 group-hover:border-[#b4884b] group-hover:text-[#e1cfb7] group-focus-within:-rotate-45 group-focus-within:border-[#b4884b] group-focus-within:text-[#e1cfb7]">
                        <Award
                          size={15}
                          className="transition-colors duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-[#e1cfb7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="font-syne text-[10px] font-bold uppercase tracking-[.3em] text-[#c3a06f]">
              {certificates.length > 0 ? `${certificateCount} credentials verified` : `${certificateCount} preview cards`}
            </span>
            <div className="flex items-center gap-2">
              {displayCertificates.map((cert, i) => (
                <span
                  key={`${cert.title}-dot`}
                  className="block rounded-full transition-[background,transform] duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    background: i === activeIndex ? '#6c522d' : '#d2b893',
                    transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {certificates.length === 0 ? (
            <p className="px-5 pb-5 text-center font-mono text-[12px] tracking-[.08em] text-[#b4884b] sm:px-7">
              Preview mode. Replace the empty `certificates` array in `src/content/portfolio.ts` with your real credentials.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

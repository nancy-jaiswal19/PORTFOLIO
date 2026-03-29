import { ExternalLink, Github, Linkedin, Mail, Phone, ArrowLeft, Download, Printer } from 'lucide-react';
import { profile, timeline, projects } from '@/content/portfolio';

type ResumeProject = {
  title: string;
  period: string;
  bullets: string[];
  tech: string;
  link?: string;
};

type ResumeTraining = {
  title: string;
  period: string;
  role: string;
  bullets: string[];
  tech: string;
};

type ResumeCertificate = {
  title: string;
  period: string;
  link?: string;
};

type ResumeExtracurricular = {
  title: string;
  organizer: string;
  achievement: string;
  link: string;
};

const resumeProjects: ResumeProject[] = [
  {
    title: 'CodeSync Pro - Real-Time Collaborative Editor',
    period: "2026",
    bullets: [
      'Engineered a real-time collaborative editor using Socket.io to handle concurrent edits with sub-millisecond sync.',
      'Integrated a Cloud Compiler API with full STDIN/STDOUT support for remote programming across multiple languages.',
      'Developed a synchronized workspace featuring live chat and active user presence tracking.',
      'Optimized WebSocket event handling and conflict resolution strategies to ensure data consistency.',
    ],
    tech: 'React.js, Node.js, Socket.io, Monaco Editor, Framer Motion',
    link: projects.find((item) => item.title === 'EmotionScope')?.github ?? profile.links.github,
  },
  {
    title: 'Pathfinding Visualizer - Algorithmic Engineering',
    period: "2026",
    bullets: [
      'Developed an interactive tool to visualize Dijkstra, BFS, and DFS algorithms on dynamic, weighted grids.',
      'Engineered an optimized state management system to handle rapid UI re-renders, maintaining 60 FPS during traversals.',
      'Implemented real-time obstacle placement and recursive backtracking for complex maze generation.',
    ],
    tech: 'React.js, Data Structures, Algorithms, CSS3',
    link: projects.find((item) => item.title.includes('EV Adoption'))?.github ?? profile.links.github,
  },
  {
    title: 'HomeSpace - Online Furniture Store',
    period: "2025",
    bullets: [
      'Architected an e-commerce platform with a responsive UI and Augmented Reality (AR) product visualization.',
      'Optimized backend REST APIs for real-time product listing and dynamic client-side cart management.',
      'Integrated web-based AR to allow users to preview furniture placement in their physical environment.',
    ],
    tech: 'Next.js, Node.js, MongoDB, Tailwind CSS, Augmented Reality',
    link: projects.find((item) => item.title.includes('Crime Patterns'))?.github ?? profile.links.github,
  },
];

const trainings: ResumeTraining[] = [
  {
    title: 'Gokboru Tech Summer Training',
    period: "Jul 2025",
    role: 'Full-Stack Engineering Intern',
    bullets: [
      'Successfully completed advanced training in full-stack engineering principles and modern web architectures.',
      'Developed scalable frontend components and optimized backend service layers.',
    ],
    tech: 'Full-Stack Engineering, Web Architecture',
  },
];

const certificates: ResumeCertificate[] = [
  {
    title: 'HackerRank Problem Solving (Intermediate)',
    period: "Sep 2025",
    link: 'https://www.hackerrank.com/certificates/40ea09bd51bb',
  },
  {
    title: 'NPTEL Cloud Computing',
    period: "May 2025",
    link: 'https://drive.google.com/file/d/1Lx_C0WiR5uHeZ3aN_efEDYDOohF5R6BS/view?usp=sharing',
  },
  {
    title: 'Introduction to Hardware and Operating Systems by Coursera',
    period: "Sep 2024",
    link: 'https://drive.google.com/file/d/19xMhXPuNeIUi_6lgKl85KDQiraf2RCK5/view?usp=sharing',
  },
];

const extracurriculars: ResumeExtracurricular[] = [
  {
    title: 'LeetCode Knight Level',
    organizer: 'LeetCode',
    achievement: 'Achieved a global contest rating of 1700+',
    link: 'https://leetcode.com/u/nancy-jaiswal19/',
  },
  {
    title: '400+ Problems Solved',
    organizer: 'LeetCode & GFG',
    achievement: 'Solved over 400 algorithmic problems focusing on complex data structures.',
    link: 'https://leetcode.com/u/nancy-jaiswal19/',
  },
];

const sectionTitleClass =
  'mb-4 border-b border-olive-200 pb-2 font-syne text-xs font-bold uppercase tracking-[0.22em] text-olive-600';

const ResumePreview = () => {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-olive-800">
      <div className="sticky top-0 z-20 border-b border-olive-200/90 bg-[#f7f3ed]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-olive-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-700 transition hover:border-olive-300 hover:bg-white"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-olive-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-700 transition hover:border-olive-300 hover:bg-white"
            >
              <Printer size={14} />
              Print
            </button>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full bg-olive-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-50 transition hover:bg-olive-600"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <article className="rounded-[26px] border border-olive-200 bg-white/70 p-6 shadow-[0_28px_70px_rgba(60,42,20,0.1)] lg:p-9">
          <header className="border-b border-olive-200 pb-6">
            <h1 className="font-playfair text-[clamp(2rem,4.8vw,3.25rem)] font-semibold tracking-[-0.02em] text-olive-800">
              {profile.name}
            </h1>
            <p className="mt-1 font-cormorant text-[clamp(1.15rem,2.6vw,1.75rem)] italic text-olive-600">
              Software Development Engineer | Backend & Data-Focused Builder
            </p>

            <div className="mt-5 grid gap-3 text-sm text-olive-700 md:grid-cols-2 lg:grid-cols-4">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Linkedin size={15} className="text-olive-500" />
                LinkedIn
              </a>
              <a href={profile.links.email} className="inline-flex items-center gap-2">
                <Mail size={15} className="text-olive-500" />
                {profile.email}
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Github size={15} className="text-olive-500" />
                GitHub
              </a>
              <span className="inline-flex items-center gap-2">
                <Phone size={15} className="text-olive-500" />
                +91-9502974049
              </span>
            </div>
          </header>

          <section className="mt-7">
            <h2 className={sectionTitleClass}>Skills</h2>
            <div className="grid gap-4 text-sm leading-relaxed text-olive-700 md:grid-cols-2">
              <p>
                <span className="font-semibold text-olive-800">Languages:</span> C++, Java, C, Python, SQL, JavaScript
              </p>
              <p>
                <span className="font-semibold text-olive-800">Frameworks/Technologies:</span> HTML, CSS, React.js,
                Scikit-learn, Django, Flask
              </p>
              <p>
                <span className="font-semibold text-olive-800">Tools/Platforms:</span> MySQL, DBMS, REST APIs, Jupyter
                Notebook, Kaggle, GitHub, GCP, Docker, Power BI
              </p>
              <p>
                <span className="font-semibold text-olive-800">Soft Skills:</span> Leadership, Collaboration, Critical
                Thinking, Creativity, Adaptability, Time Management
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Projects</h2>
            <div className="space-y-5">
              {resumeProjects.map((project) => (
                <article key={project.title} className="rounded-2xl border border-olive-200 bg-white/70 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-olive-800">{project.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-olive-500">{project.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-olive-700">
                    {project.bullets.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-olive-700">
                    <span className="font-semibold text-olive-800">Tech:</span> {project.tech}
                  </p>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                    >
                      Project Link
                      <ExternalLink size={13} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Trainings</h2>
            {trainings.map((training) => (
              <article key={training.title} className="rounded-2xl border border-olive-200 bg-white/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-olive-800">{training.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-olive-500">{training.period}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-olive-700">{training.role}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-olive-700">
                  {training.bullets.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-olive-700">
                  <span className="font-semibold text-olive-800">Tech:</span> {training.tech}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-7 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitleClass}>Certificates</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-olive-700">
                {certificates.map((certificate) => (
                  <li key={certificate.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3">
                    <p className="font-medium text-olive-800">{certificate.title}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-olive-500">{certificate.period}</p>
                    {certificate.link ? (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                      >
                        View Certificate
                        <ExternalLink size={13} />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={sectionTitleClass}>Extracurricular Activities</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-olive-700">
                {extracurriculars.map((activity) => (
                  <li key={activity.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3">
                    <p className="font-medium text-olive-800">{activity.title}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-olive-500">
                      {activity.organizer}
                    </p>
                    <p className="mt-2">{activity.achievement}</p>
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                    >
                      View Link
                      <ExternalLink size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Education</h2>
            <div className="space-y-3">
              {timeline.map((item) => (
                <article key={item.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3.5">
                  <h3 className="font-serif text-lg font-semibold text-olive-800">{item.title}</h3>
                  <p className="mt-1 text-sm text-olive-700">{item.meta}</p>
                  <p className="mt-1 text-sm font-medium text-olive-600">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default ResumePreview;

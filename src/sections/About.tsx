import { profile } from '@/content/portfolio';
import aboutMePhoto from '@/content/about-me.jpeg';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';

const About = () => {
  const name = profile?.name ?? 'Nancy Jaiswal';
  const photo = (profile as { photo?: string })?.photo ?? aboutMePhoto;
  const role = 'Software Development Engineer';
  const summaryLine =
    'I build real-time collaborative platforms and high-performance web applications, driven by a strong foundation in data structures and competitive programming.';
  const hobbies = [
    'Music',
    'Reading',
    'UI/UX Design',
    'Journaling',
  ];

  return (
    <section id="about" className="relative mt-2 overflow-hidden bg-transparent px-4 pb-12 pt-8 sm:px-6 lg:mt-4 lg:px-16 lg:pb-20 lg:pt-10 xl:px-24 xl:pb-24">
      <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-olive-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-olive-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[86rem]">
        <EditorialSectionHeader
          number="01"
          eyebrow="About"
          title="About"
          description="Get to Know Me"
          className="-mt-2 mb-5 lg:-mt-4 lg:mb-8"
        />

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[330px_minmax(0,1fr)] xl:gap-10">
          <div className="flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-[30px] border border-olive-200/70 bg-white/45 p-2 shadow-[0_28px_60px_rgba(60,42,20,0.14)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_36px_70px_rgba(60,42,20,0.2)]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-olive-200/35 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-olive-300/30 blur-2xl" />

              <div className="overflow-hidden rounded-[26px]" style={{ aspectRatio: '0.78' }}>
                <img
                  src={photo}
                  alt={name}
                  className="block h-full w-full object-cover object-[50%_18%] transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              </div>

              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-olive-300/40 bg-[#302618eb] px-3 py-2 text-[12px] font-semibold tracking-[0.04em] text-[#f7f1e7] transition-all duration-700 group-hover:translate-y-0.5 group-hover:shadow-[0_10px_24px_rgba(40,30,18,0.28)] sm:bottom-6 sm:left-6 sm:px-4 sm:py-2.5 sm:text-[13px]">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#5fe26f] shadow-[0_0_0_6px_rgba(95,226,111,0.18)] animate-pulse" />
                Open to Work
              </div>
            </div>

            <div className="rounded-[24px] border border-olive-200/70 bg-white/45 p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(60,42,20,0.14)] lg:p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-olive-500">
                Hobbies & Interests
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full border border-olive-300/55 bg-olive-50/75 px-3 py-1.5 text-[12px] font-medium text-olive-700 transition-all duration-500 hover:-translate-y-0.5 hover:border-olive-400 hover:bg-olive-100/70"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full rounded-[30px] border border-olive-200/75 bg-white/50 p-6 shadow-[0_18px_45px_rgba(60,42,20,0.1)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_65px_rgba(60,42,20,0.16)] lg:p-7">
              <p className="text-sm font-medium text-olive-500">Hi there, I&apos;m</p>
              <h2 className="mt-1 font-serif text-[clamp(1.85rem,3.3vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-olive-700">
                {name}
              </h2>
              <p className="mt-2 font-serif text-[clamp(1.1rem,1.55vw,1.65rem)] italic leading-tight text-olive-600">
                {role}
              </p>

              <div className="my-5 h-px bg-gradient-to-r from-olive-300/70 via-olive-200/40 to-transparent" />

              <p className="max-w-4xl border-l-4 border-olive-300/85 pl-4 text-[clamp(0.98rem,1.2vw,1.16rem)] leading-relaxed text-olive-700">
                {summaryLine}
              </p>

              <p className="mt-5 text-[clamp(0.95rem,1.12vw,1.03rem)] leading-relaxed text-olive-700">
                {profile.summary}
              </p>

              <div className="mt-6 rounded-2xl border border-olive-200/70 bg-olive-50/70 p-5 transition-all duration-700 lg:p-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-olive-500">
                  How I Add Value
                </p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <article className="rounded-xl border border-olive-200/70 bg-white/55 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-olive-300 hover:bg-white/70">
                    <p className="font-serif text-lg font-semibold text-olive-700">Technical Skills</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-olive-600">
                      Expertise in C++, JavaScript, and Next.js, with a deep focus on Data Structures and Algorithms. Experienced in building real-time features using Socket.io and optimizing frontend performance to maintain high frame rates.
                    </p>
                  </article>
                  <article className="rounded-xl border border-olive-200/70 bg-white/55 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-olive-300 hover:bg-white/70">
                    <p className="font-serif text-lg font-semibold text-olive-700">Soft Skills</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-olive-600">
                      I am a collaborative builder who enjoys the process of turning complex logic into simple, user-friendly interfaces. I focus on staying consistent, learning new frameworks quickly, and maintaining a high standard for project performance.
                    </p>
                  </article>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import Navbar from '@/components/Navbar';
import FloatingSocialDock from '@/components/FloatingSocialDock';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';

import Certificates from '@/sections/Certificates';
import Resume from '@/sections/Resume';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

const Index = () => {
  return (
    <div className="site-shell min-h-screen bg-[#faf7f1]">
      <Navbar />
      <FloatingSocialDock />
      <Hero />
      <div aria-hidden className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="h-px bg-olive-200/80" />
      </div>
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certificates />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

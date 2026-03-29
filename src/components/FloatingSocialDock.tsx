import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/portfolio';

const socialLinks = [
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin, external: true },
  { label: 'GitHub', href: profile.links.github, Icon: Github, external: true },
  { label: 'Email', href: profile.links.email, Icon: Mail, external: false },
];

const FloatingSocialDock = () => {
  return (
    <aside
      aria-label="Quick social links"
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ right: 'max(4px, env(safe-area-inset-right))' }}
    >
      <div className="rounded-[30px] border border-[#d5c5ae] bg-[#eee4d5]/95 p-2 shadow-[0_14px_36px_rgba(55,41,24,0.24)] backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          {socialLinks.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#8d7862]/20 bg-[#6f5d4d] text-[#fbf6ed] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-x-0.5 hover:bg-[#5c4c3d] hover:shadow-[0_10px_22px_rgba(45,33,20,0.28)]"
            >
              <Icon size={20} strokeWidth={1.9} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FloatingSocialDock;

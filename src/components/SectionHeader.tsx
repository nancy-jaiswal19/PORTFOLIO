import { motion } from 'framer-motion';

interface SectionHeaderProps {
  overline: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  overlineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeader = ({
  overline,
  title,
  description,
  align = 'left',
  className = '',
  overlineClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`}
    >
      <span className={`overline mb-4 block ${overlineClassName}`}>{overline}</span>
      <h2 className={`mb-4 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-olive-700 lg:text-5xl ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed text-olive-600/80 ${descriptionClassName}`}>{description}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

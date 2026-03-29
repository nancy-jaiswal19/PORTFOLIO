interface EditorialSectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
}

const EditorialSectionHeader = ({
  number,
  eyebrow,
  title,
  accent,
  description,
  className = '',
}: EditorialSectionHeaderProps) => {
  const label = title.trim();
  const meta = [eyebrow, accent, number].filter(Boolean).join(' · ');
  return (
    <div className={`relative text-center ${className}`} aria-label={meta ? `${label} ${meta}` : label}>
      <div className="relative mx-auto flex min-h-[70px] items-center justify-center sm:min-h-[84px] lg:min-h-[102px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-playfair text-[clamp(2.4rem,14vw,7.6rem)] font-semibold uppercase leading-none tracking-[0.07em] text-[#e8dfd0]/70 sm:tracking-[0.1em]"
        >
          {label}
        </span>

        <div className="relative z-10 inline-flex items-center gap-2 px-2 sm:gap-3">
          <span className="h-px w-10 bg-[#c7ac7a]/70 sm:w-12 lg:w-20" />
          <span className="font-syne text-[14px] font-semibold uppercase tracking-[0.22em] text-olive-700 sm:text-[16px] sm:tracking-[0.25em] lg:text-[20px]">
            {label}
          </span>
          <span className="h-px w-10 bg-[#c7ac7a]/70 sm:w-12 lg:w-20" />
        </div>
      </div>

      {description ? (
        <p className="mx-auto mt-1 max-w-3xl px-1 font-mono text-[10px] leading-relaxed text-[#b4884b] sm:text-[11px]">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default EditorialSectionHeader;

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SectionDivider = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const yText = useTransform(scrollYProgress, [0, 1], [30, 0]);
    const opacityText = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.4, 1]);

    return (
        <div
            ref={containerRef}
            className="relative flex h-[160px] sm:h-[220px] w-full flex-col justify-center overflow-hidden bg-[#241d15] px-6 lg:px-24"
        >
            {/* ── Background textures & watermarks ── */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
            />

            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 select-none font-playfair text-[180px] sm:text-[280px] font-black italic text-[#3a2e22]/40 opacity-40">
                01
            </div>

            {/* ── Foreground content ── */}
            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="flex w-full flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
                >
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                            <span className="h-[2px] w-5 bg-[#c3a06f]" />
                            <span className="font-syne text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-[#c3a06f] uppercase">
                                Discovery & Core
                            </span>
                        </div>
                        <h2 className="font-playfair text-3xl sm:text-[2.75rem] font-light leading-tight text-[#f7f3ed] tracking-tight">
                            Laying the <span className="italic text-[#d2b893]">Foundation</span>.
                        </h2>
                    </div>

                    <div className="flex flex-row items-center gap-6 border-l border-[#4a3b2b] pl-6 sm:flex-col sm:items-end sm:gap-2 sm:border-l-0 sm:border-r sm:pr-6 sm:pl-0 sm:text-right">
                        <div>
                            <p className="mb-1 font-mono text-[9px] tracking-[0.25em] text-[#906d3c] uppercase">
                                System Status
                            </p>
                            <p className="font-syne text-[11px] font-bold tracking-widest text-[#f0e7db]">
                                INITIALIZED
                            </p>
                        </div>
                        {/* Minimalist scroll dot */}
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#4a3b2b] sm:mt-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c3a06f]" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Interactive Progress Lines ── */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#3a2e22]">
                <motion.div
                    style={{ width }}
                    className="h-full bg-gradient-to-r from-transparent via-[#c3a06f] to-[#f7f3ed] shadow-[0_0_12px_rgba(195,160,111,0.5)]"
                />
            </div>
            <div className="absolute top-0 left-0 h-[1px] w-full bg-[#3a2e22]" />

            {/* Edge fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#241d15] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#241d15] to-transparent" />
        </div>
    );
};

export default SectionDivider;

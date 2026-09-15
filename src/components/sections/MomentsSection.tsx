"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { moments, type MomentPhoto } from "@/data/moments";

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 20.5S3.5 15.2 3.5 9.8A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.5 2.6C20.5 15.2 12 20.5 12 20.5Z" />
    </svg>
  );
}

function FrameCorner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M4 24 V10.5 C4 7 7 4 10.5 4 H24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 24 V13 C8 10.2 10.2 8 13 8 H24"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="4" cy="24" r="1.4" fill="currentColor" />
    </svg>
  );
}

function FloralFlourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" aria-hidden>
      <path
        d="M4 12 H42"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M78 12 H116"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M60 4 C62.5 8 66 10 60 12 C54 10 57.5 8 60 4 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx="60" cy="13.5" r="2" fill="currentColor" opacity="0.85" />
      <path
        d="M48 12 C52 8 56 9 60 12 C64 9 68 8 72 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
}

function Polaroid({
  photo,
  index,
  onOpen,
}: {
  photo: MomentPhoto;
  index: number;
  onOpen: (photo: MomentPhoto) => void;
}) {
  const accent = index % 3;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -32px 0px" }}
      transition={{ delay: Math.min((index % 4) * 0.04, 0.2), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, zIndex: 12 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(photo)}
      className="group relative w-full touch-manipulation text-left outline-none focus-visible:ring-2 focus-visible:ring-rose/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      aria-label={`Open photo ${index + 1}`}
      style={{ ["--tilt" as string]: `${photo.rotate}deg` }}
    >
      <span className="moment-frame relative mx-auto block w-full max-w-[300px] sm:max-w-none">
        {/* cream frame matching site theme */}
        <span className="relative block overflow-hidden rounded-md bg-cream shadow-[0_12px_28px_rgba(180,80,110,0.12)] ring-1 ring-rose/20 transition duration-300 group-hover:shadow-[0_22px_48px_rgba(180,80,110,0.18)] group-hover:ring-rose/35">
          {/* gold-rose edge wash */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,0.65)_0%,transparent_40%,rgba(201,160,106,0.08)_100%)]"
          />

          {/* photo with slim theme border */}
          <span className="relative block p-2.5 pb-3.5 sm:p-3 sm:pb-4">
            <span className="relative block overflow-hidden rounded-sm bg-petal/30 ring-1 ring-gold/35 ring-inset">
              {/* SVG corner ornaments */}
              <FrameCorner className="pointer-events-none absolute top-1 left-1 z-10 h-5 w-5 text-rose/70 sm:h-6 sm:w-6" />
              <FrameCorner className="pointer-events-none absolute top-1 right-1 z-10 h-5 w-5 rotate-90 text-rose/70 sm:h-6 sm:w-6" />
              <FrameCorner className="pointer-events-none absolute bottom-1 left-1 z-10 h-5 w-5 -rotate-90 text-rose/70 sm:h-6 sm:w-6" />
              <FrameCorner className="pointer-events-none absolute right-1 bottom-1 z-10 h-5 w-5 rotate-180 text-rose/70 sm:h-6 sm:w-6" />

              <span className="relative m-[7px] block aspect-[4/5] overflow-hidden rounded-[2px] sm:m-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="h-full w-full object-cover transition duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
                />
              </span>
            </span>
          </span>
        </span>

        {/* floating accent icons */}
        {accent === 0 ? (
          <HeartIcon className="pointer-events-none absolute -top-1.5 -right-1 h-3.5 w-3.5 text-rose/55 sm:-top-2 sm:-right-1.5 sm:h-4 sm:w-4" />
        ) : null}
        {accent === 1 ? (
          <SparkleIcon className="pointer-events-none absolute -top-1 -left-1 h-3.5 w-3.5 text-gold/70 sm:h-4 sm:w-4" />
        ) : null}
        {accent === 2 ? (
          <SparkleIcon className="animate-twinkle pointer-events-none absolute -right-1 -bottom-1 h-3 w-3 text-rose/45" />
        ) : null}
      </span>
    </motion.button>
  );
}

function Lightbox({
  photo,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photo: MomentPhoto;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <button
        type="button"
        aria-label="Close backdrop"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,36,51,0.55),rgba(40,16,24,0.88))] backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-[min(100vw,40rem)] flex-col items-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:max-w-[min(92vw,48rem)] sm:px-4 sm:pb-6 sm:pt-4 md:max-w-[min(90vw,52rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 bg-cream/15 text-cream backdrop-blur-sm transition hover:bg-cream/25 sm:top-0 sm:right-4 sm:h-11 sm:w-11"
          aria-label="Close"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative w-full overflow-hidden rounded-md bg-cream p-2.5 shadow-[0_28px_70px_rgba(20,8,12,0.45)] ring-1 ring-rose/25 sm:rounded-lg sm:p-4">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.5)_0%,transparent_45%,rgba(201,160,106,0.08)_100%)]"
          />
          <div className="relative overflow-hidden rounded-sm ring-1 ring-gold/30">
            <FrameCorner className="pointer-events-none absolute top-2 left-2 z-10 h-7 w-7 text-rose/60" />
            <FrameCorner className="pointer-events-none absolute top-2 right-2 z-10 h-7 w-7 rotate-90 text-rose/60" />
            <FrameCorner className="pointer-events-none absolute bottom-2 left-2 z-10 h-7 w-7 -rotate-90 text-rose/60" />
            <FrameCorner className="pointer-events-none absolute right-2 bottom-2 z-10 h-7 w-7 rotate-180 text-rose/60" />

            <AnimatePresence mode="wait">
              <motion.img
                key={photo.src}
                src={photo.src}
                alt=""
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="mx-auto max-h-[min(68dvh,720px)] w-full object-contain sm:max-h-[min(74dvh,800px)]"
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3 flex w-full max-w-sm items-center justify-between gap-4 sm:mt-5 sm:max-w-md">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-cream/12 text-cream backdrop-blur-sm transition hover:bg-cream/22 active:scale-95 sm:h-12 sm:w-12"
            aria-label="Previous photo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <HeartIcon className="h-3 w-3 text-rose/70" />
            <p className="font-script min-w-[4rem] text-center text-sm text-cream/70 sm:text-base">
              {index + 1} / {moments.length}
            </p>
            <HeartIcon className="h-3 w-3 text-rose/70" />
          </div>

          <button
            type="button"
            onClick={onNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-cream/12 text-cream backdrop-blur-sm transition hover:bg-cream/22 active:scale-95 sm:h-12 sm:w-12"
            aria-label="Next photo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-16 h-52 bg-[radial-gradient(ellipse_at_center,rgba(212,106,134,0.12),transparent_70%)] sm:top-20 sm:h-64" />

      <SparkleIcon className="animate-twinkle absolute top-[18%] left-[8%] h-4 w-4 text-rose/35 sm:h-5 sm:w-5" />
      <SparkleIcon className="animate-twinkle absolute top-[22%] right-[10%] h-3.5 w-3.5 text-gold/50" />
      <SparkleIcon className="animate-twinkle absolute top-[12%] right-[28%] h-3 w-3 text-rose/30" />
      <HeartIcon className="animate-float-soft absolute top-[28%] left-[4%] h-4 w-4 text-rose/25 sm:left-[6%]" />
      <HeartIcon className="animate-float-soft absolute top-[16%] right-[5%] h-3.5 w-3.5 text-rose/20" />
      <SparkleIcon className="animate-twinkle absolute right-[6%] bottom-[12%] h-4 w-4 text-rose/25" />
      <HeartIcon className="animate-float-soft absolute bottom-[18%] left-[7%] h-3 w-3 text-rose/20" />
    </div>
  );
}

export default function MomentsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setActiveIndex(null), []);
  const open = useCallback((photo: MomentPhoto) => {
    const i = moments.findIndex((m) => m.src === photo.src);
    setActiveIndex(i >= 0 ? i : 0);
  }, []);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + moments.length) % moments.length));
  }, []);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % moments.length));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = activeIndex !== null ? moments[activeIndex] : null;

  const lightbox =
    mounted &&
    createPortal(
      <AnimatePresence>
        {active && activeIndex !== null ? (
          <Lightbox
            key="photo-lightbox"
            photo={active}
            index={activeIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <section className="relative overflow-x-clip px-3 py-12 sm:px-6 sm:py-20 md:py-28 lg:px-8" data-reveal>
      <SectionDecor />

      <div className="relative mx-auto max-w-5xl px-1 text-center">
        <div className="mb-3 flex items-center justify-center gap-2 text-rose/50">
          <SparkleIcon className="h-3.5 w-3.5" />
          <HeartIcon className="h-3 w-3 text-rose/60" />
          <SparkleIcon className="h-3.5 w-3.5" />
        </div>

        <p className="font-script text-xl text-rose sm:text-2xl md:text-3xl">Polaroids of us</p>
        <h2 className="font-display mt-1.5 text-[1.75rem] leading-tight text-ink sm:mt-2 sm:text-4xl md:text-5xl">
          Our soft moments
        </h2>

        <FloralFlourish className="mx-auto mt-3 h-5 w-28 text-rose/55 sm:mt-4 sm:h-6 sm:w-32" />

        <p className="mx-auto mt-3 max-w-md px-2 text-sm leading-relaxed text-ink-soft sm:text-base">
          Every photo we kept — pressed into this little wall of light
        </p>
      </div>

      <div className="moment-grid relative mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-x-3 gap-y-6 sm:mt-12 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 md:mt-14 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-7">
        {moments.map((photo, i) => (
          <Polaroid key={photo.src} photo={photo} index={i} onOpen={open} />
        ))}
      </div>

      {lightbox}
    </section>
  );
}

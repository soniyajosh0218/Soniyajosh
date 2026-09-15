"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { videos, type MemoryVideo } from "@/data/videos";

function Sprockets({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-2 bottom-2 hidden w-2.5 flex-col justify-between py-1 sm:flex ${
        side === "left" ? "left-1.5" : "right-1.5"
      }`}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className="mx-auto h-1.5 w-1.5 rounded-[1px] bg-[#4a2433]/[0.12] shadow-[inset_0_0_0_1px_rgba(74,36,51,0.06)]"
        />
      ))}
    </span>
  );
}

function FilmFrame({
  video,
  index,
  onOpen,
}: {
  video: MemoryVideo;
  index: number;
  onOpen: (video: MemoryVideo) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -24px 0px" }}
      transition={{
        delay: Math.min((index % 4) * 0.06, 0.24),
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onOpen(video)}
      className={`group relative w-full touch-manipulation text-left outline-none focus-visible:ring-2 focus-visible:ring-rose/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        index % 2 === 1 ? "sm:translate-y-6 lg:translate-y-8" : ""
      }`}
      aria-label={`Play ${video.title}`}
    >
      {/* cream film mat */}
      <span className="relative mx-auto block w-full max-w-[340px] sm:max-w-none">
        <span className="relative block rounded-[3px] bg-[#fff7f2] p-[5%] pb-[6%] pt-[5%] shadow-[0_10px_28px_rgba(74,36,51,0.12),0_1px_3px_rgba(74,36,51,0.06)] ring-1 ring-[#4a2433]/[0.08] transition duration-300 group-hover:shadow-[0_20px_44px_rgba(74,36,51,0.18),0_4px_10px_rgba(74,36,51,0.08)] sm:rounded-[4px] sm:p-[6%] sm:pb-[7%]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_40%,rgba(201,160,106,0.06)_100%)]"
          />

          <Sprockets side="left" />
          <Sprockets side="right" />

          <span className="relative block overflow-hidden bg-ink/10 shadow-[inset_0_0_0_1px_rgba(74,36,51,0.1)]">
            <span className="relative block aspect-[3/4] sm:aspect-[4/5]">
              <video
                ref={ref}
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => setReady(true)}
                className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${
                  ready ? "opacity-100" : "opacity-0"
                }`}
              />

              {!ready ? (
                <span
                  aria-hidden
                  className="absolute inset-0 animate-pulse bg-gradient-to-br from-petal/40 via-rose/10 to-gold/20"
                />
              ) : null}

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/10" />
            </span>
          </span>
        </span>

        <span className="mt-3 block px-1 text-center sm:mt-3.5">
          <span className="font-script block text-lg leading-tight text-ink sm:text-xl md:text-2xl">
            {video.title}
          </span>
          <span className="mt-1 block text-[11px] leading-snug text-ink-soft sm:text-xs md:text-sm">
            {video.caption}
          </span>
        </span>
      </span>
    </motion.button>
  );
}

function VideoLightbox({ video, onClose }: { video: MemoryVideo; onClose: () => void }) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = player.current;
    if (el) {
      el.muted = false;
      void el.play().catch(() => undefined);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-md sm:items-center sm:p-5 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.figure
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[min(94dvh,920px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-[#1a0c12] shadow-2xl sm:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition hover:bg-cream/25"
          aria-label="Close"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
          <video
            ref={player}
            src={video.src}
            controls
            playsInline
            autoPlay
            className="max-h-[min(72dvh,720px)] w-full object-contain"
          />
        </div>

        <figcaption className="shrink-0 border-t border-cream/10 px-4 py-3.5 pb-[max(0.9rem,env(safe-area-inset-bottom))] text-center sm:px-6 sm:py-4">
          <p className="font-script text-xl text-cream sm:text-2xl md:text-3xl">{video.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-cream/65 sm:mt-1 sm:text-sm">
            {video.caption}
          </p>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function VideosSection() {
  const [active, setActive] = useState<MemoryVideo | null>(null);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lightbox =
    mounted &&
    createPortal(
      <AnimatePresence>
        {active ? <VideoLightbox key="video-lightbox" video={active} onClose={close} /> : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <section className="relative overflow-x-clip px-3 py-14 sm:px-5 sm:py-24 md:py-32" data-reveal>
      <div className="pointer-events-none absolute inset-x-0 top-8 h-56 bg-[radial-gradient(ellipse_at_center,rgba(212,106,134,0.12),transparent_70%)] sm:top-14 sm:h-72" />

      <div className="relative mx-auto max-w-5xl px-1 text-center">
        <p className="font-script text-2xl text-rose sm:text-3xl">Moving memories</p>
        <h2 className="font-display mt-2 text-3xl text-ink sm:text-4xl md:text-5xl">
          Little films of us
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft sm:max-w-md sm:text-base">
          Tap a frame — these are the moments that still move when everything else stands still
        </p>
      </div>

      <div className="video-grid relative mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-x-2.5 gap-y-6 sm:mt-12 sm:gap-x-5 sm:gap-y-10 md:mt-14 md:gap-x-7 md:gap-y-12 lg:gap-x-8">
        {videos.map((video, i) => (
          <FilmFrame key={video.src} video={video} index={i} onOpen={setActive} />
        ))}
      </div>

      {lightbox}
    </section>
  );
}

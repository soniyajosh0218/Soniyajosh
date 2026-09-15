"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const BIRTHDAY_PRAYER =
  "Heavenly Father, on this precious birthday of Soniya, we thank You for the gift of her life. Bless her with peace that settles deep, joy that rises like morning light, and love that surrounds her in every season. Guard her heart, guide her steps, and let Your favor rest gently upon her days. May she feel cherished, protected, and held. Through Jesus Christ our Lord, Amen.";

export default function BlessingSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/blessing/birthday-prayer.mp3?v=prabhat");
    audio.preload = "auto";
    audioRef.current = audio;

    const onEnded = () => {
      setPlaying(false);
      window.dispatchEvent(new CustomEvent("birthday:resume-music"));
    };

    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
      window.dispatchEvent(new CustomEvent("birthday:resume-music"));
    };
  }, []);

  const togglePrayer = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      window.dispatchEvent(new CustomEvent("birthday:resume-music"));
      return;
    }

    window.dispatchEvent(new CustomEvent("birthday:pause-music"));
    try {
      audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      window.dispatchEvent(new CustomEvent("birthday:resume-music"));
    }
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-5 md:py-28"
      data-reveal
      aria-labelledby="blessing-title"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-script text-3xl text-rose md:text-4xl">A blessing for you</p>
        <h2
          id="blessing-title"
          className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl md:text-5xl"
        >
          May heaven hold you close, Soniya
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
          A quiet light, a living prayer — offered with love on your birthday.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-8 w-full max-w-md sm:mt-10 sm:max-w-lg md:max-w-xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,160,106,0.28)_0%,rgba(247,201,212,0.18)_45%,transparent_72%)] blur-2xl"
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto aspect-[2/5] w-[min(48vw,170px)] sm:w-[min(40vw,200px)] md:w-[220px]"
        >
          <Image
            src="/blessing/jesus-blessing.png"
            alt="Jesus offering a gentle blessing"
            fill
            priority={false}
            sizes="(max-width: 640px) 48vw, (max-width: 768px) 200px, 220px"
            className="object-contain drop-shadow-[0_24px_40px_rgba(74,36,51,0.18)]"
          />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-6 max-w-2xl px-1 text-center sm:mt-8">
        <p className="font-display text-base leading-relaxed text-ink sm:text-lg md:text-xl">
          {BIRTHDAY_PRAYER}
        </p>

        <button
          type="button"
          onClick={togglePrayer}
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-rose-deep px-8 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(179,68,99,0.35)] transition hover:scale-[1.02] active:scale-[0.98] sm:mt-8"
          aria-pressed={playing}
        >
          {playing ? "Pause the blessing" : "Hear the blessing"}
        </button>
      </div>
    </section>
  );
}

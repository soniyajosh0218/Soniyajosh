"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-script text-xl text-rose sm:text-2xl md:text-3xl">A little world made just for you</p>
        <h1 className="font-display mt-3 text-4xl leading-[1.08] font-semibold text-ink sm:mt-4 sm:text-5xl md:text-7xl">
          Happy Birthday,
          <br />
          <span className="bg-gradient-to-r from-rose-deep via-rose to-gold bg-clip-text text-transparent">
            Soniya
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-md px-1 text-sm leading-relaxed text-ink-soft sm:mt-6 md:text-base">
          From josh — with every soft heartbeat, every silly laugh, and all the love I saved for
          this day.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-col items-center gap-3 sm:mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="font-script text-lg text-ink-soft">Scroll gently… your story awaits</p>
        <div className="animate-scroll-bounce flex h-10 w-6 items-start justify-center rounded-full border border-rose/40 p-1.5">
          <span className="h-2 w-1 rounded-full bg-rose/70" />
        </div>
      </motion.div>
    </section>
  );
}

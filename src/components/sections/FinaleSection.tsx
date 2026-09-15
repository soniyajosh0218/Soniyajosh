"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const softEase = [0.22, 1, 0.36, 1] as const;

const vows = ["softly,", "loudly,", "and endlessly."];

function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 28" fill="none" aria-hidden>
      <path
        d="M8 14 H58"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M102 14 H152"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M80 4 C86 10 86 18 80 24 C74 18 74 10 80 4 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="68" cy="14" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="92" cy="14" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function Twinkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FinaleSection() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16 sm:py-20"
      aria-labelledby="finale-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(247,201,212,0.5)_0%,rgba(255,244,247,0.15)_48%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[28%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(201,160,106,0.16)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-[22%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(212,106,134,0.14)_0%,transparent_70%)] blur-2xl"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Twinkle
          className="animate-twinkle absolute top-[16%] left-[12%] text-rose/45"
          style={{ animationDelay: "0.3s" }}
        />
        <Twinkle
          className="animate-twinkle absolute top-[24%] right-[16%] text-gold/50"
          style={{ animationDelay: "1.1s" }}
        />
        <Twinkle
          className="animate-twinkle absolute bottom-[18%] left-[20%] text-rose/35"
          style={{ animationDelay: "1.8s" }}
        />
        <Twinkle
          className="animate-twinkle absolute right-[22%] bottom-[26%] text-gold/40"
          style={{ animationDelay: "0.7s" }}
        />
        {!reduceMotion &&
          [
            { top: "18%", left: "80%", size: 14, delay: "0s" },
            { top: "58%", left: "10%", size: 16, delay: "1.4s" },
            { top: "70%", left: "86%", size: 12, delay: "0.6s" },
          ].map((h, i) => (
            <span
              key={i}
              className="animate-float-soft absolute text-rose"
              style={{
                top: h.top,
                left: h.left,
                fontSize: h.size,
                animationDelay: h.delay,
                opacity: 0.26,
              }}
            >
              ♥
            </span>
          ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: softEase } },
          }}
          className="font-script text-2xl text-rose sm:text-3xl md:text-4xl"
        >
          Forever yours
        </motion.p>

        <motion.h2
          id="finale-title"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: softEase } },
          }}
          className="font-display mt-3 text-[2rem] leading-[1.12] font-semibold text-ink sm:mt-4 sm:text-5xl md:text-6xl"
        >
          May this year love you back,
          <br />
          <span className="bg-gradient-to-r from-rose-deep via-rose to-gold bg-clip-text text-transparent">
            Soniya
          </span>
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0.75 },
            show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: softEase } },
          }}
          className="mx-auto mt-5 flex justify-center text-rose/70 sm:mt-6"
        >
          <Flourish className="h-6 w-36 sm:h-7 sm:w-40" />
        </motion.div>

        <motion.ul
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
          }}
          className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 sm:mt-6"
        >
          {vows.map((word) => (
            <motion.li
              key={word}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: softEase } },
              }}
              className="font-script text-xl text-rose-deep sm:text-2xl md:text-3xl"
            >
              {word}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: softEase } },
          }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-soft sm:mt-7 md:text-base"
        >
          Happy Birthday. I’m grateful for your heart, your chaos, your calm, and every version of
          you I get to keep choosing.
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: softEase } },
          }}
          className="font-script mt-7 text-2xl text-rose-deep sm:mt-8 sm:text-3xl md:text-4xl"
        >
          With all my love, josh ♥
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToTop}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: softEase } },
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-rose/25 bg-cream/80 px-6 py-2.5 text-sm font-medium text-ink shadow-[0_10px_28px_rgba(180,80,110,0.1)] backdrop-blur-sm transition hover:border-rose/40 hover:bg-cream sm:mt-9 sm:px-7 sm:py-3"
        >
          Begin again
          <span aria-hidden className="text-rose">
            ↑
          </span>
        </motion.button>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.8, ease: softEase } },
          }}
          className="mt-7 text-xs tracking-wide text-ink-soft/70 sm:mt-8"
        >
          Made with love by josh · just for Soniya
        </motion.p>
      </motion.div>
    </section>
  );
}

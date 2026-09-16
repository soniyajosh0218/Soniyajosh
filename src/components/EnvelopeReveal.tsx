"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  onContinue: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function EnvelopeReveal({ onContinue }: Props) {
  const [opened, setOpened] = useState(false);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
  };

  return (
    <section className="relative z-10 flex min-h-dvh w-full flex-col items-center px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10">
      <div
        className={`mx-auto flex w-full max-w-md flex-col items-center ${
          opened
            ? "justify-start gap-3 py-2 pb-10 sm:my-auto sm:gap-4 sm:pb-8"
            : "my-auto justify-center gap-5 sm:gap-7"
        }`}
      >
        <header className="w-full shrink-0 text-center">
          <p className="font-script text-[clamp(1.45rem,6vw,2.35rem)] leading-tight text-rose-deep">
            {opened ? "For my favorite person" : "A letter for Ammu"}
          </p>
          {!opened && (
            <p className="mt-2 text-[clamp(0.75rem,2.8vw,0.9rem)] text-ink-soft">
              Tap the seal to open your birthday gift
            </p>
          )}
        </header>

        <div className="relative w-full max-w-[min(100%,22.5rem)] sm:max-w-[24rem]">
          <AnimatePresence>
            {opened && (
              <motion.article
                key="letter"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease }}
                className="relative z-10 mx-auto mb-[-1.5rem] w-[93%] rounded-2xl border border-rose/10 bg-cream px-3.5 pt-3.5 pb-10 text-left shadow-[0_16px_40px_rgba(120,60,80,0.14)] sm:mb-[-1.75rem] sm:w-[90%] sm:px-6 sm:pt-5 sm:pb-12"
              >
                <p className="font-script text-[clamp(1.3rem,5vw,1.85rem)] leading-none text-rose-deep">
                  Dear Ammu,
                </p>
                <p className="mt-2.5 text-[clamp(0.78rem,3.1vw,0.92rem)] leading-relaxed text-ink sm:mt-3">
                  Happy Birthday, my love. You make ordinary days feel like magic, and my heart
                  feels safest when it&apos;s with you.
                </p>
                <p className="mt-2 text-[clamp(0.78rem,3.1vw,0.92rem)] leading-relaxed text-ink-soft">
                  I made a little world just for you — filled with soft words, warm wishes, and all
                  the love I could pour into this day.
                </p>
                <p className="mt-2 text-[clamp(0.78rem,3.1vw,0.92rem)] leading-relaxed text-ink">
                  Whenever you smile, remember this: you are my favorite story, and I am so proud to
                  love you.
                </p>
                <p className="font-script mt-3 text-right text-[clamp(1.05rem,4vw,1.4rem)] text-rose sm:mt-4">
                  Always yours, josh ♥
                </p>

                <div className="mt-3.5 border-t border-rose/15 pt-3.5 sm:mt-4 sm:pt-4">
                  <button
                    type="button"
                    onClick={onContinue}
                    className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep px-4 py-3 text-[clamp(0.8rem,3vw,0.9rem)] font-medium tracking-wide text-white shadow-[0_12px_30px_rgba(179,68,99,0.35)] transition hover:scale-[1.015] active:scale-[0.99] sm:py-3.5"
                  >
                    Enter your birthday world
                  </button>
                  <p className="font-script mt-1.5 text-center text-[clamp(0.8rem,3vw,1rem)] text-ink-soft">
                    Your surprise is waiting inside
                  </p>
                </div>
              </motion.article>
            )}
          </AnimatePresence>

          {/* Envelope — smaller when open so the letter + CTA stay on screen */}
          <div
            className={`relative z-20 mx-auto w-full overflow-hidden rounded-[1.15rem] shadow-[0_22px_48px_rgba(180,70,100,0.28)] transition-[aspect-ratio] duration-500 [perspective:1000px] sm:rounded-2xl ${
              opened ? "aspect-[5/2.85]" : "aspect-[5/3.4]"
            }`}
          >
            {!opened ? (
              <button
                type="button"
                onClick={openEnvelope}
                aria-label="Open the envelope"
                className="absolute inset-0 z-40 cursor-pointer"
              />
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-[#f3c5d1]" />

            {!opened && (
              <div className="pointer-events-none absolute inset-x-[10%] top-[18%] bottom-[28%] rounded-lg bg-[#f7d4de]/70" />
            )}

            {/* Pocket */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[58%]">
              <div
                className="absolute inset-0 bg-[#efb0c1]"
                style={{ clipPath: "polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)" }}
              />
            </div>

            {/* Flap */}
            <motion.div
              className={`pointer-events-none absolute inset-x-0 top-0 origin-top [transform-style:preserve-3d] ${
                opened ? "z-[5] h-[78%]" : "z-30 h-[70%]"
              }`}
              initial={false}
              animate={
                opened
                  ? { rotateX: -155, opacity: 0.75 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.6, ease }}
              style={{ transformOrigin: "top center" }}
            >
              <div
                className="h-full w-full bg-[#e89aaf] [backface-visibility:hidden]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
              <div
                className="absolute inset-0 bg-[#d992a8] [backface-visibility:hidden] [transform:rotateX(180deg)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
            </motion.div>

            <AnimatePresence>
              {!opened && (
                <motion.div
                  key="seal"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.55, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="pointer-events-none absolute top-[43%] left-1/2 z-50 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-seal text-white shadow-[0_8px_24px_rgba(194,59,79,0.45)] sm:h-16 sm:w-16"
                  aria-hidden
                >
                  <span className="text-xl sm:text-2xl">♥</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

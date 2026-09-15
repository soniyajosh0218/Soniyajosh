"use client";

import { FormEvent, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { unlockSite } from "@/app/actions/unlock";

type Props = {
  onUnlock: () => void;
};

export default function AuthGate({ onUnlock }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [pending, startTransition] = useTransition();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const attempt = value.trim();
    if (!attempt) return;

    startTransition(async () => {
      const result = await unlockSite(attempt);
      if (result.ok) {
        setError("");
        onUnlock();
        return;
      }
      setError(result.error);
    });
  };

  return (
    <section className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-12 sm:px-5 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        <p className="font-script text-2xl text-rose sm:text-3xl md:text-4xl">For my girl</p>
        <h1 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
          Welcome to Soniya&apos;s
          <br />
          Special Space
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
          A surprise filled with love, memories, and soft little joys — from josh, only for
          you.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-4 text-left">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-rose/25 bg-cream/80 px-4 py-3.5 pr-14 text-ink shadow-[0_10px_40px_rgba(180,80,110,0.08)] outline-none backdrop-blur-sm transition focus:border-rose focus:ring-4 focus:ring-rose/15"
              autoComplete="off"
              disabled={pending}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-ink-soft transition hover:text-rose-deep"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-seal"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!value.trim() || pending}
            className="w-full rounded-2xl bg-gradient-to-r from-rose to-rose-deep px-4 py-3.5 text-sm font-medium tracking-wide text-white shadow-[0_12px_30px_rgba(179,68,99,0.35)] transition enabled:hover:scale-[1.015] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {pending ? "Checking…" : "Unlock the Surprise"}
          </button>
        </form>

        <p className="mt-5 text-xs text-ink-soft">
          Hint: our names, no space — <span className="text-rose">josh______</span>
        </p>
        <p className="mt-8 text-xs text-ink-soft/80">
          Made with love by your boyfriend, josh — just for you, Soniya
        </p>
      </motion.div>
    </section>
  );
}

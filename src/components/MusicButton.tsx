"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  /** When false, audio still loads/listens so play can start from a user gesture. */
  visible?: boolean;
};

export default function MusicButton({ visible = true }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const resumeAfterPrayerRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const audio = new Audio("/Song/our-song.aac");
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audioRef.current = audio;
    audio.addEventListener("error", () => setSupported(false));

    const setIsPlaying = (next: boolean) => {
      playingRef.current = next;
      setPlaying(next);
    };

    const tryPlay = () => {
      const el = audioRef.current;
      if (!el) return;
      void el
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked — user can still tap the button.
        });
    };

    const pauseForPrayer = () => {
      const el = audioRef.current;
      if (!el) return;
      // Remember if the site song was actually playing so we can restore it.
      resumeAfterPrayerRef.current = playingRef.current && !el.paused;
      el.pause();
      setIsPlaying(false);
    };

    const resumeAfterPrayer = () => {
      const el = audioRef.current;
      if (!el || !resumeAfterPrayerRef.current) return;
      resumeAfterPrayerRef.current = false;
      void el
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Gesture may be required again; leave paused.
        });
    };

    window.addEventListener("birthday:play-music", tryPlay);
    window.addEventListener("birthday:pause-music", pauseForPrayer);
    window.addEventListener("birthday:resume-music", resumeAfterPrayer);

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("birthday:play-music", tryPlay);
      window.removeEventListener("birthday:pause-music", pauseForPrayer);
      window.removeEventListener("birthday:resume-music", resumeAfterPrayer);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !supported) return;
    if (playing) {
      audio.pause();
      playingRef.current = false;
      resumeAfterPrayerRef.current = false;
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      playingRef.current = true;
      setPlaying(true);
    } catch {
      setSupported(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed right-3 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 sm:right-4 sm:bottom-5">
      <div className="relative flex h-14 w-14 items-center justify-center">
        {playing && (
          <>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-rose/40"
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 1.55, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-rose/30"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.45,
              }}
            />
          </>
        )}

        <motion.button
          type="button"
          onClick={toggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={
            playing
              ? { scale: [1, 1.06, 1], boxShadow: "0 12px 34px rgba(179,68,99,0.55)" }
              : { scale: 1, boxShadow: "0 12px 30px rgba(179,68,99,0.4)" }
          }
          transition={
            playing
              ? { scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }
              : { type: "spring", stiffness: 420, damping: 24 }
          }
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white"
          aria-label={playing ? "Pause music" : "Play music"}
        >
          <motion.span
            key={playing ? "pause" : "play"}
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="flex items-center justify-center"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

"use client";

const hearts = [
  { top: "8%", left: "6%", size: 18, delay: "0s", opacity: 0.35 },
  { top: "18%", left: "88%", size: 14, delay: "1.2s", opacity: 0.28 },
  { top: "42%", left: "12%", size: 22, delay: "0.6s", opacity: 0.22 },
  { top: "58%", left: "78%", size: 16, delay: "2s", opacity: 0.3 },
  { top: "76%", left: "18%", size: 12, delay: "1.5s", opacity: 0.25 },
  { top: "84%", left: "70%", size: 20, delay: "0.3s", opacity: 0.2 },
  { top: "30%", left: "48%", size: 10, delay: "2.4s", opacity: 0.18 },
];

const sparkles = [
  { top: "12%", left: "28%", delay: "0.4s" },
  { top: "22%", left: "72%", delay: "1.1s" },
  { top: "48%", left: "90%", delay: "0.8s" },
  { top: "66%", left: "8%", delay: "1.8s" },
  { top: "88%", left: "42%", delay: "0.2s" },
  { top: "38%", left: "34%", delay: "2.2s" },
];

export default function FloatingDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {hearts.map((h, i) => (
        <span
          key={`h-${i}`}
          className="animate-float-soft absolute text-rose"
          style={{
            top: h.top,
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            opacity: h.opacity,
          }}
        >
          ♥
        </span>
      ))}
      {sparkles.map((s, i) => (
        <svg
          key={`s-${i}`}
          className="animate-twinkle absolute text-rose/40"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}

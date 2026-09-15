"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";

type ConfettiOpts = Parameters<typeof confetti>[0];

export function CakeSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flamesRef = useRef<HTMLDivElement>(null);

  const handleCandleClick = useCallback(() => {
    if (candlesBlown) return;

    setCandlesBlown(true);
    setShowMessage(true);

    // Big confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#F3A6C8", "#E78FB3", "#C3B7F7", "#9B8AE6", "#F6D7A7"],
    };

    function fire(particleRatio: number, opts: ConfettiOpts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Screen shake
    if (containerRef.current) {
      containerRef.current.style.animation = "cake-shake 0.5s";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.animation = "";
        }
      }, 500);
    }
  }, [candlesBlown]);

  useEffect(() => {
    // Create flickering effect for candles when lit
    if (candlesBlown) {
      const root = flamesRef.current;
      if (root) {
        root
          .querySelectorAll<HTMLElement>(".flame, .flame2, .flame3")
          .forEach((flame) => {
            flame.style.transform = "";
          });
      }
      return;
    }

    const interval = setInterval(() => {
      const root = flamesRef.current;
      if (!root) return;
      const flames = root.querySelectorAll<HTMLElement>(
        ".flame:not(.blown), .flame2:not(.blown), .flame3:not(.blown)",
      );
      flames.forEach((flame) => {
        const scale = 0.9 + Math.random() * 0.2;
        flame.style.transform = `scale(${scale}) rotate(-45deg)`;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [candlesBlown]);

  return (
    <section
      className="relative overflow-x-hidden px-4 py-20 sm:px-5 md:py-28"
      data-reveal
      aria-labelledby="cake-title"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-script text-3xl text-rose md:text-4xl">Make a wish</p>
        <h2
          id="cake-title"
          className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl md:text-5xl"
        >
          Blow out the candles
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
          Three little flames, waiting for you — tap them and let the year begin.
        </p>
      </div>

      <div
        className="birthday-cake-container"
        ref={containerRef}
        data-blown={candlesBlown ? "true" : "false"}
      >
        <div id="birthday-cake">
          <div className="cake">
            <div className="middle"></div>
            <div className="chocs"></div>
            <div className="top"></div>
          </div>
          <div
            className="candles"
            ref={flamesRef}
            role="button"
            tabIndex={0}
            aria-label={
              candlesBlown
                ? "Candles blown out"
                : "Click the flames to blow out the candles"
            }
            aria-disabled={candlesBlown}
            onClick={handleCandleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCandleClick();
              }
            }}
          >
            <div
              className={`flame ${candlesBlown ? "blown" : ""}`}
              style={{ opacity: candlesBlown ? 0 : 1 }}
            ></div>
            <div
              className={`flame2 ${candlesBlown ? "blown" : ""}`}
              style={{ opacity: candlesBlown ? 0 : 1 }}
            ></div>
            <div
              className={`flame3 ${candlesBlown ? "blown" : ""}`}
              style={{ opacity: candlesBlown ? 0 : 1 }}
            ></div>
            <div
              className={`text ${showMessage ? "show" : ""}`}
              style={{
                opacity: showMessage ? 1 : 0,
                transform: showMessage
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(10px)",
              }}
            >
              <h3
                className="font-display text-3xl font-bold md:text-4xl"
                style={{ color: "#4B294B" }}
              >
                Happy Birthday, Ammu!
              </h3>
              <span className="font-script text-2xl" style={{ color: "#6B4E6B" }}>
                May all your wishes come true this year! ✨
              </span>
            </div>
            <div className="shadows"></div>
          </div>
          <p
            className={`text2 font-script ${candlesBlown ? "fade" : ""}`}
            style={{ color: "#6B4E6B", opacity: candlesBlown ? 0 : 1 }}
          >
            Click on the flame to blow candles
          </p>
        </div>
      </div>

      <style>{`
        .birthday-cake-container {
          display: flex;
          height: 520px;
          align-items: center;
          justify-content: center;
          overflow: visible;
          margin-top: 1rem;
        }

        .birthday-cake-container #birthday-cake {
          position: relative;
          top: 50px;
          left: 0;
          width: 0;
          height: 0;
        }

        .birthday-cake-container #birthday-cake:before {
          content: "";
          position: absolute;
          background-color: #ede0d4;
          width: 400px;
          height: 140px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -10%);
          box-shadow: inset -2px -5px #e6ccb2;
        }

        .birthday-cake-container .cake {
          position: absolute;
          background-color: #ddb892;
          width: 350px;
          height: 130px;
          left: 0;
          transform: translate(-50%, -60%);
        }

        .birthday-cake-container .cake:before,
        .birthday-cake-container .cake:after {
          content: "";
          position: absolute;
        }

        .birthday-cake-container .cake:before,
        .birthday-cake-container .middle,
        .birthday-cake-container .middle:before {
          border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
          width: 350px;
          height: 50px;
        }

        .birthday-cake-container .cake:before {
          background-color: #ddb892;
          top: 130px;
        }

        .birthday-cake-container .cake:after {
          background-color: #b08968;
          width: 350px;
          height: 30px;
          top: 50px;
        }

        .birthday-cake-container .middle {
          position: absolute;
          background-color: #b08968;
          top: 80px;
          z-index: 1;
        }

        .birthday-cake-container .middle:before {
          content: "";
          position: absolute;
          background-color: #ddb892;
          top: -35px;
        }

        .birthday-cake-container .top {
          position: absolute;
          background-color: #7f5539;
          width: 350px;
          height: 90px;
          border-radius: 50%;
          z-index: 2;
          top: -45px;
          box-shadow: inset -5px -1px #fff, inset -70px 2px rgba(255, 255, 255, 0.1);
        }

        .birthday-cake-container .chocs {
          position: absolute;
          width: 55px;
          height: 50px;
          background-color: #7f5539;
          top: 0;
          z-index: 1;
          border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
          box-shadow: 49px 20px #7f5539, 98px 25px #7f5539, 147px 30px #7f5539,
            196px 25px #7f5539, 245px 20px #7f5539, 295px 0 #7f5539, 0px 4px #fff,
            49px 24px #fff, 98px 29px #fff, 147px 34px #fff, 196px 29px #fff,
            245px 24px #fff, 295px 4px #fff;
        }

        .birthday-cake-container .chocs:before {
          content: "";
          position: absolute;
          width: 175px;
          height: 180px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 100% 0% 100% 0% / 0% 72% 28% 100%;
          left: 175px;
          top: 0;
        }

        .birthday-cake-container .candles {
          position: absolute;
          width: 30px;
          height: 80px;
          background-color: #e78fb3;
          top: -160px;
          left: -20px;
          box-shadow: 50px 20px #e78fb3, -50px 20px #e78fb3;
          cursor: pointer;
          outline: none;
        }

        .birthday-cake-container[data-blown="true"] .candles {
          cursor: default;
        }

        .birthday-cake-container .candles:focus-visible {
          filter: drop-shadow(0 0 8px rgba(231, 143, 179, 0.9));
        }

        .birthday-cake-container .candles:before {
          content: "";
          position: absolute;
          width: 30px;
          height: 10px;
          background-color: #e78fb3;
          border-radius: 50%;
          top: -5px;
          box-shadow: 0 80px #e78fb3, -50px 20px #e78fb3, -50px 100px #e78fb3,
            50px 20px #e78fb3, 50px 100px #e78fb3, inset 2px -1px #fff;
        }

        .birthday-cake-container .candles:after {
          content: "";
          position: absolute;
          width: 30px;
          height: 10px;
          border-radius: 50%;
          top: 15px;
          left: 50px;
          box-shadow: inset 2px -1px #fff;
        }

        .birthday-cake-container .shadows {
          position: absolute;
          width: 30px;
          height: 10px;
          border-radius: 50%;
          box-shadow: inset 2px -1px #fff;
          left: -50px;
          top: 15px;
        }

        .birthday-cake-container .shadows:before {
          content: "";
          position: absolute;
          background-color: #333;
          width: 1.5px;
          height: 15px;
          left: 14.5px;
          top: -10px;
          box-shadow: 50px -20px #333, 100px 0 #333;
        }

        .birthday-cake-container .shadows:after {
          content: "";
          position: absolute;
          width: 15px;
          height: 90px;
          left: 15px;
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 50px -20px rgba(255, 255, 255, 0.1),
            100px 0 rgba(255, 255, 255, 0.1);
          border-radius: 0% 100% 50% 50% / 100% 6% 10% 0%;
        }

        .birthday-cake-container .flame,
        .birthday-cake-container .flame:before,
        .birthday-cake-container .flame2,
        .birthday-cake-container .flame2:before,
        .birthday-cake-container .flame3,
        .birthday-cake-container .flame3:before {
          position: absolute;
          border-radius: 80% 15% 55% 50% / 55% 15% 80% 50%;
        }

        .birthday-cake-container .flame,
        .birthday-cake-container .flame3,
        .birthday-cake-container .flame2 {
          cursor: pointer;
          width: 30px;
          height: 30px;
          transform: rotate(-45deg);
          z-index: 4;
          background-color: rgba(252, 191, 73, 0.8);
          transition: opacity 0.5s ease;
          animation: cake-flame 0.5s infinite;
        }

        .birthday-cake-container .flame {
          top: -40px;
        }

        .birthday-cake-container .flame2,
        .birthday-cake-container .flame3 {
          top: -20px;
        }

        .birthday-cake-container .flame2 {
          left: -50px;
        }

        .birthday-cake-container .flame3 {
          left: 50px;
        }

        .birthday-cake-container .flame:before,
        .birthday-cake-container .flame2:before,
        .birthday-cake-container .flame3:before {
          content: "";
          background-color: rgba(247, 127, 0, 0.4);
          width: 20px;
          height: 20px;
          top: 5px;
          left: 5px;
        }

        .birthday-cake-container .flame.blown,
        .birthday-cake-container .flame2.blown,
        .birthday-cake-container .flame3.blown {
          animation: none;
          pointer-events: none;
        }

        @keyframes cake-flame {
          0%,
          25%,
          100% {
            transform: scaleY(1) rotate(-45deg);
          }
          50%,
          75% {
            transform: scaleY(1.1) rotate(-45deg);
          }
        }

        .birthday-cake-container .text,
        .birthday-cake-container .text2 {
          position: absolute;
          text-align: center;
        }

        .birthday-cake-container .text {
          width: max-content;
          max-width: min(90vw, 420px);
          left: 15px;
          top: -130px;
          z-index: 20;
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .birthday-cake-container .text2 {
          font-size: 25px;
          width: max-content;
          max-width: min(90vw, 360px);
          top: 150px;
          left: 50%;
          transform: translate(-50%);
          z-index: 5;
          transition: opacity 0.35s ease;
        }

        .birthday-cake-container .text2.fade {
          pointer-events: none;
        }

        @keyframes cake-shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @media (max-width: 520px) {
          .birthday-cake-container {
            height: 440px;
          }

          .birthday-cake-container #birthday-cake {
            transform: scale(0.72);
            transform-origin: center center;
            top: 20px;
          }

          .birthday-cake-container .text {
            top: -120px;
          }

          .birthday-cake-container .text2 {
            font-size: 20px;
            top: 160px;
          }
        }
      `}</style>
    </section>
  );
}

export default CakeSection;

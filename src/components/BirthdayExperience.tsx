"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/sections/HeroSection";
import LetterSection from "@/components/sections/LetterSection";
import MomentsSection from "@/components/sections/MomentsSection";
import VideosSection from "@/components/sections/VideosSection";
import CakeSection from "@/components/sections/CakeSection";
import BlessingSection from "@/components/sections/BlessingSection";
import FinaleSection from "@/components/sections/FinaleSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BirthdayExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative z-10">
      <HeroSection />
      <LetterSection />
      <MomentsSection />
      <VideosSection />
      <BlessingSection />
      <CakeSection />
      <FinaleSection />
    </div>
  );
}

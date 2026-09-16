"use client";

import { useEffect, useState } from "react";
import AuthGate from "@/components/AuthGate";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import FloatingDecor from "@/components/FloatingDecor";
import BirthdayExperience from "@/components/BirthdayExperience";
import MusicButton from "@/components/MusicButton";

type Stage = "auth" | "envelope" | "main";

const AUTH_KEY = "ammu-birthday-unlocked";

export default function Home() {
  const [stage, setStage] = useState<Stage>("auth");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem(AUTH_KEY) === "1";
    if (unlocked) setStage("envelope");
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <main className="paper-grain flex min-h-dvh items-center justify-center">
        <p className="font-script text-3xl text-rose">Ammu…</p>
      </main>
    );
  }

  return (
    <main className="paper-grain relative min-h-dvh overflow-x-hidden">
      <FloatingDecor />
      {stage === "auth" && (
        <AuthGate
          onUnlock={() => {
            sessionStorage.setItem(AUTH_KEY, "1");
            setStage("envelope");
          }}
        />
      )}
      {stage === "envelope" && (
        <EnvelopeReveal
          onContinue={() => {
            window.dispatchEvent(new CustomEvent("birthday:play-music"));
            setStage("main");
          }}
        />
      )}
      {stage === "main" && <BirthdayExperience />}
      {/* One instance across envelope → main so autoplay audio isn't torn down. */}
      {(stage === "envelope" || stage === "main") && (
        <MusicButton visible={stage === "main"} />
      )}
    </main>
  );
}

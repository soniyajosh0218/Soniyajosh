"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "Happy 25th Birthday, My Ammu… ❤️🎂",
  "Today I don’t just want to wish you a Happy Birthday. I want to remind you of the beautiful story God started on 27th December 2017.",
  "We began with a simple brother-sister bond, never knowing that it would become a love story of almost 9 years. You fell in love with me first, and even though I already had feelings for you, I took time to pray and ask God for His confirmation. When I finally said yes, I never imagined that little “yes” would bring us this far. ❤️",
  "We have shared so many beautiful memories—exploring places together, travelling, laughing over little things, and seeing the happiness on your face whenever I took you somewhere. As a single child, the love and care you gave me touched my heart deeply. The way you celebrated my birthdays, saved money for my gifts, and remembered even the smallest things made me feel truly loved. I may not have said it enough, but I noticed everything.",
  "Our journey was not always easy. We fought, misunderstood each other and hurt each other. Last year, we went through our hardest season—six months without talking, even reaching the point of breaking up. But by God’s grace, we met again. I apologised, and you gave me one more chance. I will always be grateful for that. I never want us to become strangers again. Whatever happens, let’s talk, forgive, pray and fight for each other instead of choosing silence.",
  "Ammu, I love everything about you—your smile, care, patience, character, faith and the way you love me. You are no longer just my girlfriend. You are my best friend, my comfort, my strength, my happiness, my family, my backbone—and deep in my heart, my future wife. ❤️",
  "I promise to take care of you, protect you, support you and make you feel loved and safe. I can never replace the love you deserved from your father, but I want to spend my life giving you the care, security and love you deserve.",
  "On my 26th birthday, I felt incomplete because, during our fight, I didn’t receive your birthday wish. I don’t blame you, but please, my love, let’s never allow anger or misunderstandings to take away our precious days again.",
  "As you turn 25, my prayer is that God blesses you, protects you, uses your life for His glory and guides every step of your future.",
  "And I have one special prayer for us…",
  "If it is God’s will, I hope your 26th birthday will be different. Maybe instead of wondering where our story is going, we will be standing together as husband and wife, thanking God for carrying us through these nine years. ❤️",
  "I want to wake up beside you, pray with you, build a home with you, serve God with you, travel with you, celebrate every birthday with you and grow old with you.",
  "9 years behind us.\nA lifetime ahead of us.\nOne God above us.\nAnd one love between us. ❤️",
  "Happy 25th Birthday, my Papa. 🎂❤️",
  "I chose you then.\nI choose you now.\nAnd if God permits, I will keep choosing you for the rest of my life.",
  "I love you, Ammu. Today, tomorrow, and—if God wills—forever. ❤️♾️",
];

export default function LetterSection() {
  return (
    <section className="relative px-4 py-16 sm:px-5 sm:py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <p className="font-script text-center text-2xl text-rose sm:text-3xl">
          A letter from josh
        </p>

        <article className="mt-8 rounded-[2rem] border border-rose/15 bg-cream/70 p-8 shadow-[0_30px_80px_rgba(180,80,110,0.1)] backdrop-blur-sm md:p-12">
          <div className="space-y-5">
            {paragraphs.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.35) }}
                className={`font-display whitespace-pre-line leading-relaxed text-ink ${
                  i === 0
                    ? "text-2xl text-rose-deep md:text-3xl"
                    : i === 12 || i === 14
                      ? "text-center text-lg text-rose-deep md:text-xl"
                      : "text-base md:text-lg"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <p className="font-script mt-10 text-right text-3xl text-rose">— josh ♥</p>
        </article>
      </div>
    </section>
  );
}

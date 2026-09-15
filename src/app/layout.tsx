import type { Metadata, Viewport } from "next";
import { Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Soniya 💕",
  description: "A little world of love made by Chaljosh, just for Soniya.",
};

export const viewport: Viewport = {
  themeColor: "#fff4f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dancing.variable} ${playfair.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

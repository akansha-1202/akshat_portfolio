import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Akshat Verma | Graphic Designer & Video Editor",
  description:
    "Portfolio of Akshat Verma — Graphic Designer and Video Editor specializing in Meta ads, social media creatives, reels, and brand visuals.",
  keywords: [
    "graphic designer",
    "video editor",
    "Meta ads",
    "social media creatives",
    "reels",
    "Lucknow",
  ],
  openGraph: {
    title: "Akshat Verma | Graphic Designer & Video Editor",
    description:
      "Helping brands grow through design-driven strategy, creative storytelling, and Meta ad creatives.",
    type: "website",
    url: "https://www.linkedin.com/in/akshatverm-gd-ve/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

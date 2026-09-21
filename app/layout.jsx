import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Akshat Verma | Video Editor, Graphic Designer & AI Content Creator",
  description:
    "Portfolio of Akshat Verma — Video Editor, Graphic Designer, and AI Content Creator specializing in short-form video, Meta ads, AI-powered creatives, and brand visuals.",
  keywords: [
    "graphic designer",
    "video editor",
    "AI content creator",
    "Meta ads",
    "social media creatives",
    "reels",
    "Lucknow",
  ],
  openGraph: {
    title: "Akshat Verma | Video Editor, Graphic Designer & AI Content Creator",
    description:
      "Short-form video, Meta ad creatives, and AI-powered brand content for social platforms.",
    type: "website",
    url: "https://www.linkedin.com/in/akshatverm-gd-ve/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

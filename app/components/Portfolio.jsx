"use client";

import dynamic from "next/dynamic";
import NavBar from "@/app/components/NavBar";
import SmoothScroll from "@/app/components/SmoothScroll";
import Marquee from "@/app/components/Marquee";
import Hero from "@/app/sections/Hero";
import WorkShowcase from "@/app/sections/WorkShowcase";
import Services from "@/app/sections/Services";
import Experience from "@/app/sections/Experience";
import Toolkit from "@/app/sections/Toolkit";
import Education from "@/app/sections/Education";
import Contact from "@/app/sections/Contact";
import Footer from "@/app/sections/Footer";

const HeroParticles = dynamic(
  () => import("@/app/components/models/HeroParticles"),
  { ssr: false }
);

export default function Portfolio() {
  return (
    <SmoothScroll>
      <NavBar />
      <main>
        <div className="relative">
          <HeroParticles />
          <Hero />
        </div>
        <Marquee />
        <WorkShowcase />
        <Services />
        <Experience />
        <Toolkit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

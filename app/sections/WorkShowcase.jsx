"use client";

import { useState } from "react";
import { projects } from "@/app/constants";
import TitleHeader from "@/app/components/TitleHeader.jsx";
import FlipProjectCard from "@/app/components/FlipProjectCard.jsx";
import VideoModal from "@/app/components/VideoModal.jsx";

export default function WorkShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section-padding">
      <div className="section-container">
        <TitleHeader
          label="Portfolio Showcase"
          title="Selected Work & Client Projects"
          subtitle="Scroll to flip cards and explore reels, social creatives, and video edits crafted for real brands."
        />

        {featured && (
          <div className="mb-8">
            <FlipProjectCard
              project={featured}
              index={0}
              featured
              onWatch={setActiveProject}
            />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {others.map((project, i) => (
            <FlipProjectCard
              key={project.id}
              project={project}
              index={i + 1}
              onWatch={setActiveProject}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Drop MP4 reels into{" "}
          <code className="text-accent">public/work/[client]/reel.mp4</code> to
          replace placeholders from Google Drive.
        </p>
      </div>

      {activeProject && (
        <VideoModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}

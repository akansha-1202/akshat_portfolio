import { profile } from "@/app/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-10 lg:px-16">
        <p className="text-sm text-muted">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-muted transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.socials.instagram}
            className="text-muted transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={profile.socials.linkedin}
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

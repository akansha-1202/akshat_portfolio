"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/constants";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || menuOpen ? "nav-blur py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="section-container flex items-center justify-between px-5 md:px-10 lg:px-16">
        <a
          href="#"
          className="text-lg font-bold tracking-tight md:text-xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary hidden text-sm md:inline-flex">
          Contact me
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col gap-6 bg-background px-8 py-10 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary mt-4 w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Contact me
          </a>
        </div>
      )}
    </header>
  );
}

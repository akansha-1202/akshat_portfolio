"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks, profile } from "@/app/constants";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileMenu = mounted
    ? createPortal(
        <>
          <button
            type="button"
            className={`fixed inset-0 z-[60] border-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
              menuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            aria-label="Close menu"
            aria-hidden={!menuOpen}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          />

          <nav
            className={`fixed right-0 top-0 bottom-0 z-[61] flex w-[min(17.5rem,78vw)] flex-col overflow-y-auto border-l border-border bg-[#0c0c0c] px-5 py-6 shadow-[-8px_0_32px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:hidden ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Mobile navigation"
            aria-hidden={!menuOpen}
          >
            <div className="mb-6 flex items-center justify-between pt-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Menu
              </p>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
                aria-label="Close menu"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 transition-colors active:border-accent/40 active:bg-accent/10"
                    onClick={closeMenu}
                  >
                    <span className="text-xs font-bold tracking-wider text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex-1 text-base font-bold text-foreground"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <a
                href="#contact"
                tabIndex={menuOpen ? 0 : -1}
                className="btn-primary flex w-full justify-center text-sm"
                onClick={closeMenu}
              >
                Contact me
              </a>
            </div>
          </nav>
        </>,
        document.body
      )
    : null;

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div
          className={`transition-all duration-300 ${
            scrolled || menuOpen ? "nav-blur py-3" : "bg-transparent py-5"
          }`}
        >
          <nav className="section-container flex items-center justify-between px-5 md:px-10 lg:px-16">
            <a
              href="#"
              className="text-lg font-bold tracking-tight md:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
              onClick={closeMenu}
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

            <a
              href="#contact"
              className="btn-primary hidden text-sm md:inline-flex"
            >
              Contact me
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-surface/80 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-foreground transition-transform duration-200 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-foreground transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-foreground transition-transform duration-200 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}

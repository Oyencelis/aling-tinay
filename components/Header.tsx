"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Peanut } from "./characters/Characters";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      html.classList.add("is-locked");
      lenis?.stop();
    } else {
      html.classList.remove("is-locked");
      lenis?.start();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        <div className="border-b-2 border-ink bg-cream">
          <div className="edge flex h-[var(--header-h)] items-center justify-between gap-4">
            <a
              href="#home"
              className="group flex items-center gap-2.5"
              aria-label="Aling Tinay Peanut Store — back to top"
              data-cursor="grow"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-chili transition-transform duration-200 group-hover:-rotate-6">
                <Peanut className="h-6 w-6" />
              </span>
              <span className="leading-none">
                <span className="display block text-[18px] tracking-[-0.02em] sm:text-[21px]">
                  Aling Tinay
                </span>
                <span className="mt-[5px] block text-[8px] font-bold uppercase tracking-[0.3em] text-brown/60">
                  Peanut Store
                </span>
              </span>
            </a>

            <p className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-brown/55 lg:flex">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-pandan" aria-hidden="true" />
              Sulit · Crunchy · Pang-masa
            </p>

            <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
              {site.nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative text-[11px] font-bold uppercase tracking-[0.16em]"
                  data-cursor="grow"
                >
                  <span className="mr-1.5 align-super text-[8px] text-chili">
                    0{i + 1}
                  </span>
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[75] flex h-10 w-10 flex-col items-center justify-center gap-[5px] border-2 border-ink bg-corn md:hidden"
              data-cursor="grow"
            >
              <span
                className={`block h-[2px] w-4 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] flex flex-col bg-ink text-cream transition-[transform,opacity] duration-500 ease-[cubic-bezier(.7,0,.2,1)] md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="edge flex h-[var(--header-h)] items-center justify-between border-b border-cream/15">
          <span className="display text-[18px]">Aling Tinay</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="border-2 border-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="edge flex flex-1 flex-col justify-center gap-1">
          {site.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-cream/10 py-3"
              tabIndex={open ? 0 : -1}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-chili">0{i + 1}</span>
              <span className="display text-[clamp(38px,12vw,64px)] transition-colors group-hover:text-corn">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="edge pb-8 pt-4">
          <p className="kicker text-cream/40">Usap tayo</p>
          <p className="mt-2 text-sm text-cream/80">{site.contact.phone}</p>
          <p className="text-sm text-cream/80">{site.contact.messengerLabel}</p>
          <p className="mt-4 max-w-[26ch] text-xs leading-relaxed text-cream/40">{site.tagline}</p>
        </div>
      </div>
    </>
  );
}

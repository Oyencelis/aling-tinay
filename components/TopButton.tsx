"use client";

import { useEffect, useState } from "react";

export default function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * 0.9);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className={`fixed bottom-5 right-4 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-cream text-ink shadow-[3px_4px_0_0_#1A1210] transition-all duration-300 hover:bg-corn sm:bottom-7 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      data-cursor="grow"
    >
      <span className="flex flex-col items-center leading-none">
        <svg viewBox="0 0 24 24" className="mb-0.5 h-4 w-4" fill="none" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[8px] font-bold uppercase tracking-[0.18em]">Top</span>
      </span>
    </button>
  );
}

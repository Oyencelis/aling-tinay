"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Anchor navigation works with or without smooth scrolling.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.25 });
      } else {
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    if (reduced) return () => document.removeEventListener("click", onClick);

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.stop();

    const start = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };

    if (document.documentElement.dataset.loaded === "true") start();
    window.addEventListener("loader:done", start);
    document.documentElement.classList.add("lenis-on");

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts finishing late can shift measurements.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("loader:done", start);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}

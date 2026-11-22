"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products, type CategoryId } from "@/data/products";
import ProductCard from "../ProductCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | CategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Lahat" },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.name })),
];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const barDesktop = useRef<HTMLDivElement>(null);
  const barMobile = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const setBar = (p: number) => {
    const width = `${8 + p * 92}%`;
    if (barDesktop.current) barDesktop.current.style.width = width;
    if (barMobile.current) barMobile.current.style.width = width;
  };

  // Pinned horizontal shelf on desktop; native swipe rail on mobile.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrap = pin.current;
      const tr = track.current;
      if (!wrap || !tr) return;

      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      gsap.set(tr, { x: 0 });
      setBar(0);

      if (distance() < 120) return;

      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setBar(self.progress),
          onRefresh: (self) => setBar(self.progress),
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(tr, { x: 0 });
      };
    });

    return () => mm.revert();
  }, [filter]);

  useEffect(() => {
    const wrap = pin.current;
    if (!wrap) return;
    wrap.scrollTo({ left: 0 });
    setBar(0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);

  const nudge = (dir: 1 | -1) => {
    pin.current?.scrollBy({ left: dir * 540, behavior: "smooth" });
  };

  const onRailScroll = () => {
    const wrap = pin.current;
    if (!wrap) return;
    if (window.innerWidth >= 1024) return;
    const max = wrap.scrollWidth - wrap.clientWidth;
    setBar(max > 0 ? wrap.scrollLeft / max : 0);
  };

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative bg-chili pb-16 pt-20 text-cream md:pt-24"
    >
      <div className="edge">
        <div className="flex items-center justify-between border-b border-cream/25 pb-4">
          <p className="kicker text-cream/55">( 05 — Ang buong shelf )</p>
          <p className="kicker hidden text-cream/55 sm:block">26 varieties, isang kanto</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <h2 id="products-title" className="display text-[clamp(46px,9.4vw,140px)]">
              <span className="line-mask block">
                <span>All the</span>
              </span>
              <span className="line-mask block">
                <span className="text-cream/95" style={{ WebkitTextStroke: "2px #F6EBD9", color: "transparent" }}>
                  Snacks
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[13.5px] leading-relaxed text-cream/75">
              Nasa shelf namin ang lahat ng hanap ng kanto — mani, buto, chips, at
              matamis. Sa desktop, hindi ka lang nagba-scroll pakanan: dumadaan talaga
              ang shelf sa harap mo.
            </p>
          </div>

          <div className="relative hidden md:col-span-4 md:col-start-9 md:block">
            <figure className="relative ml-auto w-[74%] rotate-[3deg] border-2 border-ink bg-cream p-1.5 shadow-sticker">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/mani-hero-16x9.webp"
                  alt="A wooden tray of freshly fried peanuts with salt spilled around"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </figure>
            <figure className="absolute -bottom-8 left-0 w-[62%] -rotate-[4deg] border-2 border-ink bg-cream p-1.5 shadow-sticker">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/cornick-hero-16x9.webp"
                  alt="Crispy cornick kernels spilling from a kraft paper cone"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </figure>
            <span className="absolute -right-2 top-1/2 hidden rotate-90 text-[9px] font-bold uppercase tracking-[0.3em] text-cream/50 xl:block">
              Fresh batch
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-cream/25 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter products by category"
            className="no-scrollbar -mx-[var(--edge)] flex gap-2 overflow-x-auto px-[var(--edge)] pb-1 lg:mx-0 lg:px-0 lg:pb-0"
          >
            {filters.map((f) => {
              const active = filter === f.id;
              const count =
                f.id === "all"
                  ? products.length
                  : products.filter((p) => p.category === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`shrink-0 border-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active
                      ? "border-ink bg-cream text-chili"
                      : "border-cream/35 text-cream/75 hover:border-cream hover:text-cream"
                  }`}
                  data-cursor="grow"
                >
                  {f.label}
                  <span className={`ml-1.5 align-super text-[7.5px] ${active ? "text-ink/60" : "text-cream/45"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/55">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
              <span className="ml-2 hidden text-cream/40 sm:inline">· i-drag o i-swipe</span>
              <span className="ml-2 hidden text-corn/80 lg:inline">· i-scroll pababa</span>
            </p>
            <div className="flex gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll products left"
                className="grid h-10 w-10 place-items-center border-2 border-cream/40 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-chili"
                data-cursor="grow"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M14 8H2M7 3 2 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll products right"
                className="grid h-10 w-10 place-items-center border-2 border-cream/40 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-chili"
                data-cursor="grow"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={pin}
        onScroll={onRailScroll}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          if (window.innerWidth >= 1024) return;
          drag.current = {
            down: true,
            startX: event.clientX,
            startScroll: pin.current?.scrollLeft ?? 0,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current.down || !pin.current) return;
          const dx = event.clientX - drag.current.startX;
          if (Math.abs(dx) > 4) {
            pin.current.scrollLeft = drag.current.startScroll - dx;
          }
        }}
        onPointerUp={() => {
          drag.current.down = false;
        }}
        onPointerLeave={() => {
          drag.current.down = false;
        }}
        className="no-scrollbar relative mt-2 flex cursor-grab snap-x snap-mandatory items-center overflow-x-auto active:cursor-grabbing lg:mt-0 lg:h-[100svh] lg:cursor-default lg:overflow-hidden"
      >
        <div className="pointer-events-none absolute left-[var(--edge)] top-[calc(var(--header-h)+14px)] z-10 hidden items-center gap-3 lg:flex">
          <span className="kicker text-cream/50">All the snacks</span>
          <span className="h-px w-16 bg-cream/25" />
          <span className="kicker text-cream/50">{filtered.length} on the shelf</span>
        </div>

        <div
          ref={track}
          className="flex w-max items-center gap-5 px-[var(--edge)] py-8 will-change-transform lg:gap-7"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}

          <div className="flex w-[232px] shrink-0 snap-start flex-col justify-between border-2 border-dashed border-cream/40 p-4 text-cream/80 sm:w-[254px]">
            <p className="display text-[26px] leading-[0.9]">Hindi nakalista lahat.</p>
            <div>
              <p className="text-[11.5px] leading-snug text-cream/60">
                Mas marami sa tindahan. Pumunta ka na lang — libre ang amoy.
              </p>
              <a href="#visit" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]" data-cursor="grow">
                Bisitahin
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-[var(--edge)] bottom-5 z-10 hidden lg:block">
          <div className="h-[3px] w-full bg-cream/25" aria-hidden="true">
            <div ref={barDesktop} className="h-full w-[8%] bg-corn" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-cream/45">
            <span>Scroll pababa — dadaan ang shelf</span>
            <span>Presyo: pansamantala pa — i-update sa tindahan</span>
          </div>
        </div>
      </div>

      <div className="edge lg:hidden">
        <div className="h-[3px] w-full bg-cream/20" aria-hidden="true">
          <div ref={barMobile} className="h-full w-[8%] bg-corn" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-cream/45">
          <span>Presyo: pansamantala pa — i-update sa tindahan</span>
          <span className="hidden sm:block">Scroll pakanan →</span>
        </div>
      </div>
    </section>
  );
}

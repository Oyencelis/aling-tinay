"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { categories, type Product } from "@/data/products";

const rotations = ["-1.6deg", "1.2deg", "-0.6deg", "1.9deg", "-1.1deg"];
const shapes = ["", "tag-notch", "", "", "tag-notch"];

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const tilt = useRef<HTMLDivElement>(null);
  const category = categories.find((c) => c.id === product.category);
  const rot = rotations[index % rotations.length];
  const shape = product.featured ? "" : shapes[index % shapes.length];

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = tilt.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 12,
      rotateX: -py * 12,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    const el = tilt.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      className={`group relative w-[232px] shrink-0 snap-start transition-transform duration-300 hover:-translate-y-2 sm:w-[254px] ${
        product.featured ? "sm:w-[292px]" : ""
      }`}
      data-cursor="grow"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={tilt} className="will-change-transform">
        <div
          className={`tag-card card-jiggle relative border-2 border-ink bg-cream p-2 text-ink shadow-sticker ${shape}`}
          style={{ "--rot": rot } as CSSProperties}
        >
          <div className="relative aspect-square overflow-hidden border border-ink/25 bg-brown/10">
            <Image
              src={product.image}
              alt={`${product.name} — ${product.tagalogLine}`}
              fill
              sizes="(max-width: 640px) 232px, 300px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <span className="absolute left-2 top-2 max-w-[85%] border border-ink bg-cream/95 px-1.5 py-0.5 text-[8px] font-bold uppercase leading-tight tracking-[0.12em]">
              {category?.name}
            </span>
            {product.featured && (
              <span className="absolute -right-2.5 -top-2.5 rotate-[9deg] border-2 border-ink bg-chili px-2 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-cream shadow-[2px_3px_0_0_#1A1210]">
                Star ng shelf
              </span>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-2 px-0.5 pt-2.5">
            <h3 className="display text-[18px] leading-[0.95]">{product.name}</h3>
            <span
              className="shrink-0 text-[11px] font-bold tabular-nums text-brown/75"
              aria-label={`Price ${product.price}`}
            >
              {product.price}
            </span>
          </div>
          <p className="mt-1.5 px-0.5 pb-0.5 text-[11.5px] leading-snug text-brown/70">
            {product.tagalogLine}
          </p>
        </div>
      </div>
    </article>
  );
}

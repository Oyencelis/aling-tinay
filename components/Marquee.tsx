"use client";

import type { CSSProperties } from "react";
import { products } from "@/data/products";
import { useVelocityMarquee } from "./useVelocityMarquee";

type Props = {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  outline?: boolean;
  /** "lg" is the full-width name shelf, "sm" is the thin tagline strip. */
  size?: "lg" | "sm";
  /** Stroke colour for outlined rows (CSS custom property). */
  stroke?: string;
};

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Marquee({
  items,
  speed = 60,
  reverse = false,
  className = "",
  outline = true,
  size = "lg",
  stroke,
}: Props) {
  const names = items ?? products.map((p) => p.name);
  const track = useVelocityMarquee<HTMLDivElement>(reverse, speed);

  const typeSize =
    size === "sm" ? "text-[clamp(18px,2.6vw,38px)] px-3" : "text-[clamp(42px,7vw,108px)] px-4";
  const starSize =
    size === "sm"
      ? "h-[clamp(8px,0.9vw,12px)] w-[clamp(8px,0.9vw,12px)]"
      : "h-[clamp(14px,1.6vw,22px)] w-[clamp(14px,1.6vw,22px)]";

  return (
    <div className={`marquee overflow-hidden ${className}`} aria-hidden="true">
      <div ref={track} className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {names.map((name) => (
              <span key={`${copy}-${name}`} className="flex items-center">
                <span
                  className={`display whitespace-nowrap leading-none ${typeSize} ${
                    outline ? "display-outline" : ""
                  }`}
                  style={outline && stroke ? ({ "--outline": stroke } as CSSProperties) : undefined}
                >
                  {name}
                </span>
                <Star className={`${starSize} shrink-0 text-current opacity-60`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

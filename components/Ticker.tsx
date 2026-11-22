"use client";

import { useVelocityMarquee } from "./useVelocityMarquee";

type Props = {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
};

/** Small uppercase running strip for in-scene texture. */
export default function Ticker({ items, className = "", reverse = false, speed = 26 }: Props) {
  const track = useVelocityMarquee<HTMLDivElement>(reverse, speed);

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div ref={track} className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center whitespace-nowrap text-[9.5px] font-bold uppercase tracking-[0.24em]"
              >
                <span className="px-4">{item}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-current opacity-50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useId } from "react";

type Props = {
  text?: string;
  className?: string;
  bg?: string;
  fg?: string;
  center?: React.ReactNode;
};

export default function SpinBadge({
  text = "FRESH • CRUNCHY • SULIT • ",
  className = "",
  bg = "#F2B705",
  fg = "#1A1210",
  center,
}: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pathId = `badge-${id}`;

  return (
    <div className={`${className} spin-slow`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="100" cy="100" r="98" fill={bg} stroke="#1A1210" strokeWidth="4" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="#1A1210" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.5" />
        <defs>
          <path id={pathId} d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
        </defs>
        <text fill={fg} fontSize="12.5" fontWeight="700" letterSpacing="1.5" fontFamily="var(--font-body), sans-serif">
          <textPath href={`#${pathId}`} startOffset="0">
            {text.repeat(2)}
          </textPath>
        </text>
        <g fill={fg}>{center ?? <circle cx="100" cy="100" r="6" />}</g>
      </svg>
    </div>
  );
}

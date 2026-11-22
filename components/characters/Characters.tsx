import type { SVGProps } from "react";

/**
 * Hand-drawn flat mascots. One consistent recipe for all of them:
 * thick ink outline, one flat body colour, a small highlight, simple dot face.
 * No icon packs, no gradients.
 */

type CharProps = SVGProps<SVGSVGElement>;

const ink = "#1A1210";

const face = (cx = 50, cy = 54, mood: "smile" | "grin" | "wink" = "smile") => (
  <g>
    <circle cx={cx - 12} cy={cy} r="3.6" fill={ink} />
    {mood === "wink" ? (
      <path d={`M${cx + 8} ${cy}h8`} stroke={ink} strokeWidth="3.4" strokeLinecap="round" />
    ) : (
      <circle cx={cx + 12} cy={cy} r="3.6" fill={ink} />
    )}
    {mood === "grin" ? (
      <path
        d={`M${cx - 8} ${cy + 9}c4 8 12 8 16 0`}
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="#D93A25"
      />
    ) : (
      <path
        d={`M${cx - 7} ${cy + 9}c4 5 10 5 14 0`}
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
    )}
  </g>
);

export function Peanut({ mood = "smile", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M50 8c20 0 28 12 28 26 0 8-4 12-4 16s4 8 4 16c0 14-8 26-28 26S22 80 22 66c0-8 4-12 4-16s-4-8-4-16C22 20 30 8 50 8Z"
        fill="#E0B27C"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M34 24c5-6 14-8 21-6" stroke="#F6EBD9" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M31 48c3 2 6 2 9 0M60 46c3 2 6 2 9 0M38 74c4 3 8 3 12 0" stroke="#B98A52" strokeWidth="3" strokeLinecap="round" />
      {face(50, 54, mood)}
    </svg>
  );
}

export function CornKernel({ mood = "smile", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M50 6c11 0 17 13 22 27 4 11 8 17 8 26 0 15-13 25-30 25S20 74 20 59c0-9 4-15 8-26C33 19 39 6 50 6Z"
        fill="#F2B705"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M50 14v20" stroke="#C99400" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M36 20c4-4 9-6 14-6" stroke="#FFE9A8" strokeWidth="5" strokeLinecap="round" />
      {face(50, 54, mood)}
    </svg>
  );
}

export function Cashew({ mood = "smile", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M62 14c16 3 26 19 22 35-4 20-24 40-44 36C22 81 10 62 16 45c4-13 18-19 28-16 7 2 11-6 13-10 2-3 3-6 5-5Z"
        fill="#EFD8B4"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M67 24c10 4 15 14 13 25-2 14-14 25-26 27" stroke="#C9A87C" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M34 30c5-3 10-3 15-1" stroke="#FFF8EA" strokeWidth="5" strokeLinecap="round" />
      {face(52, 56, mood)}
    </svg>
  );
}

export function BananaChip({ mood = "smile", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M22 34c8-14 30-20 44-12 13 7 18 24 12 38-7 16-28 22-44 16-15-5-21-25-12-42Z"
        fill="#F7CD6B"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M33 87C24 68 38 44 61 37" stroke="#D9A23C" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M36 24c6-4 13-5 19-3" stroke="#FFF3C4" strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="33" r="3.2" fill="#B57C2E" opacity="0.8" />
      <circle cx="28" cy="58" r="2.6" fill="#B57C2E" opacity="0.8" />
      <circle cx="66" cy="74" r="2.2" fill="#B57C2E" opacity="0.7" />
      {face(50, 51, mood)}
    </svg>
  );
}

export function GummyWorm({ mood = "grin", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 74c0-13 10-18 21-18 12 0 20 6 20-4 0-11-13-13-10-24 3-12 18-18 29-10"
        stroke={ink}
        strokeWidth="27"
        strokeLinecap="round"
      />
      <path
        d="M18 74c0-13 10-18 21-18 12 0 20 6 20-4 0-11-13-13-10-24 3-12 18-18 29-10"
        stroke="#3F7D4E"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path d="M30 66h.1M52 63h.1" stroke="#7CB88B" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(60 14) scale(0.62)">
        {face(30, 18, mood)}
      </g>
    </svg>
  );
}

export function Chili({ mood = "grin", ...props }: CharProps & { mood?: "smile" | "grin" | "wink" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <path
        d="M56 26c16 4 26 20 23 37-3 18-17 28-31 24-15-4-23-19-17-34 4-10 11-14 9-21-1-4 4-6 7-4 3 2 5 2 9-2Z"
        fill="#D93A25"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M63 26c3-10 10-14 19-13-2 8-9 13-16 14" fill="#3F7D4E" stroke={ink} strokeWidth="4.4" strokeLinejoin="round" />
      <path d="M74 36c7 6 10 15 8 24" stroke="#FF8A73" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      <g transform="translate(2 8)">
        {face(48, 54, mood)}
      </g>
    </svg>
  );
}

export const characters = {
  peanut: Peanut,
  corn: CornKernel,
  cashew: Cashew,
  banana: BananaChip,
  worm: GummyWorm,
  chili: Chili,
} as const;

export type CharacterName = keyof typeof characters;

export function Character({
  name,
  ...props
}: { name: CharacterName } & CharProps) {
  const Component = characters[name];
  return <Component {...props} />;
}

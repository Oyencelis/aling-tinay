import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  rotate?: number;
  sizes?: string;
  priority?: boolean;
  tape?: boolean;
  ratio?: "square" | "wide" | "portrait";
};

const ratios = {
  square: "aspect-square",
  wide: "aspect-[16/9]",
  portrait: "aspect-[4/5]",
};

export default function TapedPhoto({
  src,
  alt,
  caption,
  className = "",
  rotate = -2,
  sizes = "(max-width: 768px) 60vw, 320px",
  priority = false,
  tape = true,
  ratio = "square",
}: Props) {
  return (
    <figure
      className={`relative border-2 border-ink bg-cream p-2 shadow-sticker ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && (
        <span
          className="tape absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 border border-ink/20"
          aria-hidden="true"
        />
      )}
      <div className={`relative overflow-hidden border border-ink/15 bg-brown/10 ${ratios[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="flex items-center justify-between gap-3 px-1 pb-0.5 pt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-brown/70">
          <span>{caption}</span>
          <span aria-hidden="true">AT</span>
        </figcaption>
      )}
    </figure>
  );
}

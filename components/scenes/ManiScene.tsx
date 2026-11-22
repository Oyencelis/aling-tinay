import FeaturedScene, { type FeaturedSceneData } from "./FeaturedScene";

const mani: FeaturedSceneData = {
  id: "mani",
  index: "02 — Ang paborito",
  eyebrow: "Mani · ang laging nauuna",
  title: "MANI",
  titleSize: "clamp(96px, 17vw, 240px)",
  tagline: "Pritong mani. Saktong alat. Walang tigil.",
  body:
    "Pinipili namin ang bawat butil bago pa umabot sa kawali. Mabagal ang prito — kaya malutong pagdating sa'yo, hindi matigas at hindi mamantika.",
  photo: "/images/mani-portrait.webp",
  photoAlt: "Freshly fried salted peanuts spilling from a kraft paper bag",
  tags: ["Plain", "Garlic", "Spicy", "Sweet"],
  callouts: [
    { text: "Saktong alat", className: "right-[3%] top-[34%] rotate-2", arrow: "left" },
    { text: "Bagong prito", className: "right-[28%] top-[68%] rotate-[-3deg]", arrow: "down" },
    { text: "Isang supot, isang upuan", className: "left-[46%] top-[78%] hidden xl:flex", arrow: "right" },
  ],
  next: { href: "#cornick", label: "Cornick" },
  bg: "#3B2314",
  fg: "#F6EBD9",
  accent: "#D93A25",
  badgeBg: "#F2B705",
  badgeFg: "#1A1210",
  price: "₱40",
  weight: "250g",
};

export default function ManiScene() {
  return <FeaturedScene data={mani} />;
}

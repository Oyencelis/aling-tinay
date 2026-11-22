import FeaturedScene, { type FeaturedSceneData } from "./FeaturedScene";

const cornick: FeaturedSceneData = {
  id: "cornick",
  index: "03 — Ang pambansang crunch",
  eyebrow: "Cornick · ang tunog",
  title: "CORNICK",
  titleSize: "clamp(62px, 12.8vw, 184px)",
  echoSize: "clamp(68px, 13.8vw, 200px)",
  tagline: "Kulot sa dilim. Malutong sa ngipin.",
  body:
    "Bagong mantika, bagong bawang, bagong batch. Habang mainit pa, tinatapon namin ang asin — kaya nasa dulo ang alat, hindi sa simula.",
  photo: "/images/cornick-portrait.webp",
  photoAlt: "Golden crispy cornick piled in a chipped enamel bowl",
  tags: ["Plain", "Garlic", "Spicy"],
  callouts: [
    { text: "Bawang na totoo", className: "left-0 top-[42%]", arrow: "down" },
    { text: "Kulot, hindi basa", className: "left-0 top-[50%]", arrow: "down" },
  ],
  next: { href: "#crunchy", label: "Paano 'to ginagawa" },
  bg: "#F2B705",
  fg: "#1A1210",
  accent: "#3F7D4E",
  badgeBg: "#D93A25",
  badgeFg: "#F6EBD9",
  price: "₱35",
  weight: "250g",
};

export default function CornickScene() {
  return <FeaturedScene data={cornick} />;
}

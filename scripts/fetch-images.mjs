/**
 * One-off asset pipeline: downloads the generated editorial photos and writes
 * optimised .webp files into /public/images. Safe to re-run; it overwrites.
 *
 *   node scripts/fetch-images.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BASE = "https://www.codebuff.com/api/v1/generate-image/";
const root = process.cwd();

const singles = {
  "mani-hero-16x9": "48e48157-267f-4bbe-a82b-bb6e714e488a",
  "cornick-hero-16x9": "f3219cda-20b3-433a-99bb-58c3b0b2125a",
  "mani-portrait": "5a2f2af1-7fa4-4dee-88d2-727a441207af",
  "cornick-portrait": "2af1ccb4-f94e-4088-9966-974e1f995933",
  storefront: "0998c64e-9704-476a-a040-d87e3ce1470b",
  "hands-snack": "50fe84a0-a05b-4825-9e8e-e2ea5a455ec0",
  "process-pili": "205267e4-de14-46d7-909d-30d4c09eb362",
  "process-roast": "4f2abe9e-07af-4bec-b3d0-03afa0672964",
  "process-pack": "45bf5258-c3d6-47ed-a6e3-1ee7ac84719f",
  "process-serve": "586b4e6e-a761-4010-8254-b13322ff4ba3",
};

const products = {
  mani: "c8f98fe5-1b62-45ab-8aea-e06eed4b23d4",
  cornick: "72c99eb5-b14d-4a2d-8d87-e98021a89b85",
  "mix-nuts": "734d2278-203d-4db8-a104-a7f52b36a24e",
  "butong-pakwan": "396aee8a-5b68-4a94-a9f3-2eff8f508667",
  "butong-kalabasa": "f908b0a0-c1af-4634-8f0b-e12e4cf74ee4",
  "sweet-beans": "3da26e5f-ab97-4553-9daf-942573f47f73",
  "pop-beans": "1c86cb7b-f946-4615-bddc-74025decd48d",
  kasoy: "4a836c84-adf7-443f-9c32-7cc1d1bbe9ff",
  "beer-nuts-spicy": "384ce85a-3c3f-411e-bcd4-34681c7808ac",
  "beer-nuts-garlic": "5dc112bc-2a88-4653-a71e-28ab0ef9461f",
  "cracker-nuts": "0b2cbd1e-27d6-4775-98ca-7d7d148e6001",
  "jumbo-nuts": "ebc1f1cc-30d2-445e-923d-b2962a7ee755",
  "corn-pop": "72a82ad0-6d86-4af3-9169-375f5a4de7ba",
  pusit: "13dfc129-ca42-4864-a457-37aff07e887b",
  dilis: "29ef7f50-5ba4-4058-8ac3-6aae9531f843",
  "banana-chips": "ff09db95-191e-46be-a916-108138552f5d",
  "cassava-chips": "9122d71b-93b2-4ed5-bf81-057d0ed372de",
  "peanut-brittle": "50fadc67-b560-407c-b0f3-c9f819461724",
  "peanut-bar": "bc71903a-7f6a-441a-8ee6-2f002a1f6489",
  "gummy-worm": "086a8ed3-fbc4-4d39-a0bc-3c65a38ff684",
  "gummy-orange": "c1c2b477-6d09-4304-91e4-69ab312321ae",
  "mango-cubes": "89a75972-86f7-48e1-982e-3be7f7664145",
  sprinkles: "1c0b0c65-c1ba-47d8-a187-35423f207e97",
  "shing-a-ling": "29d00363-8e2b-4c64-b2ec-eff5de73898e",
  champoy: "aa543a61-e242-4942-acae-2ac4c662d0ef",
  kiyamoy: "c417e813-3096-4ad2-a529-7e9e2b1fb123",
};

async function grab(id, outPath, width) {
  const res = await fetch(`${BASE}${id}.jpg`);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(outPath), { recursive: true });
  await sharp(buffer)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outPath);
  console.log(`✓ ${path.relative(root, outPath)}`);
}

for (const [name, id] of Object.entries(singles)) {
  await grab(id, path.join(root, "public", "images", `${name}.webp`), 1600);
}

for (const [slug, id] of Object.entries(products)) {
  await grab(id, path.join(root, "public", "images", "products", `${slug}.webp`), 1000);
}

console.log("Done.");

/**
 * ALING TINAY — EDIT ME
 * Every placeholder lives here. Strings inside [square brackets] must be replaced
 * before you publish. Nothing here is invented history: no founding year, no awards.
 */

export type Stat = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  /** true = sample number, replace it. Shown with a small "sample" mark on the site. */
  placeholder: boolean;
};

export const site = {
  name: "Aling Tinay Peanut Store",
  shortName: "Aling Tinay",
  tagline: "Sulit. Crunchy. Pang-masa.",

  hero: {
    lines: ["ALL FOR", "MASARAP", "MUNCHING."],
    tagalog: "Lahat ng meryenda, nasa Aling Tinay.",
    note: "Mani, cornick, at kung anu-ano pa. Laging bagong luto.",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Visit", href: "#visit" },
    { label: "Contact", href: "#contact" },
  ],

  contact: {
    /** TODO: replace with the real number, international format for tel: links */
    phone: "[+63 9XX XXX XXXX]",
    phoneHref: "tel:+639XXXXXXXXX",
    email: "[hello@alingtinay.ph]",
    facebookLabel: "[facebook.com/alingtinaypeanutstore]",
    facebookUrl: "https://facebook.com/",
    messengerLabel: "[m.me/alingtinaypeanutstore]",
    messengerUrl: "https://m.me/",
    /** Where the inquiry form opens. mailto works with no backend. */
    formRecipient: "[hello@alingtinay.ph]",
  },

  address: {
    line1: "Sumulong Street",
    line2: "Barangay San Juan (Site)",
    region: "Morong, Rizal",
    landmark: "Hanapin ang dilaw na karatula ng Aling Tinay sa Sumulong Street.",
    /** Keyless Google Maps embed. Swap for your own embed URL if you have one. */
    mapEmbedUrl:
      "https://www.google.com/maps?q=Sumulong%20Street%2C%20Barangay%20San%20Juan%20(Site)%2C%20Morong%2C%20Rizal&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sumulong%20Street%2C%20Barangay%20San%20Juan%20(Site)%2C%20Morong%2C%20Rizal",
  },

  hours: [
    { day: "Lunes – Biyernes", time: "[7:00 AM – 8:00 PM]" },
    { day: "Sabado", time: "[7:00 AM – 9:00 PM]" },
    { day: "Linggo", time: "[8:00 AM – 5:00 PM]" },
  ],

  /** Footer links. Keep them short. */
  footer: {
    columns: [
      {
        title: "Meryenda",
        links: [
          { label: "Mani", href: "#mani" },
          { label: "Cornick", href: "#cornick" },
          { label: "Lahat ng snacks", href: "#products" },
        ],
      },
      {
        title: "Store",
        links: [
          { label: "Sino kami", href: "#about" },
          { label: "Paano ginagawa", href: "#crunchy" },
          { label: "Bisitahin", href: "#visit" },
        ],
      },
      {
        title: "Usap tayo",
        links: [
          { label: "Messenger", href: "https://m.me/" },
          { label: "Facebook", href: "https://facebook.com/" },
          { label: "Mag-order", href: "#order" },
        ],
      },
    ],
  },
};

export const stats: Stat[] = [
  {
    id: "varieties",
    value: 26,
    suffix: "",
    label: "snack varieties on the shelf",
    placeholder: false,
  },
  {
    id: "bags",
    value: 1200,
    suffix: "+",
    label: "bags packed every week",
    placeholder: true,
  },
  {
    id: "returning",
    value: 9,
    suffix: "/10",
    label: "bumabalik para sa isa pa",
    placeholder: true,
  },
];

/** The shelf ticker at the bottom of the stats scene. */
export const statNote = "Ang 26 ay totoo — galing sa listahan. Ang dalawa, palitan mo ng totoong bilang mo sa data/site.ts.";

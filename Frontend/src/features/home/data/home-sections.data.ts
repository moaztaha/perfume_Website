/**
 * Static data for HomePage sections
 */

export type TrendingProduct = {
  id: string;
  name: string;
  notes: string;
  price: number;
  image: string;
};

export type ScentArchetype = {
  id: string;
  name: string;
  notes: string;
  image: string;
};

export type Occasion = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type FooterLinks = {
  collections: string[];
  customerCare: string[];
  aboutUs: string[];
};

// Product data for the trending section
export const trendingProducts: TrendingProduct[] = [
  {
    id: "fleur-de-lune",
    name: "Fleur de Lune",
    notes: "Floral / Jasmine & White Musk",
    price: 195,
    image: "/images/products/fleur-de-lune.png",
  },
  {
    id: "santal-parchment",
    name: "Santal Parchment",
    notes: "Woody / Sandalwood & Cardamom",
    price: 220,
    image: "/images/products/santal-parchment.png",
  },
  {
    id: "sol-dor",
    name: "Sol d'Or",
    notes: "Fresh / Bergamot & Sea Salt",
    price: 185,
    image: "/images/products/sol-dor.png",
  },
  {
    id: "noir-cocoon",
    name: "Noir Cocoon",
    notes: "Oriental / Tobacco & Amber",
    price: 240,
    image: "/images/products/noir-cocoon.png",
  },
];

// Scent archetype data
export const scentArchetypes: ScentArchetype[] = [
  {
    id: "floral",
    name: "Floral",
    notes: "Rose, Jasmine, Neroli",
    image: "/images/categories/floral.png",
  },
  {
    id: "woody",
    name: "Woody",
    notes: "Cedarwood, Oud, Santal",
    image: "/images/categories/woody.png",
  },
  {
    id: "oriental",
    name: "Oriental",
    notes: "Amber, Spices, Vanilla",
    image: "/images/categories/oriental.png",
  },
  {
    id: "fresh",
    name: "Fresh",
    notes: "Citrus, Marine, Herbs",
    image: "/images/categories/fresh.png",
  },
];

// Occasions data
export const occasions: Occasion[] = [
  {
    id: "Wedding",
    name: "Wedding",
    description: "Immortalize the vows with notes of white jasmine",
    image: "/images/Wedding.png",
  },
  {
    id: "Birthday",
    name: "Birthday",
    description: "Vibrant, celebrating a personal revolution",
    image: "/images/Birthday.png",
  },
  {
    id: "Gift Sets",
    name: "Gift Sets",
    description: "A bespoke gesture of ultimate prestige",
    image: "/images/Gifts & Occasions.png",
  },
  {
    id: "Personal Use",
    name: "Personal Use",
    description: "Everyday luxury as second skin",
    image: "/images/Personal Use.webp",
  },
];

// Footer links
export const footerLinks: FooterLinks = {
  collections: [
    "La Maison",
    "Private Reserve",
    "Scented Candles",
    "Discovery Sets",
  ],
  customerCare: [
    "Olfactory Consultation",
    "Shipping & Returns",
    "Atelier Appointments",
    "Care Guide",
  ],
  aboutUs: [
    "Our Philosophy",
    "Sourcing Standards",
    "Sustainability Commitments",
    "Journal",
  ],
};

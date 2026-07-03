import type { DeliveredOrder } from "@/data/delivered-orders";

export interface DesignTheme {
  slug: string;
  label: string;
  swatch: string;
  palette: string[];
}

export interface DesignGalleryInfo {
  name: string;
  tagline: string;
  description: string;
  signature: string;
  tags: string[];
  tone: "light" | "dark";
  accent: string;
}

export interface DesignRoutingInfo {
  slug: string;
  themes: DesignTheme[];
  defaultTheme: string;
}

export interface DesignEntry extends DesignGalleryInfo, DesignRoutingInfo {}

export interface InvitationCardProps {
  order: DeliveredOrder;
  initialTheme?: string;
}

export const DESIGNS: DesignEntry[] = [
  {
    slug: "petal-atelier",
    name: "Petal Atelier",
    tagline: "Apple-luxury elegance",
    description:
      "Champagne ivory and blush rose glassmorphism — an editorial Islamic invitation with drifting petals and live countdown.",
    accent: "from-[#F7F3EE] via-[#E8C6C1] to-[#D9B67A]",
    signature: "Floating rose petals",
    tags: ["Glassmorphism", "Blush Rose", "Champagne Gold"],
    tone: "light",
    defaultTheme: "ivory-blush",
    themes: [
      { slug: "ivory-blush", label: "Ivory Blush", swatch: "#D9B67A", palette: ["#FBF8F4", "#E8C6C1", "#D9B67A", "#4B3A2A"] },
      { slug: "amethyst-silver", label: "Amethyst Silver", swatch: "#9B72CF", palette: ["#F7F3FF", "#D4B8E8", "#9B72CF", "#2D1A4A"] },
      { slug: "crimson-maroon", label: "Crimson Maroon", swatch: "#8B1A2E", palette: ["#FDF4F4", "#D4818E", "#8B1A2E", "#3A0D18"] },
    ],
  },
  {
    slug: "malabar-heritage",
    name: "Malabar Heritage",
    tagline: "Kerala heritage",
    description:
      "Emerald and gold elegance rooted in Malabar tradition — timeless, regal, and warm.",
    accent: "from-[#0a3d30] via-[#0f5e4a] to-[#d4af37]",
    signature: "Glass countdown",
    tags: ["Emerald & Gold", "Glassmorphism", "Live RSVP"],
    tone: "light",
    defaultTheme: "emerald-gold",
    themes: [
      { slug: "emerald-gold", label: "Emerald Gold", swatch: "#0f5e4a", palette: ["#0f5e4a", "#1a8b6a", "#d4af37", "#faf8f3"] },
      { slug: "sapphire-pearl", label: "Sapphire Pearl", swatch: "#1e3a5f", palette: ["#1e3a5f", "#2c5f7a", "#e8f0f5", "#faf8f3"] },
      { slug: "rose-copper", label: "Rose Copper", swatch: "#b76e79", palette: ["#b76e79", "#e8c6c1", "#c8956b", "#faf8f3"] },
    ],
  },
  {
    slug: "noor-e-nikah",
    name: "Noor-e-Nikah",
    tagline: "Sacred & serene",
    description:
      "Luminous Islamic motifs with graceful Arabic calligraphy framed by gold filigree.",
    accent: "from-[#152a45] via-[#2c5f7a] to-[#c9a227]",
    signature: "Mihrab arch reveal",
    tags: ["Calligraphy", "Khatam Star", "Filigree"],
    tone: "dark",
    defaultTheme: "navy-gold",
    themes: [
      { slug: "navy-gold", label: "Navy Gold", swatch: "#1e3a5f", palette: ["#1e3a5f", "#2c5f7a", "#c9a227", "#faf8f3"] },
      { slug: "emerald-ivory", label: "Emerald Ivory", swatch: "#0f5e4a", palette: ["#0f5e4a", "#1a8b6a", "#faf8f3", "#c9a227"] },
      { slug: "rose-gold", label: "Rose Gold", swatch: "#b76e79", palette: ["#b76e79", "#e8c6c1", "#d4af37", "#faf8f3"] },
    ],
  },
  {
    slug: "celestial-canvas",
    name: "Celestial Canvas",
    tagline: "Deep-space awe",
    description:
      "Names written in star constellations over a living, twinkling starfield.",
    accent: "from-[#050508] via-[#1a0a2e] to-[#0d1b2a]",
    signature: "Shooting-star reveal",
    tags: ["Starfield", "Parallax", "Constellation"],
    tone: "dark",
    defaultTheme: "indigo-gold",
    themes: [
      { slug: "indigo-gold", label: "Indigo Gold", swatch: "#1a0a2e", palette: ["#050508", "#1a0a2e", "#0d1b2a", "#f4e4b8"] },
      { slug: "purple-magenta", label: "Purple Magenta", swatch: "#6b2d8f", palette: ["#1a0a2e", "#6b2d8f", "#c026d3", "#f4e4b8"] },
      { slug: "blue-teal", label: "Blue Teal", swatch: "#0d1b2a", palette: ["#0d1b2a", "#1a3a5c", "#2c8f9f", "#e8f0f5"] },
    ],
  },
  {
    slug: "nordic-minimal",
    name: "Nordic Minimal",
    tagline: "Scandinavian winter",
    description:
      "Crisp, minimal frost aesthetics with quiet warmth and gently falling snow.",
    accent: "from-[#e8f0f5] via-[#bcd4e6] to-[#6f97b8]",
    signature: "Falling-snow drift",
    tags: ["Minimal", "Frost Glass", "Snowfall"],
    tone: "light",
    defaultTheme: "frost-silver",
    themes: [
      { slug: "frost-silver", label: "Frost Silver", swatch: "#bcd4e6", palette: ["#e8f0f5", "#bcd4e6", "#8fb3cc", "#1e3a5f"] },
      { slug: "navy-teal", label: "Navy Teal", swatch: "#1e3a5f", palette: ["#1e3a5f", "#2c5f7a", "#2c8f9f", "#e8f0f5"] },
      { slug: "blush-champagne", label: "Blush Champagne", swatch: "#e8c6c1", palette: ["#f7f3ee", "#e8c6c1", "#d9b67a", "#4b3a2a"] },
    ],
  },
  {
    slug: "mughal-miniature",
    name: "Mughal Miniature",
    tagline: "Royal grandeur",
    description:
      "Dense jewel-tone ornamentation and gold filigree borders from miniature painting.",
    accent: "from-[#8b1a2d] via-[#c9a227] to-[#1e3a5f]",
    signature: "Filigree border draw",
    tags: ["Jewel Tones", "Ornate", "Heritage"],
    tone: "dark",
    defaultTheme: "ruby-gold",
    themes: [
      { slug: "ruby-gold", label: "Ruby Gold", swatch: "#8b1a2d", palette: ["#8b1a2d", "#c9a227", "#1e3a5f", "#f5e6d3"] },
      { slug: "sapphire-emerald", label: "Sapphire Emerald", swatch: "#1e3a5f", palette: ["#1e3a5f", "#0f5e4a", "#c9a227", "#f5e6d3"] },
      { slug: "ivory-rose", label: "Ivory Rose", swatch: "#e8c6c1", palette: ["#faf8f3", "#e8c6c1", "#d4af37", "#8b1a2d"] },
    ],
  },
  {
    slug: "monsoon-garden",
    name: "Monsoon Garden",
    tagline: "Lush & blooming",
    description:
      "A rain-blessed, verdant theme where two hearts bloom together with the season.",
    accent: "from-[#1b4332] via-[#2d6a4f] to-[#74c69d]",
    signature: "Monsoon rainfall",
    tags: ["Botanical", "Rainfall", "Verdant"],
    tone: "dark",
    defaultTheme: "green-silver",
    themes: [
      { slug: "green-silver", label: "Green Silver", swatch: "#2d6a4f", palette: ["#1b4332", "#2d6a4f", "#74c69d", "#f0fff4"] },
      { slug: "purple-magenta", label: "Purple Magenta", swatch: "#6b2d8f", palette: ["#2d1a4a", "#6b2d8f", "#c026d3", "#74c69d"] },
      { slug: "gold-green", label: "Gold Green", swatch: "#d4af37", palette: ["#d4af37", "#2d6a4f", "#74c69d", "#f0fff4"] },
    ],
  },
];

export function getDesign(slug: string): DesignEntry | undefined {
  return DESIGNS.find((d) => d.slug === slug);
}

export function getDesignThemes(slug: string): DesignTheme[] {
  return getDesign(slug)?.themes ?? [];
}

export function getThemeSlugs(slug: string): string[] {
  return getDesignThemes(slug).map((t) => t.slug);
}

export function isValidTheme(designSlug: string, themeSlug: string): boolean {
  return getThemeSlugs(designSlug).includes(themeSlug);
}

export function getDesignTheme(
  designSlug: string,
  themeSlug: string,
): DesignTheme | undefined {
  return getDesignThemes(designSlug).find((t) => t.slug === themeSlug);
}

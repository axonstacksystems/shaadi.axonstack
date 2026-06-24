export interface InvitationTheme {
  id: string;
  label: string;
  swatch: string;

  /** Page / cover backgrounds */
  pageBg: string;
  coverBg: string;

  /** Primary gold / accent */
  gold: string;
  goldLight: string;
  goldMuted: string;

  /** Floral / petal colors */
  petalPrimary: string;
  petalSecondary: string;
  petalFill: string;

  /** Text colors */
  textDark: string;
  textMid: string;
  textLight: string;
  arabicColor: string;

  /** Ampersand */
  ampersandColor: string;

  /** Glass card */
  glassBg: string;
  glassBorder: string;
  glassShadow: string;

  /** Button */
  buttonBg: string;
  buttonText: string;
  buttonCircleBg: string;

  /** Gradient lines / dividers */
  dividerColor: string;

  /** Sunlight / ambient radial */
  ambientTop: string;
  ambientBottom: string;

  /** Mosque silhouette tint */
  mosqueTint: string;
}

export const THEMES: Record<string, InvitationTheme> = {
  "ivory-blush": {
    id: "ivory-blush",
    label: "Ivory Blush",
    swatch: "#D9B67A",

    pageBg: "linear-gradient(180deg, #FFFDFC 0%, #FAF4EF 100%)",
    coverBg: "linear-gradient(170deg,#FDF6EF 0%,#F5E8D8 40%,#EDD9C4 100%)",

    gold: "#CBA46A",
    goldLight: "#D9B67A",
    goldMuted: "#B99054",

    petalPrimary: "#ECC9C3",
    petalSecondary: "#D8A9A2",
    petalFill: "#FBF8F4",

    textDark: "#3D2B1A",
    textMid: "#7A5C3E",
    textLight: "#85705C",
    arabicColor: "#CBA46A",

    ampersandColor: "#C9A882",

    glassBg: "rgba(255,255,255,0.82)",
    glassBorder: "rgba(255,255,255,0.95)",
    glassShadow: "rgba(203,164,106,0.08)",

    buttonBg: "rgba(255,255,255,0.82)",
    buttonText: "#3D2B1A",
    buttonCircleBg: "linear-gradient(135deg,#E7C58A 0%,#CBA46A 50%,#C99B57 100%)",

    dividerColor: "#D9B67A",

    ambientTop: "rgba(255,240,210,0.7)",
    ambientBottom: "rgba(232,198,193,0.35)",

    mosqueTint: "rgba(203,164,106,",
  },

  "royal-amethyst": {
    id: "royal-amethyst",
    label: "Royal Amethyst",
    swatch: "#9B72CF",

    pageBg: "linear-gradient(180deg, #FAF8FF 0%, #F0EBF8 100%)",
    coverBg: "linear-gradient(170deg,#F7F3FF 0%,#EDE3F7 40%,#E0D0F0 100%)",

    gold: "#9B72CF",
    goldLight: "#B08FDE",
    goldMuted: "#7A54A8",

    petalPrimary: "#D4B8E8",
    petalSecondary: "#C9A0DC",
    petalFill: "#F7F3FF",

    textDark: "#2D1A4A",
    textMid: "#5A3D7A",
    textLight: "#7A5C9E",
    arabicColor: "#9B72CF",

    ampersandColor: "#C4A0E0",

    glassBg: "rgba(250,248,255,0.85)",
    glassBorder: "rgba(255,255,255,0.95)",
    glassShadow: "rgba(155,114,207,0.1)",

    buttonBg: "rgba(250,248,255,0.85)",
    buttonText: "#2D1A4A",
    buttonCircleBg: "linear-gradient(135deg,#C4A0E0 0%,#9B72CF 50%,#7A54A8 100%)",

    dividerColor: "#B08FDE",

    ambientTop: "rgba(220,200,255,0.65)",
    ambientBottom: "rgba(196,160,224,0.3)",

    mosqueTint: "rgba(155,114,207,",
  },
  "crimson-maroon": {
    id: "crimson-maroon",
    label: "Crimson Maroon",
    swatch: "#8B1A2E",

    pageBg: "linear-gradient(180deg, #FFF8F8 0%, #F9EDED 100%)",
    coverBg: "linear-gradient(170deg,#FDF4F4 0%,#F0DADA 40%,#E4C4C4 100%)",

    gold: "#C07A5A",
    goldLight: "#D4957A",
    goldMuted: "#9A5E42",

    petalPrimary: "#D4818E",
    petalSecondary: "#B85C6E",
    petalFill: "#FDF4F4",

    textDark: "#3A0D18",
    textMid: "#6B2535",
    textLight: "#8C4455",
    arabicColor: "#8B1A2E",

    ampersandColor: "#C0607A",

    glassBg: "rgba(255,248,248,0.85)",
    glassBorder: "rgba(255,255,255,0.9)",
    glassShadow: "rgba(139,26,46,0.08)",

    buttonBg: "rgba(255,248,248,0.85)",
    buttonText: "#3A0D18",
    buttonCircleBg: "linear-gradient(135deg,#D4818E 0%,#8B1A2E 50%,#6B1525 100%)",

    dividerColor: "#C0607A",

    ambientTop: "rgba(255,210,210,0.65)",
    ambientBottom: "rgba(212,129,142,0.3)",

    mosqueTint: "rgba(139,26,46,",
  },
};

export const THEME_ORDER = ["ivory-blush", "royal-amethyst", "crimson-maroon"];

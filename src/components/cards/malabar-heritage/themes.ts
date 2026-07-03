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

  /** Floral / decorative colors */
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

  /** Heritage tint */
  mosqueTint: string;
}

export const THEMES: Record<string, InvitationTheme> = {
  "emerald-gold": {
    id: "emerald-gold",
    label: "Emerald Gold",
    swatch: "#0f5e4a",

    pageBg: "linear-gradient(180deg, #FAF8F3 0%, #F0EBE0 100%)",
    coverBg: "linear-gradient(170deg, #0a3d30 0%, #0f5e4a 40%, #1a8b6a 100%)",

    gold: "#D4AF37",
    goldLight: "#E8C84A",
    goldMuted: "#B8941E",

    petalPrimary: "#1a8b6a",
    petalSecondary: "#0f5e4a",
    petalFill: "#FAF8F3",

    textDark: "#1a3a2a",
    textMid: "#2d6a4f",
    textLight: "#5a8a72",
    arabicColor: "#D4AF37",

    ampersandColor: "#C9A227",

    glassBg: "rgba(250,248,243,0.82)",
    glassBorder: "rgba(255,255,255,0.9)",
    glassShadow: "rgba(15,94,74,0.1)",

    buttonBg: "rgba(250,248,243,0.85)",
    buttonText: "#1a3a2a",
    buttonCircleBg: "linear-gradient(135deg, #E8C84A 0%, #D4AF37 50%, #B8941E 100%)",

    dividerColor: "#D4AF37",

    ambientTop: "rgba(212,175,55,0.5)",
    ambientBottom: "rgba(26,139,106,0.3)",

    mosqueTint: "rgba(15,94,74,",
  },

  "sapphire-pearl": {
    id: "sapphire-pearl",
    label: "Sapphire Pearl",
    swatch: "#1e3a5f",

    pageBg: "linear-gradient(180deg, #F5F8FC 0%, #E8F0F5 100%)",
    coverBg: "linear-gradient(170deg, #0d1b2a 0%, #1e3a5f 40%, #2c5f7a 100%)",

    gold: "#C9A227",
    goldLight: "#E0BC3A",
    goldMuted: "#A68418",

    petalPrimary: "#2c5f7a",
    petalSecondary: "#1e3a5f",
    petalFill: "#E8F0F5",

    textDark: "#0d1b2a",
    textMid: "#1e3a5f",
    textLight: "#4a6a8a",
    arabicColor: "#C9A227",

    ampersandColor: "#B08F3A",

    glassBg: "rgba(245,248,252,0.85)",
    glassBorder: "rgba(255,255,255,0.9)",
    glassShadow: "rgba(30,58,95,0.1)",

    buttonBg: "rgba(245,248,252,0.85)",
    buttonText: "#0d1b2a",
    buttonCircleBg: "linear-gradient(135deg, #E0BC3A 0%, #C9A227 50%, #A68418 100%)",

    dividerColor: "#C9A227",

    ambientTop: "rgba(201,162,39,0.45)",
    ambientBottom: "rgba(44,95,122,0.3)",

    mosqueTint: "rgba(30,58,95,",
  },

  "rose-copper": {
    id: "rose-copper",
    label: "Rose Copper",
    swatch: "#b76e79",

    pageBg: "linear-gradient(180deg, #FBF5F3 0%, #F5E8E4 100%)",
    coverBg: "linear-gradient(170deg, #8B4A52 0%, #B76E79 40%, #D49B95 100%)",

    gold: "#C8956B",
    goldLight: "#DAB080",
    goldMuted: "#A67450",

    petalPrimary: "#D49B95",
    petalSecondary: "#B76E79",
    petalFill: "#FBF5F3",

    textDark: "#3A1A1E",
    textMid: "#6B3A42",
    textLight: "#8C5A62",
    arabicColor: "#C8956B",

    ampersandColor: "#B07A60",

    glassBg: "rgba(251,245,243,0.85)",
    glassBorder: "rgba(255,255,255,0.9)",
    glassShadow: "rgba(183,110,121,0.1)",

    buttonBg: "rgba(251,245,243,0.85)",
    buttonText: "#3A1A1E",
    buttonCircleBg: "linear-gradient(135deg, #DAB080 0%, #C8956B 50%, #A67450 100%)",

    dividerColor: "#C8956B",

    ambientTop: "rgba(200,149,107,0.45)",
    ambientBottom: "rgba(212,155,149,0.3)",

    mosqueTint: "rgba(183,110,121,",
  },
};

export const THEME_ORDER = ["emerald-gold", "sapphire-pearl", "rose-copper"];

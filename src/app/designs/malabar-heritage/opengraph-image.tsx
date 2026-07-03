import { generateOGImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/cards/shared/og-image";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  const design = getDesign("malabar-heritage")!;
  const theme = getDesignTheme("malabar-heritage", design.defaultTheme) ?? design.themes[0];
  return generateOGImage(design, theme);
}

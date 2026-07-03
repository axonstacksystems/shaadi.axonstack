import { generateOGImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/cards/shared/og-image";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  const design = getDesign("noor-e-nikah")!;
  const theme = getDesignTheme("noor-e-nikah", design.defaultTheme) ?? design.themes[0];
  return generateOGImage(design, theme);
}

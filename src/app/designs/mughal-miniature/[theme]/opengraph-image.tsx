import { generateOGImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/cards/shared/og-image";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Props {
  params: Promise<{ theme: string }>;
}

export default async function OgImage({ params }: Props) {
  const { theme } = await params;
  const design = getDesign("mughal-miniature")!;
  const themeData = getDesignTheme("mughal-miniature", theme) ?? design.themes[0];
  return generateOGImage(design, themeData);
}

import {
  generateOrderOGImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
} from "@/components/cards/shared/og-image";
import { getDeliveredOrderBySlug } from "@/data/delivered-orders";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) return new Response("Not found", { status: 404 });

  const designEntry = getDesign(order.designSlug)!;
  const themeEntry =
    getDesignTheme(order.designSlug, order.themeSlug) ?? designEntry.themes[0];

  return generateOrderOGImage(designEntry, themeEntry, order);
}

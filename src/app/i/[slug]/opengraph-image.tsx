import {
  generateOrderOGImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
} from "@/components/cards/shared/og-image";
import { getDeliveredOrderBySlug, deliveredOrders } from "@/data/delivered-orders";
import { getDesign, getDesignTheme } from "@/data/design-registry";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return deliveredOrders.map((o) => ({ slug: o.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) return new Response("Not found", { status: 404 });

  if (order.previewImage) {
    return new Response(null, {
      status: 302,
      headers: { Location: order.previewImage },
    });
  }

  const designEntry = getDesign(order.designSlug)!;
  const themeEntry =
    getDesignTheme(order.designSlug, order.themeSlug) ?? designEntry.themes[0];

  return generateOrderOGImage(designEntry, themeEntry, order);
}

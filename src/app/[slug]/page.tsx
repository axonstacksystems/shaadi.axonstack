import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  deliveredOrders,
  getDeliveredOrderBySlug,
} from "@/data/delivered-orders";
import { MalabarEmeraldCard } from "@/components/cards/MalabarEmeraldCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return deliveredOrders.map((order) => ({ slug: order.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) return { title: "Card Not Found" };

  return {
    title: `${order.title} — Wedding Invitation`,
    description: `You're invited to the ${order.ceremonyHeadline} of ${order.title}.`,
    openGraph: {
      title: `${order.title} — Wedding Invitation`,
      description: `You're invited to the ${order.ceremonyHeadline} of ${order.title}.`,
      type: "website",
    },
  };
}

export default async function DeliveredCardPage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) notFound();

  switch (order.templateSlug) {
    case "malabar-emerald":
      return <MalabarEmeraldCard order={order} />;
    // Future: kerala-ivory, midnight-nikah, etc.
    default:
      notFound();
  }
}

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

  const url = `https://shaadi.axonstack.in/${order.slug}`;
  const title = `${order.title} — Wedding Invitation`;
  const description = `${order.invitationLine}. You're invited to ${order.groom} & ${order.bride}'s ${order.ceremonyHeadline} on ${order.primaryEvent.date} at ${order.primaryEvent.venue}.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Shaadi Cards by AxonStack",
      title: `${order.title} · Wedding Invitation`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${order.title} · Wedding Invitation`,
      description,
      creator: "@axonstack",
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

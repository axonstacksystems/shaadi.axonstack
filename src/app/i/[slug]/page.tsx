import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  deliveredOrders,
  getDeliveredOrderBySlug,
} from "@/data/delivered-orders";
import { isValidTheme, type InvitationCardProps } from "@/data/design-registry";
import { PetalAtelierCard } from "@/components/cards/PetalAtelierCard";
import { MalabarHeritageCard } from "@/components/cards/MalabarHeritageCard";
import { NoorENikahCard } from "@/components/cards/NoorENikahCard";
import { CelestialCanvasCard } from "@/components/cards/CelestialCanvasCard";
import { NordicMinimalCard } from "@/components/cards/NordicMinimalCard";
import { MughalMiniatureCard } from "@/components/cards/MughalMiniatureCard";
import { MonsoonGardenCard } from "@/components/cards/MonsoonGardenCard";

type Props = {
  params: Promise<{ slug: string }>;
};

const COMPONENT_MAP: Record<string, React.ComponentType<InvitationCardProps>> = {
  "petal-atelier": PetalAtelierCard,
  "malabar-heritage": MalabarHeritageCard,
  "noor-e-nikah": NoorENikahCard,
  "celestial-canvas": CelestialCanvasCard,
  "nordic-minimal": NordicMinimalCard,
  "mughal-miniature": MughalMiniatureCard,
  "monsoon-garden": MonsoonGardenCard,
};

export function generateStaticParams() {
  return deliveredOrders.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) return {};

  const url = `https://shaadi.axonstack.in/i/${slug}`;
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
      siteName: "Shaadi Cards by axonstack",
      title: `${order.title} · Wedding Invitation`,
      description,
      images: [
        {
          url: `${url}/opengraph-image`,
          secureUrl: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${order.title} — ${order.ceremonyHeadline} Invitation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${order.title} · Wedding Invitation`,
      description,
      creator: "@axonstack",
      images: [`${url}/opengraph-image`],
    },
  };
}

export default async function OrderPage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) notFound();

  if (!isValidTheme(order.designSlug, order.themeSlug)) notFound();

  const Card = COMPONENT_MAP[order.designSlug];
  if (!Card) notFound();

  return <Card order={order} initialTheme={order.themeSlug} />;
}

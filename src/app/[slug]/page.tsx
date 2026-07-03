import { notFound, permanentRedirect } from "next/navigation";
import {
  deliveredOrders,
  getDeliveredOrderBySlug,
} from "@/data/delivered-orders";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return deliveredOrders.map((order) => ({ slug: order.slug }));
}

export default async function LegacyOrderPage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);
  if (!order) notFound();
  permanentRedirect(`/i/${order.slug}`);
}

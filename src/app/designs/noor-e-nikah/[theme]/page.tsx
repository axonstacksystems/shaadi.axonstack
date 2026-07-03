import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoorENikahCard } from "@/components/cards/NoorENikahCard";
import { getDesign, getThemeSlugs, isValidTheme, getDesignTheme } from "@/data/design-registry";
import { NOOR_E_NIKAH_DEMO } from "@/data/demo-orders";

const DESIGN_SLUG = "noor-e-nikah";

interface Props {
  params: Promise<{ theme: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme } = await params;
  const design = getDesign(DESIGN_SLUG);
  const themeData = getDesignTheme(DESIGN_SLUG, theme);
  if (!design || !themeData) return {};
  return {
    title: `${themeData.label} — ${design.name} · Nikah Invitation Template`,
    description: `Luxury Islamic Nikah invitation in the ${themeData.label} palette. Beautifully designed, fully digital. Get it for ₹999 — 50% off. By Shaadi Cards.`,
    openGraph: {
      title: `${themeData.label} — ${design.name} · Nikah Invitation Template`,
      description: `Luxury Islamic Nikah invitation · ${design.name} · ${themeData.label} · ₹999 only (50% OFF) · Shaadi Cards`,
      type: "website",
      siteName: "Shaadi Cards",
    },
    twitter: {
      card: "summary_large_image",
      title: `${themeData.label} — ${design.name} · Nikah Invitation Template`,
      description: `Luxury Islamic Nikah invitation · ${themeData.label} · ₹999 only (50% OFF) · Shaadi Cards`,
    },
  };
}

export function generateStaticParams() {
  return getThemeSlugs(DESIGN_SLUG).map((theme) => ({ theme }));
}

export default async function NoorENikahThemePage({ params }: Props) {
  const { theme } = await params;
  if (!isValidTheme(DESIGN_SLUG, theme)) notFound();
  return <NoorENikahCard order={NOOR_E_NIKAH_DEMO} />;
}

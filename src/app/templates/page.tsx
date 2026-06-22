import type { Metadata } from "next";
import { TemplatesGallery } from "@/components/templates/TemplatesGallery";

export const metadata: Metadata = {
  title: "Templates — Shaadi Cards",
  description:
    "Browse all luxury digital wedding invitation templates by AxonStack. Tap any template to preview the live card.",
};

export default function TemplatesIndexPage() {
  return <TemplatesGallery />;
}

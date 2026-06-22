import type { Metadata } from "next";
import { TemplatesGallery } from "@/components/templates/TemplatesGallery";

export const metadata: Metadata = {
  title: "Designs — Shaadi Cards",
  description:
    "Browse all luxury digital wedding invitation designs by axonstack. Tap any design to preview the live card.",
};

export default function TemplatesIndexPage() {
  return <TemplatesGallery />;
}

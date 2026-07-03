import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("petal-atelier")!;

export default function PetalAtelierDefaultPage() {
  redirect(`/designs/petal-atelier/${design.defaultTheme}`);
}

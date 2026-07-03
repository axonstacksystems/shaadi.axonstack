import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("nordic-minimal")!;

export default function NordicMinimalDefaultPage() {
  redirect(`/designs/nordic-minimal/${design.defaultTheme}`);
}

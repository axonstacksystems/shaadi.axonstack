import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("malabar-heritage")!;

export default function MalabarHeritageDefaultPage() {
  redirect(`/designs/malabar-heritage/${design.defaultTheme}`);
}

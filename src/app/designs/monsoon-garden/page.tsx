import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("monsoon-garden")!;

export default function MonsoonGardenDefaultPage() {
  redirect(`/designs/monsoon-garden/${design.defaultTheme}`);
}

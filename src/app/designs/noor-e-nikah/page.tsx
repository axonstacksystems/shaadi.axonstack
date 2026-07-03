import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("noor-e-nikah")!;

export default function NoorENikahDefaultPage() {
  redirect(`/designs/noor-e-nikah/${design.defaultTheme}`);
}

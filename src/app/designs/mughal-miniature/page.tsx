import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("mughal-miniature")!;

export default function MughalMiniatureDefaultPage() {
  redirect(`/designs/mughal-miniature/${design.defaultTheme}`);
}

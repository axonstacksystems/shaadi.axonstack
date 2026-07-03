import { redirect } from "next/navigation";
import { getDesign } from "@/data/design-registry";

const design = getDesign("celestial-canvas")!;

export default function CelestialCanvasDefaultPage() {
  redirect(`/designs/celestial-canvas/${design.defaultTheme}`);
}

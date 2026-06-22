import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shaadi Cards by axonstack",
    short_name: "Shaadi Cards",
    description:
      "Premium digital wedding invitations crafted by axonstack. Cinematic, elegant, mobile-first cards delivered in 24 hours.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#0f5e4a",
    orientation: "portrait",
    categories: ["lifestyle", "wedding", "social"],
    lang: "en",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}

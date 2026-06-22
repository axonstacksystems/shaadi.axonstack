import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-invitation-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-invitation-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-invitation-script",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  variable: "--font-invitation-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f5e4a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shaadi.axonstack.in"),
  applicationName: "Shaadi Cards by axonstack",
  title: {
    default: "Shaadi Cards — Digital Wedding Invitations by axonstack",
    template: "%s · Shaadi Cards by axonstack",
  },
  description:
    "Premium digital wedding invitations crafted by axonstack. Cinematic, elegant, mobile-first cards delivered at shaadi.axonstack.in.",
  authors: [{ name: "AXONSTACK PVT LTD", url: "https://axonstack.in" }],
  creator: "axonstack",
  publisher: "AXONSTACK PVT LTD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shaadi.axonstack.in",
    siteName: "Shaadi Cards by axonstack",
    title: "Shaadi Cards — Digital Wedding Invitations by axonstack",
    description:
      "Premium digital wedding invitations crafted by axonstack. Cinematic, elegant, mobile-first cards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaadi Cards — Digital Wedding Invitations by axonstack",
    description:
      "Premium digital wedding invitations crafted by axonstack.",
    creator: "@axonstack",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${arabic.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

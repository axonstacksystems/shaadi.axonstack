import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {},
    async redirects() {
        return [
            { source: "/designs/ivory-blush", destination: "/designs/petal-atelier", permanent: true },
            { source: "/designs/ivory-blush/:theme*", destination: "/designs/petal-atelier/:theme*", permanent: true },
            { source: "/designs/malabar-emerald", destination: "/designs/malabar-heritage", permanent: true },
            { source: "/designs/malabar-emerald/:theme*", destination: "/designs/malabar-heritage/:theme*", permanent: true },
            { source: "/designs/nordic-frost", destination: "/designs/nordic-minimal", permanent: true },
            { source: "/designs/nordic-frost/:theme*", destination: "/designs/nordic-minimal/:theme*", permanent: true },
            { source: "/designs/monsoon-special", destination: "/designs/monsoon-garden", permanent: true },
            { source: "/designs/monsoon-special/:theme*", destination: "/designs/monsoon-garden/:theme*", permanent: true },
        ];
    },
    async headers() {
        return [
            {
                // Security headers for all routes
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "X-DNS-Prefetch-Control", value: "on" },
                ],
            },
            {
                source: "/sw.js",
                headers: [
                    { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
                    { key: "Content-Type", value: "application/javascript; charset=utf-8" },
                ],
            },
        ];
    },
};

export default nextConfig;

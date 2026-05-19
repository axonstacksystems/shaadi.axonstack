import type { MetadataRoute } from "next";
import { deliveredOrders } from "@/data/delivered-orders";

const BASE_URL = "https://shaadi.axonstack.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const cards = deliveredOrders.map((order) => ({
        url: `${BASE_URL}/${order.slug}`,
        lastModified: new Date(order.deliveredOn),
        changeFrequency: "yearly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        },
        ...cards,
    ];
}

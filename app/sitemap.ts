import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.airsteam.dk";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/ydelser`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.7 },
  ];
}

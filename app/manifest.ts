import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LÖR — Restaurant, Lounge & Fitness",
    short_name: "LÖR",
    description:
      "Luxury restaurant, lounge, and fitness complex on Goderich Road, Freetown, Sierra Leone.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

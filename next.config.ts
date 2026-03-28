import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Cuando subas a GitHub Pages, cambia esto al nombre de tu repo:
  // basePath: "/portfolio",
  // unoptimized es necesario para export estático con imágenes de Next.js
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

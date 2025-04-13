import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
    domains: ["kermaneno.ir"],
  },
  // basePath: "/", 
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ignore eslint rules during prod build
  }
};

export default nextConfig;

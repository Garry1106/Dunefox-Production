import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"], // Add the allowed domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },
  reactStrictMode: true, // Enable React Strict Mode
  swcMinify: true, // Enable SWC minification
  output: "standalone", // Generate a standalone build
  // Optional: Add headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Optional: Configure rewrites, redirects, or other Vercel-specific features
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.example.com/:path*", // Example API rewrite
      },
    ];
  },
  // Prisma-specific configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Generate Prisma client during the build process
      config.externals.push("@prisma/client");
    }
    return config;
  },
};

export default nextConfig;
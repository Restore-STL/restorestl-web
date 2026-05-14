import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/join", destination: "/", permanent: true },
      { source: "/join/:path*", destination: "/", permanent: true },
      { source: "/capital", destination: "/", permanent: true },
      { source: "/capital/:path*", destination: "/", permanent: true },
      { source: "/book", destination: "/", permanent: true },
      { source: "/book/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

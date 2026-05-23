import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Enlaces antiguos / mal escritos → rutas cortas actuales
      { source: "/UI-components/Pages/Blog", destination: "/blogs", permanent: true },
      { source: "/UI-components/Pages/Order-Tracking", destination: "/order", permanent: true },
      { source: "/UI-components/Page/Blogs", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;

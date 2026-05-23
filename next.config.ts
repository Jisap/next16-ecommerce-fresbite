import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Rutas largas antiguas → rutas cortas
      { source: "/UI-components/Pages/Shop", destination: "/shop", permanent: true },
      { source: "/UI-components/Pages/Blogs", destination: "/blogs", permanent: true },
      { source: "/UI-components/Pages/Blogs/:id", destination: "/blogs/:id", permanent: true },
      { source: "/UI-components/Pages/About", destination: "/about", permanent: true },
      { source: "/UI-components/Pages/Contact", destination: "/contact", permanent: true },
      { source: "/UI-components/Pages/Faqs", destination: "/faqs", permanent: true },
      { source: "/UI-components/Pages/Wishlist", destination: "/wishlist", permanent: true },
      { source: "/UI-components/Pages/Checkout", destination: "/checkout", permanent: true },
      { source: "/UI-components/Pages/PageNotFound", destination: "/page-not-found", permanent: true },
      { source: "/UI-components/Pages/Index/Order", destination: "/order", permanent: true },
      { source: "/Components/Footer", destination: "/", permanent: true },
      // Typos antiguos
      { source: "/UI-components/Pages/Blog", destination: "/blogs", permanent: true },
      { source: "/UI-components/Pages/Order-Tracking", destination: "/order", permanent: true },
      { source: "/UI-components/Page/Blogs", destination: "/blogs", permanent: true },
      // Secciones del home que eran rutas sueltas
      { source: "/UI-components/Pages/Index", destination: "/", permanent: true },
      { source: "/UI-components/Pages/Index/:section", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

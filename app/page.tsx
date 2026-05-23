import Hero from "@/app/_components/home/Hero";
import Category from "@/app/_components/home/Category";
import TopSelling from "@/app/_components/home/TopSelling";
import products from "@/app/JsonData/TopSelling.json";
import Offers from "@/app/_components/home/Offers";
import CategoriesOffers from "@/app/_components/home/CategoriesOffers";
import BannerOffers from "@/app/_components/home/BannerOffers";
import OrganicProducts from "@/app/_components/home/OrganicProducts";
import LatestProducts from "@/app/_components/home/LatestProducts";
import Order from "@/app/_components/home/Order";
import Brands from "@/app/_components/home/Brands";
import Services from "@/app/_components/home/Services";
import Testimonials from "@/app/_components/home/Testimonials";
import SubscribeBanner from "@/app/_components/home/SubscribeBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <TopSelling product={products} />
      <Offers />
      <CategoriesOffers />
      <BannerOffers />
      <OrganicProducts />
      <LatestProducts />
      <Order />
      <Brands />
      <Services />
      <Testimonials />
      <SubscribeBanner />
    </>
  );
}

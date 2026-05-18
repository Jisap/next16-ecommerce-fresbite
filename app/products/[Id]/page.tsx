"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Lightbox from "yet-another-react-lightbox"
import organicProducts from "@/app/JsonData/OrganicProducts.json";
import recentlyProducts from "@/app/JsonData/RecentlyProducts.json";
import topProducts from "@/app/JsonData/TopProducts.json";
import topSelling from "@/app/JsonData/TopSelling.json";
import trendingProducts from "@/app/JsonData/TradingProducts.json";
import { useCart } from "@/app/hooks/useCart"




const ProductDetails = () => {

  const { Id } = useParams();

  // 1. Unificamos todos los JSON en un solo array
  const allProducts = [
    ...organicProducts,
    ...recentlyProducts,
    ...topProducts,
    ...topSelling,
    ...trendingProducts,
  ];

  // 2. Buscamos el producto de forma súper robusta y limpia
  const productId = Array.isArray(Id) ? Id[0] : Id;
  const product = allProducts.find((p) => p.id === productId);

  const {
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist
  } = useCart()

  return (
    <div>page</div>
  )
}

export default ProductDetails
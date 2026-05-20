"use client"

import Image from "next/image"
import sectionbanner from "@/public/section-banner.png"
import shopBanner from "@/public/organic-categories-banner.webp"
import shopsideBanner from "@/public/Shop-sale-banner.webp"
import Link from "next/link"
import productData from "@/app/JsonData/OrganicProducts.json"
import { Icon } from "@iconify/react"
import toast, { Toaster } from "react-hot-toast"
import { useCart } from "@/app/hooks/useCart"


type SortType = 
  | "featured"
  | "best-selling"
  | "az"
  | "za"
  | "price-high"
  | "price-low"

const Shop = () => {

  const {
    cart,
    increaseQty,
    decreaseQty,
    qty,
    removeFromCart,
    updateCartItemQty,
    cartSubtotal,
    addToCart
  } = useCart()

  return (
    <>
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionbanner}
          alt="Section Banner"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <div className="content z-0 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1">
            <li className="uppercase text-sm font-unbounded text-black">
              <Link href="/">Home</Link>
            </li>
            <li className="text-white">-</li>
            <li className="uppercase text-sm font-unbounded text-black">
              <Link href="/UI-components/Pages/Wishlist">Shop</Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded text-black mt-2">
            Shop
          </h2>
        </div>
      </div>
    </>
  )
}

export default Shop
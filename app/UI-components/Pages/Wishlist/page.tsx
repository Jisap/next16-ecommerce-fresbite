"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useMemo } from "react"
import topSellingData from "@/app/JsonData/TopSelling.json"
import organicData from "@/app/JsonData/OrganicProducts.json"
import tradingData from "@/app/JsonData/TradingProducts.json"
import sectionBanner from "@/public/section-banner.png"
import ProductCard from "../Index/TopSelling/ProductCard"
import ProductModal from "../Index/TopSelling/ProductModal"
import { useCart } from "@/app/hooks/useCart"
import { Toaster } from "react-hot-toast"
import { EntranceAnimation } from "@/app/Animations"

// Unificamos todos los productos para poder buscar los favoritos vengan de donde vengan
const allProducts = [...topSellingData, ...organicData, ...tradingData]

const Wishlist = () => {
  // --- HOOK GLOBAL ---
  const {
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist
  } = useCart()

  // --- ESTADOS NECESARIOS PARA LAS TARJETAS Y EL MODAL ---
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({})
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"]

  // Estados del Modal
  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("1 kg")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => setOpenIndex(openIndex === index ? null : index)

  // Filtramos la base de datos total para quedarnos solo con los productos que están en la wishlist (por ID)
  const wishlistProducts = useMemo(() => {
    return allProducts.filter(product => wishlist.includes(product.id))
  }, [wishlist])

  return (
    <>
      {/* Banner */}
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionBanner}
          alt="Section Banner"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <EntranceAnimation type="fadeDown" duration={0.8} scrollTrigger={false} className="content z-10 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="text-gray-500 font-bold">•</li>
            <li className="uppercase text-xs font-unbounded text-prim font-semibold">
              <Link href="/UI-components/Pages/Wishlist">Wishlist</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
            Wishlist
          </h2>
        </EntranceAnimation>
      </div>

      {/* Empty State */}
      {wishlistProducts.length === 0 && (
        <EntranceAnimation type="scaleIn" duration={0.8} className="text-center py-20 text-gray-500 flex flex-col items-center">
          <Icon icon="tabler:heart-broken" width="60" className="text-gray-300 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">Your Wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your wishlist yet.</p>
          <Link href="/" className="bg-prim text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-colors">
            Start Shopping
          </Link>
        </EntranceAnimation>
      )}

      {/* Grid de Productos con animación stagger */}
      {wishlistProducts.length > 0 && (
        <EntranceAnimation type="stagger" selector=".product-card" duration={0.8} stagger={0.1} className="w-full py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                openId={openId}
                setOpenId={setOpenId}
                selectedWeight={selectedWeight}
                setSelectedWeight={setSelectedWeight}
                weights={weights}
                qty={qty}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
                setSelectedProduct={(p) => {
                  setSelectedProduct(p)
                  setMainImage(p.image1)
                }}
                setOpenModal={setOpenModal}
              />
            ))}
          </div>
        </EntranceAnimation>
      )}

      {/* Modal Reutilizado */}
      {selectedProduct && (
        <ProductModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedProduct={selectedProduct}
          mainImage={mainImage}
          setMainImage={setMainImage}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          priceBySize={{
            "1 kg": selectedProduct?.price || "0",
            "2 kg": "3800",
            "3 kg": "4400",
            "4 kg": "5500",
            "5 kg": "6200"
          }}
          qty={qty}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          addToCart={addToCart}
          openIndex={openIndex}
          toggle={toggleAccordion}
        />
      )}

      <Toaster position="top-right" />
    </>
  )
}

export default Wishlist
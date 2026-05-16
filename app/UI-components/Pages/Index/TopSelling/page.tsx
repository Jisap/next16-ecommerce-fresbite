"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import titleicon from "@/public/freshbite-title-icon2.webp"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"
import { useCart } from "@/app/hooks/useCart"

export interface Product {
  id: string;
  title: string;
  price: string;
  lessprice?: string;
  image1: string;
  image2: string;
  megasale?: string;
  offer?: string;
  supersaver?: string;
  seller?: string;
  review?: string;
  description?: string;
  [key: string]: any;
}

const TopSelling = ({ product: Products }: { product: Product[] }) => {
  const router = useRouter()
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"]

  // --- HOOK GLOBAL ---
  const { 
    wishlist, 
    qty, 
    increaseQty, 
    decreaseQty, 
    addToCart, 
    toggleWishlist 
  } = useCart()

  // --- ESTADOS LOCALES ---
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({})
  const [openId, setOpenId] = useState<string | null>(null)
  
  // Estados para el Modal
  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("1 kg")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index)

  // Lógica para agrupar productos de 2 en 2 para los slides verticales
  // ProductChunks quedaría como un array de arrays de 2 productos
  // Grupo 1(Chunk 1): [Producto 0, Producto 1]
  // Grupo 2(Chunk 2): [Producto 2, Producto 3]
  // Grupo 3(Chunk 3): [Producto 4, Producto 5]
  const productChunks = []
  if (Products && Products.length > 0) {
    for (let i = 0; i < Products.length; i += 2) {
      productChunks.push(Products.slice(i, i + 2))
    }
  }

  // Precios para el modal según tamaño (ejemplo)
  const priceBySize: Record<string, string> = {
    "1 kg": selectedProduct?.price || "0",
    "2 kg": "3800",
    "3 kg": "4400",
    "4 kg": "5500",
    "5 kg": "6200",
  }

  // Sincronizar imagen principal cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image1)
      setSelectedSize("1 kg")
    }
  }, [selectedProduct])

  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
        <div className="section-title flex flex-wrap pb-10 md:ps-5 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold">Top Selling Products</h2>
          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image src={titleicon} alt="titleicon" />
            Fresh and fabulous from farm to table.
          </p>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          className="w-full product-swiper"
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1500}
          breakpoints={{
            1600: { slidesPerView: 5 },
            1400: { slidesPerView: 4 },
            1100: { slidesPerView: 3 },
            768: { slidesPerView: 2.5 },
            600: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {productChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-8">
                {chunk.map((product) => (
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
                    setSelectedProduct={setSelectedProduct}
                    setOpenModal={setOpenModal}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedProduct={selectedProduct}
        mainImage={mainImage}
        setMainImage={setMainImage}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        priceBySize={priceBySize}
        qty={qty}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
        openIndex={openIndex}
        toggle={toggle}
      />

      <Toaster position="top-right" />
    </>
  )
}

export default TopSelling
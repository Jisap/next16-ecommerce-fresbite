"use client"

import titleicon from "@/public/freshbite-title-icon2.webp"
import Image from "next/image"
import { useRouter } from "next/navigation"
import products from "@/app/JsonData/OrganicProducts.json"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import Link from "next/link"
import { useCart } from "@/app/hooks/useCart"
import ProductCard from "../TopSelling/ProductCard"
import { Toaster } from "react-hot-toast"
import ProductModal from "../TopSelling/ProductModal"




const OrganicProducts = () => {

  const router = useRouter()
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"]

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

  const {
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist,
    getPriceNumber,
    cartSubtotal
  } = useCart();

  // Precios para el modal según tamaño
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
          <h2 className="text-3xl md:text-5xl font-bold">Dairy, Bread and eggs</h2>
          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image src={titleicon} alt="titleicon" />
            Quality ingredients for a quality life.
          </p>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          className="w-full"
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
          {products.map((product, index) => (
            <SwiperSlide key={`${product.id}-${index}`}>
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

export default OrganicProducts
"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import TopProducts from "@/app/JsonData/TopProducts.json"
import TrendingProducts from "@/app/JsonData/TradingProducts.json"
import RecentlyProducts from "@/app/JsonData/RecentlyProducts.json"
import { Icon } from "@iconify/react"
import { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { useCart } from "@/app/hooks/useCart"
import { Toaster } from "react-hot-toast"
import ProductModal from "../TopSelling/ProductModal"
import { EntranceAnimation } from "@/app/Animations"

const LatestProducts = () => {
  const topSellingRef = useRef<SwiperType | null>(null)
  const trendingRef = useRef<SwiperType | null>(null)
  const recentlyRef = useRef<SwiperType | null>(null)

  const router = useRouter()
  const { addToCart, qty, increaseQty, decreaseQty } = useCart()

  // Estados para el Modal
  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("1 kg")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index)

  const priceBySize: Record<string, string> = {
    "1 kg": selectedProduct?.price || "0",
    "2 kg": "3800",
    "3 kg": "4400",
    "4 kg": "5500",
    "5 kg": "6200",
  }

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image1)
      setSelectedSize("1 kg")
    }
  }, [selectedProduct])

  // Componente reutilizable para la tarjeta horizontal (DRY)
  const HorizontalCard = ({ product }: { product: any }) => (
    <div className="flex items-center gap-4 group cursor-pointer mb-8 justify-center w-full">
      <div
        className="relative h-24 w-24 shrink-0 bg-white flex items-center justify-center rounded-lg border border-gray-100 overflow-hidden"
        onClick={() => {
          setSelectedProduct(product)
          setOpenModal(true)
        }}
      >
        {/* Renderizado Priorizado */}
        {product.supersaver === "Yes" ? (
          <span className="absolute top-0 left-0自动 z-10 bg-green-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase whitespace-nowrap pointer-events-none">
            Super Saver
          </span>
        ) : product.offer ? (
          <span className="absolute top-0 left-0 z-10 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase whitespace-nowrap pointer-events-none">
            {product.offer}
          </span>
        ) : product.megasale ? (
          <span className="absolute top-0 left-0 z-10 bg-yellow-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase whitespace-nowrap pointer-events-none">
            {product.megasale}
          </span>
        ) : null}

        <Image
          src={product.image1}
          alt={product.title}
          width={100}
          height={100}
          className="w-full h-full object-contain absolute top-0 left-0 opacity-100 group-hover:opacity-0 transition-all duration-500"
        />
        <Image
          src={product.image2}
          alt={product.title}
          width={100}
          height={100}
          className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        />
      </div>

      <div className="w-48">
        <h3 className="text-[13px] font-bold mb-1 hover:text-prim transition-colors line-clamp-2 text-gray-800">
          {product.title}
        </h3>

        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              icon="material-symbols:star-rounded"
              className="text-orange-400"
              width="14"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-black text-[13px]">{product.price}</span>
          {product.lessprice && (
            <span className="line-through text-gray-400 text-[11px]">{product.lessprice}</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, "1 kg");
          }}
          className="text-[11px] p-1.5 rounded-md bg-prim text-white font-bold uppercase hover:bg-black flex items-center transition-colors duration-300"
        >
          Add to Cart <Icon icon="lucide:shopping-bag" className="ml-1" width="14" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full bg-gray-50/30 py-8 sm:py-16 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12">
          <EntranceAnimation type="stagger" selector=".column-animation-wrap" duration={0.8} stagger={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10 relative">

              {/* COLUMNA 1: Top Selling */}
              <div className="column-animation-wrap bg-white shadow-[0_0_15px_rgba(0,0,0,0.04)] rounded-lg p-6 sm:p-8 w-full max-w-[540px] mx-auto border border-gray-50">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-black tracking-tight">Top selling</h2>
                  <div className="flex items-center gap-3">
                    <button onClick={() => topSellingRef.current?.slidePrev()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-left-line" width="18" className="text-gray-800" />
                    </button>
                    <button onClick={() => topSellingRef.current?.slideNext()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-right-line" width="18" className="text-gray-800" />
                    </button>
                  </div>
                </div>

                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  className="w-full"
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  onSwiper={(swiper) => (topSellingRef.current = swiper)}
                >
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {TopProducts.slice(0, 3).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {TopProducts.slice(3, 6).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* COLUMNA 2: Trending Products */}
              <div className="column-animation-wrap bg-white shadow-[0_0_15px_rgba(0,0,0,0.04)] rounded-lg p-6 sm:p-8 w-full max-w-[540px] mx-auto border border-gray-50">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-black tracking-tight">Tranding product</h2>
                  <div className="flex items-center gap-3">
                    <button onClick={() => trendingRef.current?.slidePrev()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-left-line" width="18" className="text-gray-800" />
                    </button>
                    <button onClick={() => trendingRef.current?.slideNext()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-right-line" width="18" className="text-gray-800" />
                    </button>
                  </div>
                </div>

                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  className="w-full"
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  onSwiper={(swiper) => (trendingRef.current = swiper)}
                >
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {TrendingProducts.slice(0, 3).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {TrendingProducts.slice(3, 6).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* COLUMNA 3: Recently Added */}
              <div className="column-animation-wrap bg-white shadow-[0_0_15px_rgba(0,0,0,0.04)] rounded-lg p-6 sm:p-8 w-full max-w-[540px] mx-auto border border-gray-50">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-black tracking-tight">Recently added</h2>
                  <div className="flex items-center gap-3">
                    <button onClick={() => recentlyRef.current?.slidePrev()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-left-line" width="18" className="text-gray-800" />
                    </button>
                    <button onClick={() => recentlyRef.current?.slideNext()} className="transition-colors hover:text-prim">
                      <Icon icon="mingcute:arrow-right-line" width="18" className="text-gray-800" />
                    </button>
                  </div>
                </div>

                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  className="w-full"
                  loop={true}
                  modules={[Autoplay]}
                  autoplay={{ delay: 4500, disableOnInteraction: false }}
                  onSwiper={(swiper) => (recentlyRef.current = swiper)}
                >
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {RecentlyProducts.slice(0, 3).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      {RecentlyProducts.slice(3, 6).map((product) => (
                        <HorizontalCard key={product.id} product={product} />
                      ))}
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </EntranceAnimation>
        </div>
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

export default LatestProducts
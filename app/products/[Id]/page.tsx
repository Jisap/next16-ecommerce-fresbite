"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Navigation, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css" // Aseguramos que los estilos de Lightbox funcionen
import organicProducts from "@/app/JsonData/OrganicProducts.json";
import recentlyProducts from "@/app/JsonData/RecentlyProducts.json";
import topProducts from "@/app/JsonData/TopProducts.json";
import topSelling from "@/app/JsonData/TopSelling.json";
import trendingProducts from "@/app/JsonData/TradingProducts.json";
import { CartProduct, Product, useCart } from "@/app/hooks/useCart"




const ProductDetails = () => {

  const { Id } = useParams();

  // 1. Unificamos todos los JSON en un solo array tipado como Product[]
  const allProducts: Product[] = [
    ...organicProducts,
    ...recentlyProducts,
    ...topProducts,
    ...topSelling,
    ...trendingProducts,
  ];

  // 2. Buscamos el producto de forma súper robusta y limpia
  const productId = Array.isArray(Id) ? Id[0] : Id;
  const product = allProducts.find((p) => p.id === productId);

  const [openId, setOpenId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartProduct[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({});
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  // Estados para el visor de imágenes (Lightbox)
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
 
  if (!product) return <div className="p-10 text-xl">Product not found</div>

  const imagePairs = [
    { thumb: product.image1, main: product.mainimage1 },
    { thumb: product.image2, main: product.mainimage2 },
    { thumb: product.image3, main: product.mainimage3 },
    { thumb: product.image4, main: product.mainimage4 },
    { thumb: product.image5, main: product.mainimage5 },
  ].filter(pair => pair.thumb && pair.main) as { 
    thumb: string;
    main: string
  }[];

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

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const img = container.querySelector("img") as HTMLImageElement;
    if (!img) return;
    const react = container.getBoundingClientRect();
    const x = ((e.clientX - react.left) / react.width) * 100;
    const y = ((e.clientY - react.top) / react.height) * 100;
    img.style.transformOrigin = `${x}% ${y}`;
  }

  const lightboxImage = imagePairs.map((item) => ({ src: item.main }));



  return (
    <>
      <div className="px-4 lg:px-12 xl:px-[12%] py-8 sm:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* COLUMNA 1: Galería de imágenes (Swiper + Thumbs) */}
          <div>
            <div className="relative group">
              <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onBeforeInit={(swiper) => {
                  // Corregido: prevEl y nextEl con 'l' de Element en lugar de '1' (y eliminados ts-ignore)
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = ".custom-prev";
                    swiper.params.navigation.nextEl = ".custom-next";
                  }
                }}
                navigation
                className="border border-gray-200 rounded-md"
              >
                {imagePairs.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div
                      onClick={() => {
                        setPhotoIndex(i)
                        setOpen(true)
                      }}
                      className="zoom-container cursor-pointer aspect-square bg-white flex items-center justify-center"
                      onMouseMove={handleZoom}
                    >
                      <Image
                        src={item.main}
                        alt={product.title}
                        width={800}
                        height={800}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Botones de navegación (solo los de dentro del group) */}
              <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full -translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                <Icon
                  icon="iconamoon:arrow-left-2-light"
                  width={35}
                />
              </button>

              <button className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full -translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                <Icon
                  icon="iconamoon:arrow-right-2-light"
                  width={35}
                />
              </button>
            </div>

            {/* Thumbs Swiper: ahora correctamente dentro de la Columna 1 debajo de la imagen principal */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={20}
              slidesPerView={5}
              watchSlidesProgress
              className="mt-4"
              breakpoints={{
                1600: { slidesPerView: 5 },
                1000: { slidesPerView: 4 },
                500: { slidesPerView: 3 },
                0: { slidesPerView: 2 },
              }}
            >
              {imagePairs.map((item, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={item.thumb}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    className="border border-gray-200 rounded-md cursor-pointer object-contain h-30 w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* COLUMNA 2: Detalles del Producto (para que los implemente el instructor) */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-500">Aquí irá el resto de la UI del producto (precios, tallas, botón de compra)...</p>
          </div>

        </div>
      </div>

      {/* Visor de imágenes grandes */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={lightboxImage}
      />
    </>
  )
}

export default ProductDetails
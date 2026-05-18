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
  const [cartt, setCartt] = useState<CartProduct[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({});
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);


  if (!product) return <div className="p-10 text-xl">Product not found</div>

  const imagePairs = [
    { thumb: product.image1, main: product.mainimage1 },
    { thumb: product.image2, main: product.mainimage2 },
    { thumb: product.image3, main: product.mainimage3 },
    { thumb: product.image4, main: product.mainimage4 },
    { thumb: product.image5, main: product.mainimage5 },
  ].filter(pair => pair.thumb && pair.main) as { // Revisa las 5 parejas de imágenes y quédate únicamente con aquellas donde tanto la miniatura (thumb) como la imagen principal (main) existan y no estén vacías.
    thumb: string;                               // Garantiza al 100% que todos los elementos que han quedado son objetos válidos con un thumb tipo string y un main tipo string.
    main: string
  }[];

  const {
    cart,
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    removeFromCart,
    updateCartItemQty,
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
          <div>
            <div className="relative group">
              <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevE1 = ".custom-prev";
                  // @ts-ignore
                  swiper.params.navigation.nextE1 = ".custom-next"
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
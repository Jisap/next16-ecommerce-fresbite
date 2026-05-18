"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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
import ProductCard from "@/app/UI-components/Pages/Index/TopSelling/ProductCard"




const ProductDetails = () => {

  const { Id } = useParams();
  const router = useRouter();

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Estados para el visor de imágenes (Lightbox)
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

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
          <div className="lg:sticky lg:top-32 self-start">
            <div className="relative group">
              <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onBeforeInit={(swiper) => {
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

            {/* Thumbs Swiper: dentro de la Columna 1 debajo de la imagen principal */}
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

          {/* COLUMNA 2: Detalles del Producto */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-2">{product?.title}</h3>

            <p className="text-gray-500">Tax included. Shipping calculated at checkout</p>

            <div className="flex items-center gap-2 border-b border-gray-200 pb-5 pt-2 mb-4">
              <svg width="15" height="15" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="7.5" fill="rgb(62,214,96,0.3)"></circle>
                <circle cx="7.5" cy="7.5" r="5" strokeWidth="1" fill="rgb(62,214,96)"></circle>
              </svg>
              <span className="text-sm font-medium">13 in Stock</span>
            </div>

            <ProductCard
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

            <button
              onClick={() => {
                addToCart(product, selectedWeight[product.id] || "1 kg");
                router.push("/UI-components/Pages/Checkout");
              }}
              className="bg-black text-white px-6 py-3 rounded hover:bg-prim transition duration-300 w-full cursor-pointer uppercase font-bold tracking-wider mb-6"
            >
              Buy It now
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6 mt-6">
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                <Icon icon="lucide:store" className="text-prim mb-1.5" width={24} />
                <span className="text-xs font-bold text-gray-800">Store Pickup</span>
                <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">Free local pickup</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                <Icon icon="lucide:refresh-cw" className="text-prim mb-1.5" width={24} />
                <span className="text-xs font-bold text-gray-800">Return Policy</span>
                <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">30-day window</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                <Icon icon="lucide:badge-dollar-sign" className="text-prim mb-1.5" width={24} />
                <span className="text-xs font-bold text-gray-800">Money Back</span>
                <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">100% guarantee</span>
              </div>
            </div>

            {/* Delivery, Return, SKU List */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:truck" className="text-prim" width={18} />
                  <span>
                    <strong className="font-semibold text-black">Delivery:</strong> Estimated delivery time: 5 - 7 days
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:refresh-cw" className="text-prim" width={18} />
                  <span>
                    <strong className="font-semibold text-black">Return:</strong> Within 45 days of purchase
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:barcode" className="text-prim" width={18} />
                  <span>
                    <strong className="font-semibold text-black">SKU:</strong> 445
                  </span>
                </li>
              </ul>
            </div>

            {/* Accordions (Offers, Pickup, Returns) */}
            <div className="space-y-3 border-t border-gray-100 pt-6 mt-6">
              {/* Offers */}
              <div className="pb-3 border-b border-gray-100">
                <button onClick={() => toggle(0)} className="flex justify-between items-center w-full group py-1">
                  <div className="flex items-center text-left">
                    <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300 text-prim">
                      <Icon icon="material-symbols:percent" width={18} />
                    </div>
                    <span className="font-semibold text-sm text-gray-800">Offers available for you</span>
                  </div>
                  <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 text-gray-400 ${openIndex === 0 ? "rotate-180 text-prim" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${openIndex === 0 ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <ul className="space-y-2">
                    {[{ text: "Get up to 50% off on selected products", code: "" }, { text: "Buy 2 & get 15% off", code: "BUY2SAVE" }, { text: "Get 11% off first order", code: "11%OFF" }].map((off, i) => (
                      <li key={i}>
                        <Link href="/" className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md flex justify-between items-center hover:bg-prim/5 transition-all">
                          <span className="text-xs font-medium text-gray-700">{off.text}</span>
                          {off.code && <span className="bg-white border border-dashed border-prim px-2 py-0.5 text-[10px] font-bold text-prim">{off.code}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pickup */}
              <div className="pb-3 border-b border-gray-100">
                <button onClick={() => toggle(1)} className="flex justify-between items-center w-full group py-1">
                  <div className="flex items-center text-left">
                    <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300 text-prim">
                      <Icon icon="mingcute:truck-line" width={18} />
                    </div>
                    <span className="font-semibold text-sm text-gray-800">Choose pickup and save time!</span>
                  </div>
                  <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 text-gray-400 ${openIndex === 1 ? "rotate-180" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${openIndex === 1 ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Opt for our convenient pickup option and get your items faster. Save on shipping costs and collect at your nearest store.
                    </p>
                    <Link href="/" className="inline-block mt-2 text-prim font-bold text-xs hover:underline">View Information →</Link>
                  </div>
                </div>
              </div>

              {/* Returns */}
              <div className="pb-3">
                <button onClick={() => toggle(2)} className="flex justify-between items-center w-full group py-1">
                  <div className="flex items-center text-left">
                    <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300 text-prim">
                      <Icon icon="solar:refresh-bold" width={18} />
                    </div>
                    <span className="font-semibold text-sm text-gray-800">Flexible returns</span>
                  </div>
                  <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 text-gray-400 ${openIndex === 2 ? "rotate-180 text-prim" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${openIndex === 2 ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Shop with total confidence! We offer a hassle-free 30-day return window for all organic products.
                    </p>
                    <Link href="/" className="inline-block mt-2 text-prim font-bold text-xs hover:underline">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Security */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon icon="lucide:shield-check" className="text-green-600" width={20} />
                <span className="text-sm font-semibold text-gray-800">Payment & Security</span>
              </div>

              <ul className="flex flex-wrap gap-2 items-center mb-3">
                {["/visa-svgrepo-com.svg", "/mastercard-svgrepo-com.svg", "/american-express-svgrepo-com.svg", "/paypal-svgrepo-com.svg", "/dinners-club-svgrepo-com.svg", "/discover-3-svgrepo-com.svg"].map((src, index) => (
                  <li key={index} className="border border-gray-200 rounded px-2 py-1 bg-white hover:shadow-md transition-all duration-300">
                    <img src={src} alt="payment card" className="h-5 w-auto object-contain" />
                  </li>
                ))}
              </ul>

              <p className="text-gray-500 text-[11px] leading-relaxed">
                Your payment information is processed securely. We do not store or have access to your credit card details.
              </p>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS (FULL WIDTH BOTTOM SECTION) */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Related Products</h3>
          </div>

          <div className="product">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                1200: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                0: { slidesPerView: 1 },
              }}
              className="py-4"
            >
              {organicProducts.slice(4, 9).map((product, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <div className="flex items-start w-full gap-5 cursor-pointer bg-white p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300">
                    <div className="w-28 h-28 group relative rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />
                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate hover:text-prim mb-1 duration-500 text-gray-800">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-black text-sm">
                          {product.price}
                        </span>
                        {product.lessprice && (
                          <span className="line-through font-medium text-gray-400 text-xs">
                            {product.lessprice}
                          </span>
                        )}
                      </div>

                      <ul className="flex items-center mb-3 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <li key={i}>
                            <Icon icon="ic:round-star" width={14} height={14} />
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center rounded py-1.5 px-3 font-semibold text-[10px] bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width={14}
                          height={14}
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
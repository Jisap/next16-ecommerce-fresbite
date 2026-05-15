"use client"

import titleicon from "@/public/freshbite-title-icon1.png"
import Image from "next/image"
import Products from "../../../../JsonData/TopSelling.json"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

export interface Product {
  id: string;
  image1: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  title: string;
  price: string;
  lessprice?: string;
  review?: string;
  offer?: string;
  megasale?: string;
  seller?: string;
  supersaver?: string;
  weight?: string;
  qty?: number;
}

export interface CartProduct extends Product {
  weight: string;
  qty: number;
  priceNumber: number;
}

type TopSellingProps = {
  product: Product[];
}



const TopSelling = ({ product }: TopSellingProps) => {

  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<{ [key: string]: string }>({});

  const weights = ["1kg", "2kg", "3kg", "4kg", "5kg"];

  const [qty, setQty] = useState<Record<string, number>>({});

  const increaseQty = (id: string) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }))
  }
  const decreaseQty = (id: string) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? - 1 : 1
    }))
  }

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("1 KG");


  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const handleUpdate = () => {
      const stored: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(stored);
    }

    handleUpdate();
    window.addEventListener("wishlistUpdated", handleUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleUpdate);
    }
  }, []);

  const toggleWishlist = (product: Product) => {
    const stored: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updated: string[];
    if (stored.includes(product.id)) {
      updated = stored.filter(id => id !== product.id);
      toast(`${product.title} Removed from wishlist`)
    } else {
      updated = [...stored, product.id];
      toast(`${product.title} Removed from wishlist`)
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);

    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
        <div className="section-title flex flex-wrap pb-10 md:ps-5 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold">
            Top Selling Products
          </h2>

          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image
              src={titleicon} alt="titleicon"
            />
            Fresh and fabulous from farm to table.
          </p>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          className="w-full product-swiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
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
          {Products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                {
                  (() => {
                    if (product.megasale) {
                      return (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                          {product.megasale}
                        </span>
                      )
                    }

                    if (product.offer) {
                      return (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                          {product.offer}
                        </span>
                      )
                    }

                    if (product.supersaver) {
                      return (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                          {product.supersaver}
                        </span>
                      )
                    }

                    if (product.seller) {
                      return (
                        <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                          {product.seller}
                        </span>
                      )
                    }

                    return null;
                  })()
                }

                <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                  <img
                    src={product.image1}
                    alt={product.title}
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-100 group-hover:opacity-0 transition-all duration-500"
                  />

                  <img
                    src={product.image2}
                    alt={product.title}
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />

                  <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <Icon
                      icon={wishlist.includes(product.id) ? "mdi:heart" : "line-md:heart"}
                      width={30}
                      height={30}
                      onClick={() => toggleWishlist(product)}
                      className="border-b border-gray-200 p-1 cursor-pointer "
                      onClickCapture={() => {
                        setSelectedProduct(product);
                        setOpenModal(true);
                      }}

                    />

                    <Icon
                      icon="iconamoon:eye-light"
                      width={30}
                      height={30}
                      className="border-b border-gray-200 p-1 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>

                <div className="product-content p-5">
                  <button
                    onClick={() => { router.push(`/products/${product.id}`) }}
                    className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                  >
                    {product.title}
                  </button>

                  <div className="flex items-center justify-between mb-3 gap-3 relative">
                    <div className="relative">
                      <button
                        onClick={() => setOpenId(openId === product.id ? null : product.id)}
                        className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                      >
                        {selectedWeight[product.id] || "1 kg"}
                        <Icon
                          icon="iconamoon:arrow-down-2-duotone"
                          width={20}
                          height={20}
                          className={`
                            transition-transform duration-300
                            ${openId === product.id ? "rotate-180" : ""}
                          `}
                        />
                      </button>

                      <ul className={`
                        absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out
                        ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}   
                      `}
                      >
                        {weights.map((item) => (
                          <li
                            key={item}
                            onClick={() => {
                              setSelectedWeight(prev => ({
                                ...prev,
                                [product.id]: item
                              }));
                              setOpenId(null)
                            }}
                            className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => decreaseQty(product.id)}
                        className="px-3 py-2 text-md cursor-pointer"
                      >
                        <Icon icon="ic:baseline-minus" width={20} height={20} />
                      </button>

                      <span className="px-3 text-lg">{qty[product.id]}</span>

                      <button
                        onClick={() => increaseQty(product.id)}
                        className="px-3 py-2 text-md cursor-pointer"
                      >
                        <Icon icon="ic:baseline-plus" width={20} height={20} />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Toaster position="top-right" />
    </>
  )
}

export default TopSelling
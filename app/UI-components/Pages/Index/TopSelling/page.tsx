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
import Link from "next/link"

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

  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"];

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
      [id]: (prev[id] || 1) > 1 ? (prev[id] || 1) - 1 : 1
    }))
  }

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("1 kg");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image1);
      setSelectedSize("1 kg");
    }
  }, [selectedProduct]);

  const priceBySize: Record<string, string> = {
    "1 kg": selectedProduct?.price || "0",
    "2 kg": "3800",
    "3 kg": "4400",
    "4 kg": "5500",
    "5 kg": "6200",
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }


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

  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const stored: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    }

    const openCart = () => setIsCartOpen(true);

    loadCart();

    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("cart-open", openCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("cart-open", openCart);
    }
  }, []);

  const addToCart = (product: Product) => {
    const weight = selectedWeight[product.id] || "1 kg";
    const stored: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const exists = stored.some((item) => item.id === product.id && item.weight === weight)

    if (exists) {
      toast("Already in Cart 🛒");
      return;
    }

    const basePrice = getPriceNumber(product.price);

    let multiplier = 1;
    if (weight === "1 kg") multiplier = 2;
    if (weight === "2 kg") multiplier = 3;
    if (weight === "3 kg") multiplier = 4;
    if (weight === "4 kg") multiplier = 5;
    if (weight === "5 kg") multiplier = 6;

    const updated: CartProduct[] = [
      ...stored,
      {
        ...product,
        weight,
        qty: qty[product.id] || 1,
        priceNumber: basePrice * multiplier
      }
    ];

    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("cart-open"));

    setIsCartOpen(true)
    toast.success(`${product.title} added to cart 🛒`);


  }

  const getPriceNumber = (price?: string) => {
    if (!price) return 0;

    const cleaned = price
      .replace(/,/g, "")
      .replace(/Rs\.?/g, "")
      .trim()

    const value = parseFloat(cleaned)

    return isNaN(value) ? 0 : value;
  }

  const subTotal = cart.reduce((total, item) => {
    return total + (item.priceNumber || 0) * (item.qty || 1);
  }, 0)






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
          {/* PRIMERA DIAPOSITIVA (2 Productos en vertical) */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(0, 1).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(1, 2).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* SEGUNDA DIAPOSITIVA */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(2, 3).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(3, 4).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* TERCERA DIAPOSITIVA  */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(4, 5).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(5, 6).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* CUARTA DIAPOSITIVA  */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(6, 7).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(7, 8).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* QUINTA DIAPOSITIVA  */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(8, 9).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(9, 10).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* SEXTA DIAPOSITIVA  */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(10, 11).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(11, 12).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

          {/* SEPTIMA DIAPOSITIVA  */}
          <SwiperSlide>
            {/* FILA 1 */}
            <div className="grid grid-cols-1 gap-10 mb-10">
              {Products.slice(12, 13).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FILA 2 */}
            <div className="grid grid-cols-1 gap-10 mt-8">
              {Products.slice(13, 14).map((product) => (
                <div key={product.id}>
                  <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
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

                          <span className="px-3 text-lg">{qty[product.id] || 1}</span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 text-md cursor-pointer"
                          >
                            <Icon icon="ic:baseline-plus" width={20} height={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon icon="material-symbols:star-rounded" width="14" className="me-1" />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
                      >
                        ADD TO CART
                        <Icon
                          icon="lucide:shopping-bag"
                          width="20"
                          height="20"
                          className="ms-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>

        </Swiper>
      </div>

      {/* Popup modal */}
      <div className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm top-0 left-0 transition-opacity duration-300
        ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}  
      `}
      >
        <div className={`
          relative bg-white max-w-6xl w-full mx-4 rounded-sm p-5 lg:p-10 flex lg:flex-row flex-col overflow-y-auto max-h-175 gap-10 transition-all duration-300 ease-out
          ${openModal ? "scale-100 opacity-100" : "scale-90 opacity-0"}  
        `}
        >
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-0 right-0 z-50 text-xl font-bold hover:bg-black cursor-pointer transition-all duration-300 bg-prim-dark text-white p-2"
          >
            <Icon icon="material-symbols-light:close" width="24" height="24" />
          </button>

          <div className="w-full lg:w-1/2 h-full">
            <div className="overflow-hidden border border-gray-200 rounded-sm">
              {(mainImage || selectedProduct?.image1) && (
                <Image
                  src={mainImage || selectedProduct?.image1}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full h-112.5 lg:h-112.5 object-cover"
                />
              )}
            </div>

            <div className="flex justify-between items-center overflow-x-auto gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const img = selectedProduct?.[`image${i}`];
                if (!img) return null;

                return (
                  <Image
                    key={`${selectedProduct.id}-${i}`}
                    src={img}
                    alt="thumb"
                    width={100}
                    height={100}
                    className="border border-gray-200 rounded-sm cursor-pointer object-cover h-24 w-full"
                    onClick={() => setMainImage(img)}
                  />
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-full lg:overflow-y-auto lg:h-150 hide-scrollbar">
            <h3 className="text-2xl font-semibold mb-2">
              {selectedProduct?.title}
            </h3>

            <p>
              Tax included. Shipping calculated at checkout.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold">
                Rs. {priceBySize[selectedSize].replace("Rs.", "").trim()}
              </div>

              {selectedProduct?.lessprice && (
                <div className="font-semibold line-through text-gray-500 text-md">
                  Rs. {selectedProduct?.lessprice.replace(/Rs\.?/i, "").trim()}
                </div>
              )}
            </div>

            <span className="text-gray-500">
              Tax included. Shipping calculated at checkout.
            </span>

            <div className="flex items-center gap-2 border-b border-gray-200 pb-5 pt-2 mb-4">
              <svg width="15" height="15" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="7.5" fill="rgb(62,214,96,0.3)"></circle>
                <circle cx="7.5" cy="7.5" r="5" strokeWidth="1" fill="rgb(62,214,96)"></circle>
              </svg>
              13 in Stock
            </div>

            <p className="mb-3 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit aperiam voluptatum ex maxime, saepe illo debitis odit, error.
            </p>

            <div className="mb-6">
              <div className="mb-3">
                <strong>Size:</strong>
                <span className="ml-2 text-sm font-medium text-gray-500">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      border rounded-sm px-4 py-2 cursor-pointer transition-all duration-300 font-medium text-sm
                      ${selectedSize === size ? "bg-black text-white border-black shadow-md" : "border-gray-200 hover:border-black hover:bg-black hover:text-white"}  
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex items-center border border-gray-200 rounded w-fit mb-5 mt-4">
                <button
                  onClick={() => decreaseQty(selectedProduct.id)}
                  className="px-3 py-2 text-md cursor-pointer"
                >
                  <Icon icon="ic:baseline-minus" width={20} height={20} />
                </button>

                <span className="px-3 text-lg">{qty[selectedProduct.id] || 1}</span>

                <button
                  onClick={() => increaseQty(selectedProduct.id)}
                  className="px-3 py-2 text-md cursor-pointer"
                >
                  <Icon icon="ic:baseline-plus" width={20} height={20} />
                </button>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedProduct) return;

                    addToCart(selectedProduct);
                    window.dispatchEvent(new Event("cart-open"));
                    setOpenModal(false);

                    toast.success(`${selectedProduct?.title} added to cart`, {
                      className: "bg-black text-white",
                    })
                  }}
                  className="bg-prim text-white px-6 py-3 rounded hover:bg-black transition-all duration-300 cursor-pointer font-bold w-full"
                >
                  ADD TO CART
                </button>

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-prim transition-all duration-300 cursor-pointer w-full">
                  BUY IT NOW
                </button>
              </div>

              <div className="py-5">
                <span className="text-xl font-medium">
                  Payment & Security
                </span>

                <ul className="flex flex-wrap gap-2 items-center pt-2">
                  {[
                    "/visa-svgrepo-com.svg",
                    "/mastercard-svgrepo-com.svg",
                    "/american-express-svgrepo-com.svg",
                    "/paypal-svgrepo-com.svg",
                    "/dinners-club-svgrepo-com.svg",
                    "/discover-3-svgrepo-com.svg"
                  ].map((src, index) => (
                    <li key={index} className="border border-gray-200 rounded-sm px-2 py-1 hover:shadow-md transition-all duration-300">
                      <img src={src} alt="payment" className="h-6 w-auto" />
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-500 mb-3">
                Your payment information is processed securely. We do not store credit card
                detais not have access to your credit card information.
              </p>

              <ul className="flex justify-between items-center flex-wrap gap-5 border border-gray-200 p-5 mb-3">
                <li className="flex items-center text-center flex-col">
                  <Icon icon="akar-icons:location" width="30" height="30" />

                  <h6 className="font-semibold text-md pt-2">
                    Store pickup
                  </h6>
                </li>

                <li className="flex items-center text-center flex-col">
                  <Icon icon="grommet-icons:rotate-left" width="30" height="30" />

                  <h6 className="font-semibold text-md pt-2">
                    Return policy
                  </h6>
                </li>

                <li className="flex items-center text-center flex-col">
                  <Icon icon="ic:round-attach-money" width="30" height="30" />

                  <h6 className="font-semibold text-md pt-2">
                    Money back
                  </h6>
                </li>
              </ul>

              {/* Offers Accordion */}
              <div className="border-t border-gray-200 pt-6 mt-2">
                <button
                  onClick={() => toggle(0)}
                  className="flex justify-between items-center w-full cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300">
                      <Icon icon="material-symbols:percent" width="20" height="20" />
                    </div>
                    <span className="font-semibold text-lg">
                      Offers available for you
                    </span>
                  </div>

                  <Icon
                    icon="iconamoon:arrow-down-2-duotone"
                    width="24"
                    className={`transition-transform duration-500 ${openIndex === 0 ? "rotate-180" : ""}`}
                  />
                </button>

                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === 0 ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"}
                `}
                >
                  <ul className="space-y-3">
                    {[
                      { text: "Get up to 50% off on selected products", code: "" },
                      { text: "Buy 2 & get 15% off", code: "BUY2SAVE" },
                      { text: "Get 11% off first order", code: "11%OFF" }
                    ].map((offer, idx) => (
                      <li key={idx}>
                        <Link
                          href="/"
                          className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md flex justify-between items-center group/offer hover:bg-prim/5 transition-all duration-300"
                        >
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">{offer.text}</span>
                          </div>
                          {offer.code && (
                            <span className="bg-white border border-dashed border-prim px-2 py-1 text-[10px] font-bold rounded text-prim group-hover/offer:bg-prim group-hover/offer:text-white transition-colors">
                              {offer.code}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pickup Accordion */}
              <div className="border-t border-gray-200 pt-6 mt-2">
                <button
                  onClick={() => toggle(1)}
                  className="flex justify-between items-center w-full cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300">
                      <Icon icon="mingcute:truck-line" width="20" height="20" />
                    </div>
                    <span className="font-semibold text-lg">
                      Choose pickup and save time!
                    </span>
                  </div>

                  <Icon
                    icon="iconamoon:arrow-down-2-duotone"
                    width="24"
                    className={`transition-transform duration-500 ${openIndex === 1 ? "rotate-180" : ""}`}
                  />
                </button>

                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === 1 ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"}
                `}
                >
                   <div className="bg-gray-50 border-l-4 border-prim p-4 rounded-r-md">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Opt for our convenient pickup option and get your items faster. Save on shipping costs and collect at your nearest store.
                    </p>
                    <Link href="/" className="inline-block mt-3 text-prim font-bold text-sm hover:underline">
                      View Information →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Return Accordion */}
              <div className="border-t border-gray-200 pt-6 mt-2">
                <button
                  onClick={() => toggle(2)}
                  className="flex justify-between items-center w-full cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all duration-300">
                      <Icon icon="solar:refresh-bold" width="20" height="20" />
                    </div>
                    <span className="font-semibold text-lg">
                      Flexible returns
                    </span>
                  </div>

                  <Icon
                    icon="iconamoon:arrow-down-2-duotone"
                    width="24"
                    className={`transition-transform duration-500 ${openIndex === 2 ? "rotate-180" : ""}`}
                  />
                </button>

                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === 2 ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"}
                `}
                >
                  <div className="bg-gray-50 border-l-4 border-prim p-4 rounded-r-md">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Shop with total confidence! We offer a hassle-free 30-day return window for all organic products.
                    </p>
                    <Link href="/" className="inline-block mt-3 text-prim font-bold text-sm hover:underline">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  )
}

export default TopSelling
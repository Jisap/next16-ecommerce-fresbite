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
      [id]: prev[id] > 1 ? - 1 : 1
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
    "1 kg": selectedProduct?.price || "0.00",
    "2 kg": "3,800.00",
    "3 kg": "4,400.00",
    "4 kg": "5,500.00",
    "5 kg": "6,200.00",
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
        qty: 1,
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

                          <span className="px-3 text-lg">{qty[product.id]}</span>

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

                          <span className="px-3 text-lg">{qty[product.id]}</span>

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

                          <span className="px-3 text-lg">{qty[product.id]}</span>

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

                          <span className="px-3 text-lg">{qty[product.id]}</span>

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

      <Toaster position="top-right" />
    </>
  )
}

export default TopSelling
"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import products from "@/app/JsonData/TopSelling.json"
import { useCart } from "@/app/hooks/useCart"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

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

export interface CartProduct extends Product {
  weight: string;
  qty: number;
  priceNumber: number;
}



const CartSidebar = () => {

  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [openNote, setOpenNote] = useState<boolean>(false);

  // --- HOOK GLOBAL ---
  // Extraemos toda la lógica que ya hace nuestro hook
  const {
    cart,
    increaseQty,
    decreaseQty,
    qty,
    removeFromCart,
    updateCartItemQty,
    cartSubtotal
  } = useCart()

  // Escuchar cuando alguien hace click en el botón del carrito (Navmiddle) 
  // o cuando se añade un producto nuevo
  useEffect(() => {
    const openCart = () => setIsCartOpen(true)
    window.addEventListener("cart-open", openCart)
    return () => window.removeEventListener("cart-open", openCart)
  }, [])


  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 cursor-pointer"
        ></div>

      )}

      <div className={`
        fixed top-0 right-0 h-full bg-white z-100 shadow-xl transform transition-transform duration-500 ease-in-out overflow-y-auto hide-scrollbar w-full sm:w-[80%] lg:w-[45%] xl:w-[35%] z-50
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}   
      `}
      >
        <p className="text-center bg-gray-100 py-3">
          New customers save 10% with code WELCOME10
        </p>

        <div className="p-5 sm:p-10 border-b border-gray-200 relative">
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute top-1 right-1 z-50"
          >
            <Icon
              icon="material-symbols-light:close"
              width="30"
              height="30"
            />
          </button>

          <h4 className="text-xl font-medium font-unbounded">My shopping cart</h4>

          <p className="text-gray-500">Congratulations, You've got free shippin!</p>

          <div className="ship-probar w-full h-1.5 rounded-md mt-5 relative bg-gray-light">
            <Icon
              icon="mdi:truck-outline"
              width="30"
              height="30"
            />
          </div>
        </div>

        <div className="p-5 sm:p-8 max-h-150 overflow-y-scroll hide-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-medium pb-5 flex items-center justify-center gap-3">
                <Icon icon="icon-park-outline:shopping" width="20" height="20" />
                Your cart is empty
              </p>

              <Link
                href="/UI-Components/Pages/Shop"
                className="bg-prim px-5 py-3 cursor-pointer text-white font-medium rounded-sm"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <>
              {cart.map((product) => (
                <div key={`${product.id}-${product.weight}`} className="flex items-start h-full gap-5 space-y-5 cursor-pointer">
                  <div className="border border-gray-200 w-36 h-36 group relative">
                    <img
                      src={product.image1}
                      alt={product.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <img
                      src={product.image2}
                      alt={product.title}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-semibold group-hover:text-prim mb-1 duration-500">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-black text-shadow-md">
                        Rs. {(product.priceNumber * product.qty).toLocaleString()}
                      </span>

                      {product.lessprice && (
                        <span className="line-through font-semibold text-black text-md">
                          Rs. {(Number(product.lessprice.replace(/Rs\.?/i, "").replace(/,/g, "").trim() || 0) * product.qty).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="mb-5">
                      Size:  <strong>{product.weight}</strong>
                    </div>

                    {/* Qty Selector */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded w-fit">
                        <button onClick={() => updateCartItemQty(product.id, product.weight, product.qty - 1)} className="px-3 py-2 text-md cursor-pointer">
                          <Icon icon="ic:baseline-minus" width={20} height={20} />
                        </button>
                        <span className="px-3 text-lg min-w-10 text-center">{product.qty}</span>
                        <button onClick={() => updateCartItemQty(product.id, product.weight, product.qty + 1)} className="px-3 py-2 text-md cursor-pointer">
                          <Icon icon="ic:baseline-plus" width={20} height={20} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id, product.weight)}
                        className="font-bold cursor-pointer"
                      >
                        <Icon icon="material-symbols-light:delete-outline" width="24" height="24" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="p-5 sm:p-10 pt-5 border-t border-b border-gray-200">
          <h5 className="text-xl font-semibold">You might also like</h5>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex items-start gap-5">
                  <div className="border border-gray-200 w-36 h-36 group relative">
                    <img
                      src={product.image1}
                      alt={product.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <img
                      src={product.image2}
                      alt={product.title}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-semibold group-hover:text-prim mb-1 duration-500">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-black text-shadow-md">
                        {product.price}
                      </span>

                      {product.lessprice && (
                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default CartSidebar
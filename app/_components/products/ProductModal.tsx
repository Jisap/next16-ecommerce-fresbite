"use client"

import React from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import Link from "next/link"

interface ProductModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  selectedProduct: any;
  mainImage: string | null;
  setMainImage: (img: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceBySize: Record<string, string>;
  qty: Record<string, number>;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  addToCart: (product: any, weight?: string) => void;
  openIndex: number | null;
  toggle: (index: number) => void;
}

const ProductModal = ({
  openModal,
  setOpenModal,
  selectedProduct,
  mainImage,
  setMainImage,
  selectedSize,
  setSelectedSize,
  priceBySize,
  qty,
  increaseQty,
  decreaseQty,
  addToCart,
  openIndex,
  toggle
}: ProductModalProps) => {
  if (!selectedProduct) return null;

  return (
    <div className={`
      fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300
      ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}  
    `}>
      <div className={`
        relative bg-white max-w-6xl w-full mx-4 rounded-sm p-5 lg:p-10 flex lg:flex-row flex-col overflow-y-auto max-h-[90vh] gap-10 transition-all duration-300 ease-out
        ${openModal ? "scale-100 opacity-100" : "scale-90 opacity-0"}  
      `}>
        {/* Close Button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-0 right-0 z-50 text-xl font-bold hover:bg-black cursor-pointer transition-all duration-300 bg-prim text-white p-2"
        >
          <Icon icon="material-symbols-light:close" width="24" height="24" />
        </button>

        {/* Left: Images */}
        <div className="w-full lg:w-1/2 h-full">
          <div className="overflow-hidden border border-gray-200 rounded-sm">
            <Image
              src={mainImage || selectedProduct.image1}
              alt={selectedProduct.title}
              width={500}
              height={500}
              className="w-full h-112.5 object-cover"
            />
          </div>

          <div className="flex justify-between items-center overflow-x-auto gap-2 mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const img = selectedProduct[`image${i}`];
              if (!img) return null;
              return (
                <Image
                  key={`${selectedProduct.id}-${i}`}
                  src={img}
                  alt="thumb"
                  width={100}
                  height={100}
                  className={`border rounded-sm cursor-pointer object-cover h-24 w-full transition-all ${mainImage === img ? "border-prim" : "border-gray-200"}`}
                  onClick={() => setMainImage(img)}
                />
              )
            })}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 h-full lg:overflow-y-auto lg:h-[70vh] hide-scrollbar">
          <h3 className="text-2xl font-semibold mb-2">{selectedProduct.title}</h3>

          <div className="flex items-center gap-4 mb-4 mt-4">
            <div className="text-2xl font-bold text-prim">
              Rs. {(Number(priceBySize[selectedSize]?.replace(/Rs\.?/i, "").replace(/,/g, "").trim() || 0) * (qty[selectedProduct.id] || 1)).toLocaleString()}
            </div>

            {selectedProduct.lessprice && (
              <div className="font-semibold line-through text-gray-500 text-md">
                Rs. {(Number(selectedProduct.lessprice.replace(/Rs\.?/i, "").replace(/,/g, "").trim() || 0) * (qty[selectedProduct.id] || 1)).toLocaleString()}
              </div>
            )}
          </div>

          <span className="text-gray-500 text-sm block mb-4">
            Tax included. Shipping calculated at checkout.
          </span>

          <div className="flex items-center gap-2 border-b border-gray-200 pb-5 pt-2 mb-4">
            <svg width="15" height="15" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="7.5" fill="rgb(62,214,96,0.3)"></circle>
              <circle cx="7.5" cy="7.5" r="5" strokeWidth="1" fill="rgb(62,214,96)"></circle>
            </svg>
            <span className="text-sm font-medium">13 in Stock</span>
          </div>

          <p className="mb-6 text-gray-600 text-sm leading-relaxed">
            {selectedProduct.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit aperiam voluptatum ex maxime, saepe illo debitis odit, error."}
          </p>

          {/* Size Selector */}
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
          </div>

          {/* Qty and Actions */}
          <div className="flex items-center border border-gray-200 rounded w-fit mb-6">
            <button onClick={() => decreaseQty(selectedProduct.id)} className="px-3 py-2 cursor-pointer">
              <Icon icon="ic:baseline-minus" width={20} height={20} />
            </button>

            <span className="px-4 text-lg min-w-12 text-center font-medium">{qty[selectedProduct.id] || 1}</span>

            <button onClick={() => increaseQty(selectedProduct.id)} className="px-3 py-2 cursor-pointer">
              <Icon icon="ic:baseline-plus" width={20} height={20} />
            </button>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => {
                addToCart(selectedProduct, selectedSize);
                setOpenModal(false);
              }}
              className="bg-prim text-white px-6 py-3 rounded hover:bg-black transition-all duration-300 cursor-pointer font-bold w-full uppercase tracking-wider"
            >
              ADD TO CART
            </button>

            <button className="bg-black text-white px-6 py-3 rounded hover:bg-prim transition-all duration-300 cursor-pointer w-full uppercase tracking-wider font-bold">
              BUY IT NOW
            </button>
          </div>

          {/* Payment Info */}
          <div className="mb-8">
            <span className="text-lg font-semibold block mb-3">Payment & Security</span>

            <ul className="flex flex-wrap gap-3 items-center mb-4">
              {["/visa-svgrepo-com.svg", "/mastercard-svgrepo-com.svg", "/american-express-svgrepo-com.svg", "/paypal-svgrepo-com.svg", "/dinners-club-svgrepo-com.svg", "/discover-3-svgrepo-com.svg"].map((src, index) => (
                <li key={index} className="border border-gray-100 rounded-sm px-2 py-1 hover:shadow-md transition-all duration-300 bg-white">
                  <img src={src} alt="payment" className="h-6 w-auto" />
                </li>
              ))}
            </ul>

            <p className="text-gray-500 text-xs">
              Your payment information is processed securely. We do not store credit card details.
            </p>
          </div>

          {/* Accordions */}
          <div className="space-y-2 border-t border-gray-100 pt-6">
            {/* Offers */}
            <div className="pb-4">
              <button onClick={() => toggle(0)} className="flex justify-between items-center w-full group">
                <div className="flex items-center text-left">
                  <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all">
                    <Icon icon="material-symbols:percent" width={18} />
                  </div>

                  <span className="font-semibold">Offers available for you</span>
                </div>
                <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 ${openIndex === 0 ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 0 ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
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
            <div className="border-t border-gray-100 py-4">
              <button onClick={() => toggle(1)} className="flex justify-between items-center w-full group">
                <div className="flex items-center text-left">
                  <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all">
                    <Icon icon="mingcute:truck-line" width={18} />
                  </div>
                  <span className="font-semibold">Choose pickup and save time!</span>
                </div>

                <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 ${openIndex === 1 ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 1 ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Opt for our convenient pickup option and get your items faster. Save on shipping costs and collect at your nearest store.
                  </p>

                  <Link href="/" className="inline-block mt-2 text-prim font-bold text-xs hover:underline">View Information →</Link>
                </div>
              </div>
            </div>

            {/* Returns */}
            <div className="border-t border-gray-100 py-4">
              <button onClick={() => toggle(2)} className="flex justify-between items-center w-full group">
                <div className="flex items-center text-left">
                  <div className="w-8 h-8 rounded-full bg-prim/10 flex items-center justify-center mr-3 group-hover:bg-prim group-hover:text-white transition-all">
                    <Icon icon="solar:refresh-bold" width={18} />
                  </div>

                  <span className="font-semibold">Flexible returns</span>
                </div>
                <Icon icon="iconamoon:arrow-down-2-duotone" width={22} className={`transition-transform duration-500 ${openIndex === 2 ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 2 ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="bg-gray-50 border-l-4 border-prim p-3 rounded-r-md">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Shop with total confidence! We offer a hassle-free 30-day return window for all organic products.
                  </p>

                  <Link href="/" className="inline-block mt-2 text-prim font-bold text-xs hover:underline">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal;

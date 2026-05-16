"use client"

import React from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: any;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  selectedWeight: Record<string, string>;
  setSelectedWeight: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  weights: string[];
  qty: Record<string, number>;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  addToCart: (product: any, weight?: string) => void;
  toggleWishlist: (product: any) => void;
  wishlist: string[];
  setSelectedProduct: (product: any) => void;
  setOpenModal: (open: boolean) => void;
}

const ProductCard = ({
  product,
  openId,
  setOpenId,
  selectedWeight,
  setSelectedWeight,
  weights,
  qty,
  increaseQty,
  decreaseQty,
  addToCart,
  toggleWishlist,
  wishlist,
  setSelectedProduct,
  setOpenModal
}: ProductCardProps) => {
  const router = useRouter();

  return (
    <div className={`group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500 ${openId === product.id ? "z-50" : "z-10"}`}>
      {/* Badges */}
      {(() => {
        if (product.megasale) return <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">{product.megasale}</span>;
        if (product.offer) return <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">{product.offer}</span>;
        if (product.supersaver) return <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">{product.supersaver}</span>;
        if (product.seller) return <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">{product.seller}</span>;
        return null;
      })()}

      {/* Images */}
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

        {/* Quick Actions */}
        <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100 bg-white">
          <Icon
            icon={wishlist.includes(product.id) ? "mdi:heart" : "line-md:heart"}
            width={30}
            height={30}
            onClick={() => toggleWishlist(product)}
            className={`border-b border-gray-200 p-1 cursor-pointer ${wishlist.includes(product.id) ? "text-red-500" : ""}`}
          />
          <Icon
            icon="iconamoon:eye-light"
            width={30}
            height={30}
            className="p-1 cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setOpenModal(true);
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="product-content p-5">
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer text-left w-full"
        >
          {product.title}
        </button>

        <div className="flex items-center justify-between mb-3 gap-3 relative">
          {/* Weight Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setOpenId(openId === product.id ? null : product.id)}
              className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
            >
              {selectedWeight[product.id] || "1 kg"}
              <Icon
                icon="iconamoon:arrow-down-2-duotone"
                width={20}
                height={20}
                className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
              />
            </button>

            <ul className={`
              absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-50 transition-all duration-300 ease-in-out
              ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}   
            `}>
              {weights.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedWeight(prev => ({ ...prev, [product.id]: item }));
                    setOpenId(null);
                  }}
                  className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Qty Selector */}
          <div className="flex items-center border border-gray-200 rounded">
            <button onClick={() => decreaseQty(product.id)} className="px-3 py-2 text-md cursor-pointer">
              <Icon icon="ic:baseline-minus" width={20} height={20} />
            </button>
            <span className="px-3 text-lg min-w-[2.5rem] text-center">{qty[product.id] || 1}</span>
            <button onClick={() => increaseQty(product.id)} className="px-3 py-2 text-md cursor-pointer">
              <Icon icon="ic:baseline-plus" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-black text-md">{product.price}</span>
          {product.lessprice && (
            <span className="line-through font-semibold text-gray-400 text-md">{product.lessprice}</span>
          )}
          {product.review && (
            <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
              <Icon icon="material-symbols:star-rounded" width={14} className="me-1" />
              {product.review}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, selectedWeight[product.id])}
          className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
        >
          ADD TO CART
          <Icon icon="lucide:shopping-bag" width={20} height={20} className="ms-1" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard;

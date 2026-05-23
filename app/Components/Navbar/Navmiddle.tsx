"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import React, { useEffect, useState, useMemo } from "react"
import Sidebar from "./Sidebar"
import Search from "./Search"
import { useCart } from "@/app/hooks/useCart"
import ProductCard from "../../UI-components/Pages/Index/TopSelling/ProductCard"
import ProductModal from "../../UI-components/Pages/Index/TopSelling/ProductModal"
import productsData from "@/app/JsonData/OrganicProducts.json"

const Navmiddle = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Estados para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estados para el Modal de Producto y Selección de Pesos
  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("1 kg")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});

  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"]

  const {
    cart,
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist
  } = useCart()

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + (item.qty || 1), 0), [cart]);
  const wishlistCount = wishlist.length;

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 1) {
      return productsData.filter(p =>
        p.title.toLowerCase().includes(q)
      );
    }
    return [];
  }, [searchQuery]); // Dependencia: se recalcula solo cuando cambia searchQuery

  const toggleAccordion = (index: number) => setOpenIndex(openIndex === index ? null : index)

  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 border-b border-gray-100 lg:border-none relative bg-white z-30">
        <div className="flex relative justify-between items-center py-3 lg:py-5">
          {/* Mobile Menu Button */}
          <button onClick={() => setOpenMenu(true)} className="flex lg:hidden cursor-pointer p-1">
            <Icon icon="material-symbols-light:menu" width="30" height="30" />
          </button>

          {/* Logo */}
          <Link href="/" className="logo font-unbounded text-xl sm:text-2xl cursor-pointer">
            Fresh<span className="text-prim">Bite</span>
          </Link>

          {/* Search Component - Desktop */}
          <div className="hidden lg:flex flex-1 justify-center max-w-2xl px-10">
            <Search onQueryChange={(q) => setSearchQuery(q)} />
          </div>

          {/* Buttons - User - Wishlist - Cart */}
          <ul className="flex space-x-3 lg:space-x-5 items-center justify-end">
            <li>
              <button
                onClick={() => { setIsLogin(true); setShowModal(true); }}
                className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 hover:bg-prim hover:text-white transition-all"
              >
                <Icon
                  icon="lucide:user"
                  width="22"
                  height="22"
                />
              </button>
            </li>

            <li>
              <Link
                href="/wishlist"
                className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative hover:bg-prim hover:text-white transition-all"
              >
                <Icon
                  icon="tabler:heart"
                  width="22"
                  height="22"
                />
                {wishlistCount > 0 && (
                  <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-[10px] rounded-full text-white ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <button
                onClick={() => window.dispatchEvent(new Event("cart-open"))}
                className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative hover:bg-prim hover:text-white transition-all"
              >
                <Icon icon="lucide:shopping-bag" width="22" height="22" />
                {cartCount > 0 && (
                  <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-[10px] rounded-full text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Search Component - Mobile */}
        <div className="lg:hidden pb-4 px-1">
          <Search onQueryChange={(q) => setSearchQuery(q)} />
        </div>

        {/* PANEL DE RESULTADOS DE BÚSQUEDA (AHORA DENTRO DEL RELATIVE) */}
        {searchQuery.length > 1 && (
          <div className="absolute top-full left-0 w-full bg-white z-99 shadow-2xl border-t border-gray-100 animate-fadeIn max-h-[85vh] overflow-y-auto pb-20">
            <div className="max-w-7xl mx-auto p-6 lg:p-10">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Results for: <span className="text-prim">"{searchQuery}"</span></h2>
                  <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found in store</p>
                </div>

                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-prim flex items-center gap-2 font-semibold transition-all cursor-pointer bg-gray-50 px-4 py-2 rounded-full hover:bg-prim/10"
                >
                  <Icon icon="material-symbols:close-rounded" width="20" /> Close
                </button>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      openId={openId}
                      setOpenId={setOpenId}
                      selectedWeight={selectedWeights}
                      setSelectedWeight={setSelectedWeights}
                      weights={weights}
                      qty={qty}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                      addToCart={addToCart}
                      toggleWishlist={toggleWishlist}
                      wishlist={wishlist}
                      setSelectedProduct={(p) => {
                        setSelectedProduct(p);
                        setMainImage(p.image1);
                      }}
                      setOpenModal={setOpenModal}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Icon icon="hugeicons:search-not-found" width="40" className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">Try different keywords or check your spelling.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />

      {/* Modal de Producto */}
      {selectedProduct && (
        <ProductModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedProduct={selectedProduct}
          mainImage={mainImage}
          setMainImage={setMainImage}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          priceBySize={{ "1 kg": selectedProduct?.price || "0", "2 kg": "3800", "3 kg": "4400", "4 kg": "5500", "5 kg": "6200" }}
          qty={qty}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          addToCart={addToCart}
          openIndex={openIndex}
          toggle={toggleAccordion}
        />
      )}

      {/* Modal de Login / Registro */}
      {showModal && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl p-8 lg:p-10 w-full max-w-[500px] shadow-2xl animate-fadeIn overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-5 right-5 text-gray-400 hover:text-prim transition-all cursor-pointer p-1"
              onClick={() => setShowModal(false)}
            >
              <Icon icon="material-symbols-light:close" width="28" height="28" />
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome back!" : "Create an account"}
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-prim"
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-prim"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-prim"
                required
              />

              <button
                type="submit"
                className="w-full mt-4 bg-prim text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all cursor-pointer shadow-lg shadow-prim/20"
              >
                {isLogin ? "Login Now" : "Register Now"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  className="text-prim hover:underline ml-2 font-bold cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Register Here" : "Login Here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navmiddle
"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"


const Navmiddle = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(stored.length);
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = cart.reduce((sum: number, item: any) => sum + (item.qty || 1), 0)
      setCartCount(totalQty);
    }

    updateWishlistCount();
    updateCartCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    }
  }, [])

  return (
    <>
      <div className="flex relative justify-between items-center py-3 lg:space-y-0 space-y-3 px-2 lg:px-8 xl:px-12">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenMenu(true)}
          className="flex lg:hidden cursor-pointer"
        >
          <Icon icon="material-symbols:light:menu" width="30" height="30" />
        </button>

        {/* Logo - Always visible */}
        <Link href="/" className="logo font-unbounded text-xl sm:text-2xl cursor-pointer">
          Fresh<span className="text-prim">Bite</span>
        </Link>

        {/* Search Form - Visible on desktop, can be adapted for mobile */}
        <form className="hidden lg:flex items-center w-full rounded-sm overflow-hidden max-w-xl bg-white border border-gray-200 relative mx-4">
          <span className="px-4 text-gray-500">
            <Icon icon="iconamoon:search-thin" width="20" height="20" />
          </span>

          <input
            type="text"
            placeholder="Search your groceries items..."
            className="flex-1 px-3 py-3 text-[16px] text-[#222] border-0 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            className="bg-prim text-white hover:bg-black transition-colors duration-300 px-6 py-3 font-semibold text-sm uppercase rounded-sm cursor-pointer"
          >
            Search
          </button>
        </form>

        <ul className="flex space-x-3 lg:space-x-5 items-center justify-end">
          <li className="hidden sm:block">
            <button
              onClick={() => {
                setIsLogin(true)
                setShowModal(true)
              }}
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300"
            >
              <Icon icon="lucide:user" width="24" height="24" />
            </button>
          </li>

          <li className="hidden sm:block">
            <Link
              href='/UI-components/Pages/Wishlist'
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative"
            >
              <Icon icon="tabler:heart" width="24" height="24" />
              {wishlistCount > 0 && (
                <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-sm rounded-full text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li className="hidden sm:block">
            <button
              onClick={() => window.dispatchEvent(new Event("cart-open"))}
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative"
            >
              <Icon icon="lucide:shopping-bag" width="24" height="24" />
              {cartCount > 0 && (
                <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-sm rounded-full text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navmiddle
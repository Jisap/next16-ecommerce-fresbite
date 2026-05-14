"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"


const Navmiddle = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        </ul>
      </div>
    </>
  )
}

export default Navmiddle
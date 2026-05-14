"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"




const Sidebar = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] bg-white shadow-md transform transition-transform duration-300 overflow-y-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="uppercase text-md bg-gray-light flex justify-between items-center font-medium p-4">
          Menu
          <button onClick={onClose}>
            <Icon icon="material-symbols-light:close" width="24" height="24" />
          </button>
        </div>

        <ul>
          <li>
            <Link href="/" className="p-4 block border-b border-b-gray-100 text-md hover:text-prim transition-colors duration-300 cursor-pointer font-medium">
              Home
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md hover:text-prim transition-colors duration-300 cursor-pointer font-medium">
              Shop
            </Link>
            <Link href="/UI-Components/Pages/Blogs" className="p-4 block border-b border-b-gray-100 text-md hover:text-prim transition-colors duration-300 cursor-pointer font-medium">
              Blogs
            </Link>
          </li>

          <li className="border-b border-gray-100">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="w-full flex justify-between items-center p-4 text-lg"
            >
              <span className="text-md">Pages</span>

              <Icon
                icon={pagesOpen ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"}
                width={24}
                height={24}
                className="transition-transform duration-300"
              />
            </button>

            <ul className={`overflow-hidden transition-all duration-300 ease-in-out ${pagesOpen ? "max-h-96" : "max-h-0"}`}>
              <li className="p-4 border-b border-gray-100 text-md">
                <Link href="/UI-components/Pages/About" className="font-medium">About</Link>
              </li>

              <li className="p-4 border-b border-gray-100 text-md">
                <Link href="/UI-components/Pages/Faqs" className="font-medium">Faq's</Link>
              </li>

              <li className="p-4 border-b border-gray-100 text-md">
                <Link href="/UI-components/Pages/Contact" className="font-medium">Contact</Link>
              </li>

              <li className="p-4 border-b border-gray-100 text-md">
                <Link href="/UI-components/Pages/PageNotFound" className="font-medium">Page Not Found</Link>
              </li>
            </ul>
          </li>
        </ul>

        <span className="uppercase font-medium text-md bg-gray-light flex justify-between items-center p-4">
          Shop by categories
        </span>

        <ul>
          <li>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Milk and dairy products
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Vegetable and fruits
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Animal biscuits and products
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Bread, toast and biscuits
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Chicken, meat and Fish
            </Link>
            <Link href="/UI-Components/Pages/Shop" className="p-4 block border-b border-b-gray-100 text-md font-medium hover:text-prim transition-colors duration-300 cursor-pointer">
              Vitamins and minerals
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ctg1 from "@/public/freshbite-cat1.png"
import ctg2 from "@/public/freshbite-cat2.png"
import ctg3 from "@/public/freshbite-cat3.png"
import ctg4 from "@/public/freshbite-cat4.png"
import ctg5 from "@/public/freshbite-cat5.png"
import ctg6 from "@/public/freshbite-cat6.png"
import ctg7 from "@/public/freshbite-cat7.png"
import ctg8 from "@/public/freshbite-cat8.png"

const Navbottom = () => {

  const [catOpen, setCatOpen] = useState<boolean>(false);

  const categories = [
    { title: "Milk and dairy products", img: ctg1 },
    { title: "Vegetable and fruits", img: ctg2 },
    { title: "Breakfast and cereals", img: ctg3 },
    { title: "Animal biscuits and products", img: ctg4 },
    { title: "Bread, toast and biscuits", img: ctg5 },
    { title: "Chicken, meat and fish", img: ctg6 },
    { title: "Vitamins and minerals", img: ctg7 },
    { title: "Ice cream and cold drink", img: ctg8 },
  ]
  return (
    <>
      <div className="nav-bottom lg:px-8 xl:px-12 w-full lg:flex justify-between items-center hidden border-b border-gray-100 bg-prim shadow-sm">
        <div className="relative w-[25%]">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="w-full bg-prim text-white p-4 rounded-t-md flex justify-between items-center cursor-pointer font-semibold transition-all duration-300 hover:bg-prim-dark"
          >
            <span className="flex gap-3 items-center">
              <Icon
                icon="material-symbols-light:menu-rounded"
                width="24"
                height="24"
              />
              Shop by categories
            </span>

            <Icon
              icon={catOpen ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"}
              width="20"
              height="20"
              className="transition-transform duration-300"
            />
          </button>

          {/* Categories Dropdown */}
          <div className={`
            absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl rounded-b-md z-50 overflow-hidden transition-all duration-300 ease-in-out
            ${catOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
          `}>
            <ul className="py-2">
              {categories.map((cat, index) => (
                <li key={index} className="border-b border-gray-50 last:border-0">
                  <Link
                    href="/UI-Components/Pages/Shop"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 hover:text-prim transition-all duration-300 group"
                  >
                    <Image
                      src={cat.img}
                      alt={cat.title}
                      width={25}
                      height={25}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-prim">
                      {cat.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 lg:px-4 xl:px-8">
          <ul className="flex items-center lg:gap-4 xl:gap-8">
            <li>
              <Link href="/" className="text-[15px] font-semibold text-white transition-colors duration-300 uppercase tracking-wide">
                Home
              </Link>
            </li>

            <li className="relative group">
              <Link href="/UI-Components/Pages/Shop" className="flex items-center gap-1 text-[15px] font-semibold text-white transition-colors duration-300 uppercase tracking-wide">
                Shop
              </Link>
            </li>

            <li>
              <Link href="/UI-Components/Pages/Blogs" className="text-[15px] font-semibold text-white transition-colors duration-300 uppercase tracking-wide">
                Blogs
              </Link>
            </li>

            <li className="relative group">
              <button className="flex items-center gap-1 text-[15px] font-semibold text-white transition-colors duration-300 uppercase tracking-wide cursor-pointer">
                Pages
                <Icon icon="solar:alt-arrow-down-outline" width="16" height="16" className="group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Pages Dropdown */}
              <div className="absolute top-full left-0 w-48 bg-white shadow-2xl border border-gray-100 py-3 rounded-b-md 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0"
              >
                <Link href="/UI-components/Pages/About" className="block px-5 py-2 text-sm text-gray-600 hover:text-prim hover:bg-gray-50 font-medium">About Us</Link>
                <Link href="/UI-components/Pages/Faqs" className="block px-5 py-2 text-sm text-gray-600 hover:text-prim hover:bg-gray-50 font-medium">FAQ's</Link>
                <Link href="/UI-components/Pages/Contact" className="block px-5 py-2 text-sm text-gray-600 hover:text-prim hover:bg-gray-50 font-medium">Contact Us</Link>
                <Link href="/UI-components/Pages/PageNotFound" className="block px-5 py-2 text-sm text-gray-600 hover:text-prim hover:bg-gray-50 font-medium">404 Page</Link>
              </div>
            </li>

            <li>
              <Link href="/UI-components/Pages/Contact" className="text-[15px] font-semibold text-white transition-colors duration-300 uppercase tracking-wide">
                Contact
              </Link>
            </li>
          </ul>
        </nav>



        <div className="flex lg:gap-1 xl:gap-3 flex-shrink-0">
          <Link href="/UI-components/Pages/Shop" className="bg-secondary text-black lg:px-2 xl:px-4 py-2 rounded-md flex items-center cursor-pointer whitespace-nowrap text-sm">
            <Icon
              icon="material-symbols:bookmark-outline-rounded"
              width="20"
              height="20"
            />
            <span className="hidden xl:block ml-1">Deals Today</span>
            <span className="xl:hidden ml-1">Deals</span>
          </Link>
          <Link href="/UI-components/Pages/Shop" className="bg-white text-black lg:px-2 xl:px-4 py-2 rounded-md flex items-center cursor-pointer whitespace-nowrap text-sm">
            <Icon
              icon="ic:outline-local-offer"
              width="20"
              height="20"
              className="me-1"
            />
            <span className="hidden xl:block">Special Price</span>
            <span className="xl:hidden">Special</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbottom
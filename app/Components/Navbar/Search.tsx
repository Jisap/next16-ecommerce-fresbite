"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"

const Search = () => {
  const [category, setCategory] = useState("All Categories")
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    "All Categories",
    "Milk and Dairy",
    "Vegetables",
    "Fruits",
    "Meat and Fish",
    "Snacks",
    "Beverages"
  ]

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center w-full bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm focus-within:border-prim focus-within:ring-1 focus-within:ring-prim/20 transition-all duration-300"
      >
        {/* Category Dropdown */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer min-w-[150px] justify-between"
          >
            {category}
            <Icon 
              icon="solar:alt-arrow-down-outline" 
              width="16" 
              height="16" 
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl z-50 py-1 rounded-b-md animate-fadeIn">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat)
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-prim transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex-1 flex items-center px-3">
          <Icon icon="iconamoon:search-thin" width="20" height="20" className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-prim text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors duration-300 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
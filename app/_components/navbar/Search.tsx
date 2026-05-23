"use client"

import { Icon } from "@iconify/react"
import React, { useState, useEffect, useRef } from "react"

export interface SearchProps {
  onQueryChange?: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onQueryChange }) => {
  const [category, setCategory] = useState("All Categories")
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)

  const categories = [
    "All Categories",
    "Milk and Dairy",
    "Vegetables",
    "Fruits",
    "Meat and Fish",
    "Snacks",
    "Beverages"
  ]

  // Se notifica al padre directamente en el onChange del input (ver más abajo)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex-1 max-w-2xl lg:mx-4" ref={searchRef}>
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full bg-white border border-gray-200 rounded-md shadow-sm focus-within:border-prim focus-within:ring-1 focus-within:ring-prim/20 transition-all duration-300 relative"
      >
        {/* Category Dropdown */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer min-w-[150px] justify-between rounded-l-md"
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
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl z-[100] py-1 rounded-b-md animate-fadeIn">
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)                         // Actualiza el estado local del search 
              if (onQueryChange) onQueryChange(e.target.value) // Pasa el valor al componente padre
            }}
            placeholder="Search for products..."
            className="w-full px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => { setQuery(""); if (onQueryChange) onQueryChange(""); }} className="text-gray-400 hover:text-prim transition-colors cursor-pointer p-1">
              <Icon icon="material-symbols:close-rounded" width="18" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-prim text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors duration-300 cursor-pointer rounded-r-md"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search

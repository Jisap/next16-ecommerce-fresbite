"use client"

import Image from "next/image"
import sectionbanner from "@/public/section-banner.png"
import shopBanner from "@/public/organic-categories-banner.webp"
import shopsideBanner from "@/public/Shop-sale-banner.webp"
import Link from "next/link"
import productsData from "@/app/JsonData/OrganicProducts.json"
import { Icon } from "@iconify/react"
import toast, { Toaster } from "react-hot-toast"
import { Product, useCart } from "@/app/hooks/useCart"
import { useState, useEffect } from "react"
import ProductCard from "../Index/TopSelling/ProductCard"
import ProductModal from "../Index/TopSelling/ProductModal"

type SortType = 
  | "featured"
  | "best-selling"
  | "az"
  | "za"
  | "price-high"
  | "price-low"

const Shop = () => {

  // --- CARRO Y LISTA DE DESEOS ---
  const {
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist,
    getPriceNumber,
    cartSubtotal
  } = useCart();

  // --- ESTADOS DE FILTRADO ---
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortedData, setSortedData] = useState<Product[]>(productsData);
  const [sortType, setSortType] = useState<SortType>("featured");

  // --- ESTADOS REQUERIDOS POR PRODUCTCARD ---
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"];

  // --- ESTADOS DEL MODAL DE VISTA RÁPIDA ---
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("1 kg");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  // Precios simulados por tamaño en el modal
  const priceBySize: Record<string, string> = {
    "1 kg": selectedProduct?.price || "0",
    "2 kg": "3800",
    "3 kg": "4400",
    "4 kg": "5500",
    "5 kg": "6200",
  };

  // Sincronizar la imagen principal del modal al seleccionar un producto
  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image1);
      setSelectedSize("1 kg");
    }
  }, [selectedProduct]);

  // Sincronizar el peso activo de las tarjetas de producto con el filtro de tamaño seleccionado
  useEffect(() => {
    if (sizeFilter.length > 0) {
      const activeSize = sizeFilter[0]; // Usar el primer tamaño seleccionado en el filtro
      const updatedWeights: Record<string, string> = {};
      productsData.forEach(product => {
        updatedWeights[product.id] = activeSize;
      });
      setSelectedWeight(updatedWeights);
    } else {
      setSelectedWeight({});
    }
  }, [sizeFilter]);

  // --- LÓGICA DE FILTRADO DINÁMICA ---
  const filteredProducts = sortedData?.filter(product => {
    // 1. Disponibilidad (Stock): marcamos como agotado de manera realista (p. ej., IDs divisibles por 5)
    const productIdNum = parseInt(product.id.replace(/\D/g, "")) || 1;
    const inStock = productIdNum % 5 !== 0;
    
    const availabilityMatch = 
      availabilityFilter.length === 0 ||
      (availabilityFilter.includes("in") && inStock) || 
      (availabilityFilter.includes("out") && !inStock);
    
    // 2. Filtro por Categorías usando expresiones regulares en el título
    const categoryMatch = !categoryFilter || (
      categoryFilter === "dairy" && /egg|toffu|dairy|cheese|milk|butter/i.test(product.title) ||
      categoryFilter === "fruits" && /fruit|veg|banana|apple|tomato|potato|onion|organic/i.test(product.title) ||
      categoryFilter === "bakery" && /bread|bun|cookie|chip|snack/i.test(product.title)
    );

    // 3. Filtro por Rango de Precios
    const productPriceVal = getPriceNumber(product.price);
    const priceMatch = productPriceVal <= maxPrice;
    
    // 4. Filtro por Peso/Tamaño (Todos los productos del catálogo soportan los pesos disponibles)
    const sizeMatch = 
      sizeFilter.length === 0 || sizeFilter.some(size => weights.includes(size));

    return availabilityMatch && categoryMatch && priceMatch && sizeMatch;
  });

  // --- LÓGICA DE ORDENACIÓN ---
  const handleSort = (type: SortType) => {
    setSortType(type);

    let sorted = [...productsData];

    switch(type) {
      case "featured":
        sorted = [...productsData];
        break;
      case "best-selling":
        // Ordenar por review (estrellas) de mayor a menor
        sorted.sort((a, b) => parseFloat(b.review || "0") - parseFloat(a.review || "0"));
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-high":
        sorted.sort(
          (a, b) => getPriceNumber(b.price) - getPriceNumber(a.price)
        );
        break;
      case "price-low":
        sorted.sort(
          (a, b) => getPriceNumber(a.price) - getPriceNumber(b.price)
        );
        break;
    }

    setSortedData(sorted);
  }

  // --- EVENTOS DE FILTROS ---
  const toggleAvailabilityFilter = (val: string) => {
    setAvailabilityFilter(prev => 
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const toggleSizeFilter = (val: string) => {
    setSizeFilter(prev => 
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const clearFilters = () => {
    setAvailabilityFilter([]);
    setSizeFilter([]);
    setCategoryFilter("");
    setMaxPrice(5000);
    setSortedData(productsData);
    setSortType("featured");
  };

  return (
    <>
      {/* Banner Principal */}
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionbanner}
          alt="Section Banner"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <div className="content z-10 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="text-gray-500 font-bold">•</li>
            <li className="uppercase text-xs font-unbounded text-prim font-semibold">
              <Link href="/UI-components/Pages/Shop">Shop</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm">
            Shop Best Products
          </h2>
        </div>
      </div>

      {/* Grid de Contenido Principal: Sidebar + Listado */}
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* COLUMNA 1: Sidebar de Filtros (Ancho fijo en desktop para liberar espacio) */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6 h-fit">
          
          {/* Filtro por Categorías */}
          <div className="bg-white rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Categories</span>
              <Icon icon="solar:folder-with-files-bold" className="text-prim" width="18" />
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { id: "", label: "All Categories" },
                { id: "dairy", label: "Dairy, Bread & Eggs" },
                { id: "fruits", label: "Fruits & Veggies" },
                { id: "bakery", label: "Bakery & Snacks" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`text-left px-3 py-2 rounded-lg text-[15px] transition-all duration-300 flex items-center justify-between ${
                    categoryFilter === cat.id 
                      ? "bg-prim text-white font-semibold" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <span>{cat.label}</span>
                  {categoryFilter === cat.id && <Icon icon="solar:check-circle-bold" width="16" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Disponibilidad (Stock) */}
          <div className="bg-white rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Availability</span>
              <Icon icon="solar:checklist-minimalistic-bold" className="text-prim" width="18" />
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group text-[15px] text-gray-600 hover:text-black">
                <input 
                  type="checkbox"
                  checked={availabilityFilter.includes("in")}
                  onChange={() => toggleAvailabilityFilter("in")}
                  className="w-4 h-4 rounded border-gray-300 text-prim focus:ring-prim accent-prim cursor-pointer"
                />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">In Stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group text-[15px] text-gray-600 hover:text-black">
                <input 
                  type="checkbox"
                  checked={availabilityFilter.includes("out")}
                  onChange={() => toggleAvailabilityFilter("out")}
                  className="w-4 h-4 rounded border-gray-300 text-prim focus:ring-prim accent-prim cursor-pointer"
                />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Out of Stock</span>
              </label>
            </div>
          </div>

          {/* Filtro por Rango de Precios */}
          <div className="bg-white rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Filter by Price</span>
              <Icon icon="solar:double-alt-arrow-right-bold" className="text-prim" width="16" />
            </h3>
            <div className="flex flex-col gap-2">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-prim"
              />
              <div className="flex justify-between items-center text-sm font-semibold text-gray-600 mt-2">
                <span>Min: Rs. 0</span>
                <span className="text-prim bg-prim/10 px-2 py-1 rounded">Max: Rs. {maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Filtro por Tamaño/Peso */}
          <div className="bg-white rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Size / Weight</span>
              <Icon icon="solar:scale-bold" className="text-prim" width="18" />
            </h3>
            <div className="flex flex-col gap-3">
              {["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"].map(size => (
                <label key={size} className="flex items-center gap-3 cursor-pointer group text-[15px] text-gray-600 hover:text-black">
                  <input 
                    type="checkbox"
                    checked={sizeFilter.includes(size)}
                    onChange={() => toggleSizeFilter(size)}
                    className="w-4 h-4 rounded border-gray-300 text-prim focus:ring-prim accent-prim cursor-pointer"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Banner de Oferta de la Barra Lateral */}
          <div className="hidden lg:block mt-2 rounded-xl overflow-hidden shadow-md group relative">
            <Image 
              src={shopsideBanner}
              alt="Promo Sale Banner"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

        </aside>

        {/* COLUMNA 2: Listado y Ordenación de Productos */}
        <main className="flex-1 w-full flex flex-col gap-6">
          
          {/* Header del Listado */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-xl p-5 border border-gray-100 shadow-[0_0_15px_rgba(0,0,0,0.02)] gap-4">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-gray-800 text-lg tracking-wide">
                Products Found ({filteredProducts.length})
              </h2>
              {(availabilityFilter.length > 0 || sizeFilter.length > 0 || categoryFilter || maxPrice < 5000) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 transition"
                >
                  <Icon icon="solar:trash-bin-trash-bold" width="16" />
                  Clear All
                </button>
              )}
            </div>

            {/* Selector de Ordenación */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-semibold text-gray-500 text-sm whitespace-nowrap">Sort By:</span>
              <select
                value={sortType}
                onChange={(e) => handleSort(e.target.value as SortType)}
                className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm bg-white focus:outline-none focus:border-prim font-medium w-full sm:w-auto cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="az">Alphabet (A - Z)</option>
                <option value="za">Alphabet (Z - A)</option>
                <option value="price-high">Price (High → Low)</option>
                <option value="price-low">Price (Low → High)</option>
              </select>
            </div>
          </div>

          {/* Banner Horizontal Superior */}
          <div className="shop-banner rounded-xl overflow-hidden shadow-sm relative h-48 md:h-64 lg:h-72">
            <Image 
              src={shopBanner}
              alt="shopbanner"
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Grid de Tarjetas de Productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full flex justify-center">
                  <ProductCard
                    product={product}
                    openId={openId}
                    setOpenId={setOpenId}
                    selectedWeight={selectedWeight}
                    setSelectedWeight={setSelectedWeight}
                    weights={weights}
                    qty={qty}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                    setSelectedProduct={setSelectedProduct}
                    setOpenModal={setOpenModal}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Estado Vacío (Sin productos) */
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-xl">
              <Icon icon="solar:box-broken" className="text-gray-300 mb-4" width="60" />
              <p className="text-gray-500 font-medium text-lg">No products found matching your filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 bg-prim text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Modal de Vista Rápida Integrado */}
      <ProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedProduct={selectedProduct}
        mainImage={mainImage}
        setMainImage={setMainImage}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        priceBySize={priceBySize}
        qty={qty}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
        openIndex={openIndex}
        toggle={toggle}
      />

      <Toaster position="top-right" />
    </>
  )
}

export default Shop
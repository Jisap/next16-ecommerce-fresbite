"use client"

import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"

export interface Product {
  id: string;
  title: string;
  price: string;
  lessprice?: string;
  image1: string;
  image2: string;
  [key: string]: any;
}

export interface CartProduct extends Product {
  weight: string;
  qty: number;
  priceNumber: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartProduct[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [qty, setQty] = useState<Record<string, number>>({})

  // Función para cargar datos (memorizada para evitar bucles) solo se ejecuta una vez.
  const loadData = useCallback(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setCart(storedCart)
    setWishlist(storedWishlist)
  }, [])

  // Cargar datos iniciales y escuchar cambios de otros componentes
  useEffect(() => {
    loadData()

    // Escuchar eventos personalizados para sincronizar múltiples instancias del hook
    window.addEventListener("cart-updated", loadData)
    window.addEventListener("wishlist-updated", loadData)

    // Escuchar cambios de otras pestañas (opcional pero profesional)
    window.addEventListener("storage", loadData)

    return () => {
      window.removeEventListener("cart-updated", loadData)
      window.removeEventListener("wishlist-updated", loadData)
      window.removeEventListener("storage", loadData)
    }
  }, [loadData]);

  // btn -> Event -> navegador lo detecta -> loadData se ejecuta -> actualiza estado.

  const getPriceNumber = (price?: string) => {
    if (!price) return 0
    const cleaned = price.replace(/,/g, "").replace(/Rs\.?/g, "").trim()
    const value = parseFloat(cleaned)
    return isNaN(value) ? 0 : value
  }

  const increaseQty = (id: string) => {
    setQty((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }))
  }

  const decreaseQty = (id: string) => {
    setQty((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }))
  }

  const addToCart = (product: Product, selectedWeight: string = "1 kg") => {
    const stored: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")

    if (stored.some((item) => item.id === product.id && item.weight === selectedWeight)) {
      toast("Already in Cart 🛒")
      return
    }

    const basePrice = getPriceNumber(product.price)
    const weights = ["1 kg", "2 kg", "3 kg", "4 kg", "5 kg"]
    const multiplier = weights.indexOf(selectedWeight) + 1 // Ajustado el multiplicador

    const updated = [...stored, {
      ...product,
      weight: selectedWeight,
      qty: qty[product.id] || 1,
      priceNumber: basePrice * (multiplier > 0 ? multiplier : 1)
    }]

    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cart-updated"))
    window.dispatchEvent(new Event("cart-open"))
    toast.success(`${product.title} added to cart 🛒`)
  }

  const toggleWishlist = (product: Product) => {
    const currentWishlist: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const isIncluded = currentWishlist.includes(product.id)

    const updated = isIncluded
      ? currentWishlist.filter(id => id !== product.id)
      : [...currentWishlist, product.id]

    localStorage.setItem("wishlist", JSON.stringify(updated))
    window.dispatchEvent(new Event("wishlist-updated"))
    toast.success(isIncluded ? "Removed from wishlist" : "Added to wishlist")
  }

  return {
    cart,
    wishlist,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    toggleWishlist,
    getPriceNumber
  }
}

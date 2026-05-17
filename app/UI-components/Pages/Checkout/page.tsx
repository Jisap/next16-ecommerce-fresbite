"use client"

import { useCart } from "@/app/hooks/useCart"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type CartItem = {
  id: string;
  title: string;
  image: string;
  weight: string;
  qty: number;
  priceNumber: number;
}

const Checkout = () => {

  const [deliveryOption, setDeliveryOption] = useState<"ship" | "pickup">("ship");

  // Usamos todo lo que nos da el hook en lugar de crear variables locales redundantes
  const {
    cart,
    removeFromCart,
    cartSubtotal,
    updateCartItemQty
  } = useCart();

  // El subtotal ya viene del hook, así que solo calculamos los impuestos extra
  const estimatedTax = +(cartSubtotal * 0.1).toFixed(2);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("input[required], select[required]");
    let allFilled = true;

    inputs.forEach((input) => {
      if (!(input as HTMLInputElement).value.trim()) {
        allFilled = false;
        input.classList.add("border-red-500");
        input.classList.remove("border-gray-300");
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");
      }
    });

    if (!allFilled) {
      toast.error("Please fill all the required fields");
      return;
    }

    // Vaciar carrito al comprar
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
    toast.success("Order placed successfully");
    setTimeout(() => (window.location.href = "/"), 2000);
  }


  return (
    <></>
  )
}

export default Checkout
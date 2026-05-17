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
    <>
      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16 relative">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-4">
            <h5 className="text-2xl font-semibold mb-2">
              Contact
            </h5>

            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Email or Mobile Phone number"
              required
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="newsCheck"
                className="w-4 h-4"
                required
              />

              <label htmlFor="newsCheck">Email me with news and offers</label>
            </div>

            <h5 className="text-2xl font-semibold mb-2">Delivery</h5>

            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={deliveryOption === "ship"}
                  onChange={() => setDeliveryOption("ship")}
                  name="deliveryoption"
                  className="w-4 h-4"
                />
                Ship
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={deliveryOption === "pickup"}
                  name="deliveryoption"
                  onChange={() => setDeliveryOption("pickup")}
                  className="w-4 h-4"
                />
                Pickup
              </label>
            </div>

            {deliveryOption === "ship" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <select className="border border-gray-300 rounded p-2 md:col-span-2" required>
                  <option>Vietnam</option>
                  <option>France</option>
                  <option>United States</option>
                </select>

                <input
                  type="text"
                  className="border border-gray-300 rounded p-2"
                  placeholder="First name (optional)"
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2"
                  placeholder="Last name"
                />
              </div>
            )}

            {deliveryOption === "pickup" && (
              <div className="bg-red-50 text-red-700 border border-red-300 rounded p-3 mb-3">
                <strong>No Stores Available with your item</strong>
                <div>
                  <Link href="#" className="underline">
                    Ship to address
                  </Link>{" "}
                </div>
              </div>
            )}

            <input
              type="text"
              className="border border-gray-300 rounded-2xl w-full p-2 mb-3"
              placeholder="Address"
              required
            />

            <input
              type="text"
              className="border border-gray-300 rounded-2xl w-full p-2 mb-3"
              placeholder="Apartment, suite, etc"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded-2xl w-full p-2 mb-3"
                required
              />
              <input
                type="text"
                placeholder="Postal code"
                className="border border-gray-300 rounded-2xl w-full p-2 mb-3"
                required
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="saveInfo"
                className="w-4 h-4"
              />

              <label htmlFor="saveInfo">Save this information for next time</label>
            </div>

            <h5 className="text-2xl font-semibold mb-2">Shipping Method</h5>

            <div className="flex justify-between items-center border bg-blue-50 text-gray-600 rounded p-3 mb-3">
              <span>Standard</span>
              <span>FREE</span>
            </div>

            <h4 className="text-2xl font-semibold mt-5 mb-2">Payment</h4>
            <p className="text-gray-500 mb-3">All transactions are secure and encrypted</p>

            <div className="border border-gray-200 rounded p-3 mb-3 space-y-2">
              <input
                type="text"
                placeholder="Card number"
                className="border border-gray-300 rounded w-full p-2"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Expiration date (MM / YY)"
                  required
                  className="border border-gray-300 rounded w-full p-2"
                />
                <input
                  type="text"
                  placeholder="Security code"
                  required
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>

              <input
                type="text"
                placeholder="Name on card"
                required
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>

            <button
              type="submit"
              onClick={handlePlaceOrder}
              className="w-full py-2 bg-prim cursor-pointer text-white rounded-2xl hover:bg-black duration-300 transition-colors"
            >
              Pay Now
            </button>
          </div>

          {/* Right order summary */}
          <div className="">

          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
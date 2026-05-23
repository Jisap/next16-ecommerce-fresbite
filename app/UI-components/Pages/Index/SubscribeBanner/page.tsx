"use client"

import subscribebanner from "@/public/freshbite-news-bg.webp"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { EntranceAnimation } from "@/app/Animations"

const SubscribeBanner = () => {
  return (
    <div className="px-2 lg:px-8 xl:px-12 pt-8 sm:pt-10">
      <div className="subscribe-banner relative py-18 px-8">
        <Image
          src={subscribebanner}
          alt="subscribebanner"
          className="w-full h-full absolute top-0 left-0 object-cover"
        />

        {/* Los 3 elementos del contenido entran en stagger vertical */}
        <EntranceAnimation
          type="stagger"
          selector=".subscribe-item"
          stagger={0.18}
          duration={0.7}
          ease="power3.out"
          scrollTrigger
          scrollStart="top 88%"
          className="subscribe-content z-10 relative w-full text-center"
        >
          <span className="subscribe-item inline-block text-white text-sm md:text-xl bg-black p-1.5 rounded-sm">
            Subscribe to our newsletter
          </span>

          <h2 className="subscribe-item text-2xl md:text-3xl font-medium text-white mt-4 mb-3">
            Get 20% of discount coupon
          </h2>

          <form className="subscribe-item flex items-center max-w-xl mx-auto bg-black rounded-sm overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white w-full py-4 px-4 outline-none"
            />
            <button
              type="submit"
              className="cursor-pointer w-fit bg-white text-black flex items-center py-4 px-4 border-l border-gray-200"
            >
              <Icon icon="material-symbols:bookmark-outline-rounded" width="24" height="24" />
              Subscribe
            </button>
          </form>
        </EntranceAnimation>

      </div>
    </div>
  )
}

export default SubscribeBanner
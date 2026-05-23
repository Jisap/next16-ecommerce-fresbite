"use client"

import banneroffer1 from "@/public/banneroffers-01.webp"
import banneroffer2 from "@/public/banneroffers-02.webp"
import banneroffer3 from "@/public/banneroffers-03.webp"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { EntranceAnimation } from "@/app/Animations" // ajusta el path

const BannerOffers = () => {
  return (
    <EntranceAnimation
      type="stagger"
      selector=".offer-banner"
      stagger={0.15}
      duration={0.75}
      ease="power3.out"
      scrollTrigger
      scrollStart="top 88%"
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-2 xl:px-12 relative py-8 sm:py-16"
    >
      {[
        { image: banneroffer1, offer: "Get 29% off", title: "Seafood calamari" },
        { image: banneroffer2, offer: "Get 49% off", title: "Freshly baked bread toast" },
        { image: banneroffer3, offer: "Get 49% off", title: "Fruit and vegetables" },
      ].map((banner, index) => (
        <div key={index} className="offer-banner relative w-full h-75 rounded-sm overflow-hidden">
          <Image
            src={banner.image}
            alt={`banneroffer${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full pt-16 pl-10">
            <span className="text-white underline uppercase font-medium">
              {banner.offer}
            </span>

            <h3 className="text-4xl text-white max-w-75">
              {banner.title}
            </h3>

            <Link
              href="/UI-componentes/Pages/Shop"
              className="bg-yellow-300 px-4 w-fit flex items-center py-2 mt-8 rounded-sm cursor-pointer hover:bg-black hover:text-white duration-300 transition-colors"
            >
              Shop Now
              <Icon
                icon="formkit:arrowright"
                width="16"
                height="16"
                className="ms-2"
              />
            </Link>
          </div>
        </div>
      ))}
    </EntranceAnimation>
  )
}

export default BannerOffers
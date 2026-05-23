"use client"

import orderbanner1 from "@/public/order-image01.webp"
import orderbanner2 from "@/public/order-image02.webp"
import Image from "next/image"
import { EntranceAnimation } from "@/app/Animations"

const Order = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-2 lg:px-8 xl:px-12 py-8 sm:py-16 gap-5 lg:gap-8">

      <EntranceAnimation
        type="fadeRight"
        duration={0.8}
        ease="power3.out"
        scrollTrigger
        scrollStart="top 88%"
        className="order-banner"
      >
        <Image src={orderbanner1} alt="orderbanner1" className="w-full h-full" />
      </EntranceAnimation>

      <EntranceAnimation
        type="fadeLeft"
        duration={0.8}
        delay={0.1}
        ease="power3.out"
        scrollTrigger
        scrollStart="top 88%"
      >
        <Image src={orderbanner2} alt="orderbanner2" />
      </EntranceAnimation>

    </div>
  )
}

export default Order
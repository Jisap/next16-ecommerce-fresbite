"use client"

import Image from "next/image"
import service1 from "@/public/freshbite-service1.webp"
import service2 from "@/public/freshbite-service2.webp"
import service3 from "@/public/freshbite-service3.webp"
import { EntranceAnimation } from "@/app/Animations"

const Services = () => {
  return (
    <div className="px-2 lg:px-8 xl:px-12 relative py-8">
      <EntranceAnimation
        type="stagger"
        selector=".service-item"
        stagger={0.18}
        duration={0.7}
        ease="power2.out"
        scrollTrigger
        scrollStart="top 88%"
        className="bg-gray-light p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 rounded-sm"
      >
        <div className="service-item flex items-center flex-col sm:flex-row gap-8">
          <div className="service-image h-30 w-34">
            <Image src={service1} alt="service1" className="w-full h-full object-contain" />
          </div>

          <div className="service-content sm:text-start text-center">
            <span className="shadow-2xl bg-white rounded-2xl p-2 w-8 h-8">01</span>

            <h4 className="text-xl font-medium pt-3">Best quality</h4>

            <p className="text-gray-600 max-w-55">Not only fast for us quality is also number one</p>
          </div>
        </div>

        <div className="service-item flex items-center flex-col sm:flex-row gap-8">
          <div className="service-image h-30 w-34">
            <Image src={service2} alt="service2" className="w-full h-full object-contain" />
          </div>

          <div className="service-content sm:text-start text-center">
            <span className="shadow-2xl bg-white rounded-2xl p-2 w-8 h-8">02</span>

            <h4 className="text-xl font-medium pt-3">Easy to order</h4>

            <p className="text-gray-600 max-w-55">You only need a few steps in ordering food</p>
          </div>
        </div>

        <div className="service-item flex items-center flex-col sm:flex-row gap-8">
          <div className="service-image h-30 w-34">
            <Image src={service3} alt="service3" className="w-full h-full object-contain" />
          </div>

          <div className="service-content sm:text-start text-center">
            <span className="shadow-2xl bg-white rounded-2xl p-2 w-8 h-8">03</span>

            <h4 className="text-xl font-medium pt-3">Faster delivery</h4>

            <p className="text-gray-600 max-w-55">Delivery that is always on time even faster</p>
          </div>
        </div>
      </EntranceAnimation>
    </div>
  )
}

export default Services
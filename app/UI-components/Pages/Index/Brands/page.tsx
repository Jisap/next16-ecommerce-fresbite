"use client"

import Image from "next/image"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import brand1 from "@/public/freshbite-br-1.webp"
import brand2 from "@/public/freshbite-br-2.webp"
import brand3 from "@/public/freshbite-br-3.webp"
import brand4 from "@/public/freshbite-br-4.webp"
import brand5 from "@/public/freshbite-br-5.webp"
import brand6 from "@/public/freshbite-br-6.webp"



const Brands = () => {

  const brands = [brand1, brand2, brand3, brand4, brand5, brand6]

  return (
    <div className="w-full bg-white border-t border-b border-gray-100 py-12">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          loop={true}
          spaceBetween={40}
          slidesPerView={6}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-20 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <Image
                  src={brand}
                  alt={`brand-${index + 1}`}
                  className="max-h-12 w-auto object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Brands
"use client"

import slidebanner1 from "@/public/freshbite-slidebanner1.png"
import slidebanner2 from "@/public/freshbite-slidebanner2.png"
import slidebanner3 from "@/public/freshbite-slidebanner3.png"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import b from "@/public/freshbite-banner1.png"



const Hero = () => {

  const slides = [
    {
      img: slidebanner1,
      title: "Organic Seeds",
      subtitle: "100% organic products",

    },
    {
      img: slidebanner2,
      title: "Fresh Fruit",
      subtitle: "Healthy & Natural",
    },
    {
      img: slidebanner3,
      title: "Organic Vegetables",
      subtitle: "Direct from farms",
    }
  ];

  return (
    <>
      <div className="hero px-2 lg:px-8 xl:px-12 py-[1%] flex justify-between items-stretch lg:flex-row flex-col gap-3 lg:gap-6 w-full h-200 lg:h-125 xl:h-150 xxl:h-175">
        <div className="w-full lg:w-[30%] bg-[url('/freshbite-banner1.png')] bg-cover bg-center flex justify-center items-start h-full rounded-lg relative overflow-hidden">
          <div className="content h-full pt-20 z-1">
            <h3 className="text-white text-4xl font-medium mb-3 text-center">
              Bakery <br /> Products
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
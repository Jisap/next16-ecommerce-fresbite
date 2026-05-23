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
import { EntranceAnimation } from "@/app/Animations"

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
        {/* Banner Izquierdo - Bakery Products */}
        <EntranceAnimation type="fadeRight" duration={1} delay={0.1} className="w-full lg:w-[30%] h-full" scrollTrigger={false}>
          <div className="w-full h-full bg-[url('/freshbite-banner1.png')] bg-cover bg-center flex justify-center items-start rounded-lg relative overflow-hidden">
            <div className="content h-full pt-20 z-1">
              <h3 className="text-white text-4xl font-medium mb-3 text-center">
                Bakery <br /> Products
              </h3>

              <Link href="/shop" className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase h-fit mx-auto">
                Shop Now
                <Icon icon="lucide:shopping-bag" width="18" height="18" className="ms-1" />
              </Link>
            </div>

            <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
          </div>
        </EntranceAnimation>

        {/* Banner Central - Swiper Slider */}
        <EntranceAnimation type="scaleIn" duration={1} className="w-full lg:w-[40%] h-full" scrollTrigger={false}>
          <div className="w-full h-full relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              pagination={{ clickable: true }}
              className="h-full w-full relative"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-full rounded-md bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${slide.img.src})` }}
                  >
                    <div className="pt-20 text-center">
                      <span className="underline text-sm xl:text-xl uppercase font-bold block mb-2">
                        {slide.title}
                      </span>

                      <h3 className="text-black text-3xl xl:text-5xl font-bold mb-4">
                        {slide.title.split(" ")[0]} {slide.title.split(" ")[1]}
                      </h3>

                      <Link
                        href="/UI-Componentes/Pages/Shop"
                        className="bg-white hover:bg-black hover:text-white transition-all duration-300 px-4 py-2 mt-2 rounded-md 
                        inline-flex items-center font-bold uppercase"
                      >
                        Shop Now
                        <Icon icon="lucide:shopping-bag" width="18" height="18" className="ms-1" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </EntranceAnimation>

        {/* Banner Derecho - Fresh Vegetables */}
        <EntranceAnimation type="fadeLeft" duration={1} delay={0.2} className="w-full lg:w-[30%] h-full" scrollTrigger={false}>
          <div className="w-full h-full bg-[url('/freshbite-banner2.png')] bg-cover bg-center flex justify-center items-start rounded-lg relative overflow-hidden">
            <div className="content h-full pt-20 z-1">
              <h3 className="text-white text-4xl font-medium mb-3 text-center">
                Fresh <br /> Vegetables
              </h3>

              <Link href="/shop" className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase h-fit mx-auto">
                Shop Now
                <Icon icon="lucide:shopping-bag" width="18" height="18" className="ms-1" />
              </Link>
            </div>

            <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
          </div>
        </EntranceAnimation>
      </div>
    </>
  )
}

export default Hero
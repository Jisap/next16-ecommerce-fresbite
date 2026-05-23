"use client"

import Image from "next/image"
import { StaticImageData } from "next/image"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import Category1 from "@/public/freshbite-cat1.png"
import Category2 from "@/public/freshbite-cat2.png"
import Category3 from "@/public/freshbite-cat3.png"
import Category4 from "@/public/freshbite-cat4.png"
import Category5 from "@/public/freshbite-cat5.png"
import Category6 from "@/public/freshbite-cat6.png"
import Category7 from "@/public/freshbite-cat7.png"
import Category8 from "@/public/freshbite-cat8.png"
import titleicon from "@/public/freshbite-title-icon1.png"

type CategoryType = {
  image: StaticImageData;
  title: string;
}

const categories: CategoryType[] = [
  { image: Category1, title: "Vegitable and fruits" },
  { image: Category2, title: "Milk and dairy products" },
  { image: Category3, title: "Breakfast and cereals" },
  { image: Category4, title: "Animal biscuits and products" },
  { image: Category5, title: "Bread, toast and biscuits" },
  { image: Category6, title: "Chicken, meat and fish" },
  { image: Category7, title: "Vitamins and minerals" },
  { image: Category8, title: "Ice cream and cold drink" },
];


import { EntranceAnimation } from "@/app/Animations"

const Category = () => {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
        {/* Título de la sección animado */}
        <EntranceAnimation type="fadeUp" scrollTrigger={true} duration={0.8}>
          <div className="section-title flex flex-wrap pb-10 md:ps-5 gap-3">
            <h2 className="text-3xl md:text-5xl font-bold">
              Featured categories
            </h2>

            <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
              <Image
                src={titleicon} alt="titleicon"
              />
              Eating healthy starts at the grocery store.
            </p>
          </div>
        </EntranceAnimation>

        {/* Carrusel de categorías escalonado */}
        <EntranceAnimation type="stagger" selector=".category-wrap" scrollTrigger={true} duration={0.8} stagger={0.1} delay={0.1}>
          <Swiper
            slidesPerView={7}
            spaceBetween={30}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
            }}
            speed={1500}
            breakpoints={{
              1600: { slidesPerView: 7 },
              1400: { slidesPerView: 6 },
              1200: { slidesPerView: 5 },
              1000: { slidesPerView: 4.5 },
              768: { slidesPerView: 3.5 },
            }}
          >
            {[...categories, ...categories].map((category, index) => (
              <SwiperSlide key={index}>
                <div className="category-wrap flex flex-col justify-center items-center cursor-pointer bg-gray-light rounded-md group h-62.5 px-4">
                  <div className="category-image bg-white shadow-md w-30 h-30 flex justify-center items-center rounded-full mb-2">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={56}
                      height={56}
                      className="transition-all duration-300"
                    />
                  </div>

                  <div className="category-info my-2 flex flex-col justify-center items-center">
                    <span className="text-xl text-center group-hover:text-prim transition-all duration-300 font-medium capitalize">
                      {category.title}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </EntranceAnimation>
      </div>
    </>
  )
}

export default Category
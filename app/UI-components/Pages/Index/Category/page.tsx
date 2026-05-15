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


const Category = () => {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
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
      </div>
    </>
  )
}

export default Category
"use client"

import Image from "next/image"
import tst1 from "@/public/tst-img-01.webp"
import tst2 from "@/public/tst-img-02.webp"
import tst3 from "@/public/tst-img-03.webp"
import tst4 from "@/public/tst-img-04.jpg"
import { Icon } from "@iconify/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import titleicon from "@/public/freshbite-title-icon3.webp"

const testimonials = [
  {
    img: tst1,
    name: "Rosemary Dois",
    role: "Organic Farmer",
    text: "Life is like waiting in line at the grocery store. You wait, you slowly move forward then you exit unsatisfied and broke."
  },
  {
    img: tst2,
    name: "Kevin Smith",
    role: "Grocery store",
    text: "I’ve been shopping at freshbite for years and I can honestly say it’s been a game changer for my family and I. "
  },
  {
    img: tst3,
    name: "David Smith",
    role: "Organic Farmer",
    text: "Life is like waiting in line at the grocery store. You wait, you slowly move forward then you exit unsatisfied and broke."
  },
  {
    img: tst4,
    name: "Emma Smith",
    role: "Grocery store",
    text: "I’ve been shopping at freshbite for years and I can honestly say it’s been a game changer for my family and I."
  }
]

const Testimonials = () => {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
        <div className="section-title flex flex-wrap pb-10 md:ps-5 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold">What Our Customers Says</h2>
          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image src={titleicon} alt="titleicon" />
            People say a lot. So, I watch what they do.
          </p>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          breakpoints={{
            1000: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }}
          className="tst-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide>
              <div className="testimonials-item h-75 bg-white shadow-md rounded-md p-5 sm:p-10 border border-gray-100">
                <div className="tst-top flex items-center gap-4 pb-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-18 h-18 rounded-full"
                  />

                  <div>
                    <h6 className="text-xl font-semibold">{item.name}</h6>
                    <span className="text-gray-500">{item.role}</span>
                  </div>
                </div>

                <p className="text-lg text-gray-500 pb-4">
                  {item.text}
                </p>

                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default Testimonials
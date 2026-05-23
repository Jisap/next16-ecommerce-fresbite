"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import sectionbanner from "@/public/section-banner.png"
import ArticlesData from "@/app/JsonData/BlogsData.json"
import { useParams } from 'next/navigation'
import gallery1 from "@/public/blog-det-gallery1.avif"
import gallery2 from "@/public/blog-det-gallery2.webp"
import gallery3 from "@/public/blog-det-gallery3.avif"
import gallery4 from "@/public/blog-det-gallery4.avif"
import gallery5 from "@/public/blog-det-gallery5.avif"
import gallery6 from "@/public/blog-det-gallery6.avif"
import articlesDes1 from "@/public/artical-des1.jpg"
import articlesDes2 from "@/public/artical-des2.webp"
import { EntranceAnimation } from "@/app/Animations"

const BlogDetails = () => {

  const CategoriesData = [
    "Babystore", "Bag", "Cosmetic", "Decorate",
    "Electronic", "Fashion", "Furniture"
  ]

  const TagsData = ["Fruit", "Grocery", "Vegetable", "Dried Fruit"]

  const GalleryData = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]

  const { id } = useParams()
  const blog = ArticlesData.find((item) => item.id === Number(id))

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-6xl font-thin tracking-widest text-gray-200">404</p>

        <h2 className="text-2xl font-light text-gray-400 tracking-wide">Article not found</h2>

        <Link
          href="/UI-components/Pages/Blogs"
          className="mt-2 inline-flex items-center gap-2 text-sm tracking-widest uppercase border-b border-current pb-0.5 text-gray-700 hover:text-prim transition-colors duration-300"
        >
          <span>←</span> Back to Journal
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* ── Banner: breadcrumb + título entran desde abajo ── */}
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionbanner}
          alt="Section Banner"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <div className="content z-10 w-full h-full flex justify-center items-center flex-col">

          {/* Breadcrumb */}
          <EntranceAnimation type="fadeDown" duration={0.6} delay={0.1} scrollTrigger={false}>
            <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
              <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
                <Link href="/">Home</Link>
              </li>

              <li className="text-gray-500 font-bold">•</li>

              <li className="uppercase text-xs font-unbounded text-prim font-semibold">
                <Link href="/UI-components/Pages/Blogs">Blogs Details</Link>
              </li>
            </ul>
          </EntranceAnimation>

          {/* Título */}
          <EntranceAnimation type="fadeUp" duration={0.8} delay={0.25} scrollTrigger={false}>
            <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
              {blog.title}
            </h2>
          </EntranceAnimation>

        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

          {/* ── Main content ── */}
          <article className="flex-1 min-w-0">

            {/* Hero image: scale desde ligeramente reducido */}
            <EntranceAnimation
              type="scaleIn"
              duration={1}
              delay={0}
              ease="power3.out"
              scrollTrigger={false}
              className="relative overflow-hidden rounded-sm group mb-12 aspect-[16/9]"
              as="div"
            >
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </EntranceAnimation>

            {/* Párrafos del artículo: entran al hacer scroll */}
            <EntranceAnimation type="fadeUp" duration={0.7} scrollTrigger scrollStart="top 88%">
              <p className="text-lg text-gray-600 leading-relaxed tracking-wide first-letter:text-7xl first-letter:font-thin first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-gray-900 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam repellendus iure, saepe deleniti eligendi natus similique quasi quia mollitia nostrum veritatis vitae consequatur omnis minus tempora quod ab repellat.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore dolor aperiam placeat vitae nobis praesentium accusantium cumque id, rerum exercitationem magnam.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed tracking-wide mb-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur veritatis expedita quam consequatur, hic ipsa odit corrupti dicta quo vero obcaecati enim minima unde sit in reiciendis magni fuga!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium eum ut est molestias at, libero voluptates dolor numquam id hic ex quos.
              </p>
            </EntranceAnimation>

            {/* Pull quote: entra desde la izquierda */}
            <EntranceAnimation type="fadeLeft" duration={0.8} ease="power2.out" scrollTrigger scrollStart="top 85%">
              <blockquote className="border-l-4 border-prim pl-8 my-14 py-2">
                <p className="text-2xl sm:text-3xl font-light text-gray-800 leading-snug italic tracking-tight">
                  "Something reflected from our soul to the outside world — and emotion."
                </p>
              </blockquote>
            </EntranceAnimation>

            {/* Dual image grid: stagger entre las dos imágenes */}
            <EntranceAnimation
              type="stagger"
              selector=".article-img-item"
              stagger={0.15}
              duration={0.8}
              scrollTrigger
              scrollStart="top 85%"
              className="grid grid-cols-2 gap-3 my-12"
            >
              <div className="article-img-item aspect-4/3 relative overflow-hidden rounded-sm group">
                <Image
                  src={articlesDes1}
                  alt="Article detail 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="article-img-item aspect-4/3 relative overflow-hidden rounded-sm group">
                <Image
                  src={articlesDes2}
                  alt="Article detail 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </EntranceAnimation>

            {/* Heading de sección */}
            <EntranceAnimation type="fadeUp" duration={0.7} scrollTrigger scrollStart="top 88%">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 leading-snug tracking-tight mt-14 mb-6">
                Something reflected from our soul to the outside world — and emotion
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed tracking-wide mb-8">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit voluptatum fugiat facilis laudantium distinctio. At rerum assumenda quos iusto delectus! Iure nisi neque harum ullam aliquid rerum error ea architecto!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias repellendus fugiat commodi quidem omnis incidunt quis doloremque dolores libero.
              </p>
            </EntranceAnimation>

            {/* Tags footer: stagger en cada tag */}
            <EntranceAnimation
              type="stagger"
              selector=".tag-item"
              stagger={0.08}
              duration={0.5}
              scrollTrigger
              scrollStart="top 92%"
              className="flex flex-wrap items-center gap-2 pt-10 border-t border-gray-100 mt-10"
            >
              <span className="tag-item text-xs tracking-widest uppercase text-gray-400 mr-2">Tags</span>
              {TagsData.map((tag, index) => (
                <Link
                  key={index}
                  href={`/UI-components/Pages/Blogs?category=${tag}`}
                  className="tag-item text-xs tracking-widest uppercase px-4 py-2 border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  {tag}
                </Link>
              ))}
            </EntranceAnimation>

          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-14">

            {/* Recent posts: stagger por item */}
            <EntranceAnimation type="fadeUp" duration={0.6} scrollTrigger scrollStart="top 88%">
              <section>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                  Recent posts
                  <span className="flex-1 h-px bg-gray-100" />
                </h3>

                <EntranceAnimation
                  type="stagger"
                  selector=".recent-post-item"
                  stagger={0.12}
                  duration={0.55}
                  scrollTrigger
                  scrollStart="top 88%"
                  className="space-y-6"
                >
                  {ArticlesData.slice(0, 4).map((item, index) => (
                    <Link key={index} href={`/UI-components/Pages/Blogs/${item.id}`} className="recent-post-item flex gap-4 group">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-0.5">
                        <span className="text-[10px] tracking-widest uppercase text-gray-400">{item.date}</span>
                        <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-prim transition-colors duration-300 line-clamp-2">{item.title}</p>
                      </div>
                    </Link>
                  ))}
                </EntranceAnimation>
              </section>
            </EntranceAnimation>

            {/* Categories */}
            <EntranceAnimation type="fadeUp" duration={0.6} delay={0.05} scrollTrigger scrollStart="top 88%">
              <section>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                  Categories
                  <span className="flex-1 h-px bg-gray-100" />
                </h3>
                <ul className="space-y-1">
                  {CategoriesData.map((category, index) => (
                    <li key={index}>
                      <Link href={`/UI-components/Page/Blogs?category=${category}`} className="flex items-center justify-between py-2.5 border-b border-gray-50 text-sm text-gray-600 hover:text-prim hover:pl-2 transition-all duration-300 group">
                        <span>{category}</span>
                        <span className="text-gray-300 group-hover:text-prim transition-colors duration-300 text-xs">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </EntranceAnimation>

            {/* Newsletter */}
            <EntranceAnimation type="fadeLeft" duration={0.7} scrollTrigger scrollStart="top 88%">
              <section>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                  Newsletter
                  <span className="flex-1 h-px bg-gray-100" />
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Subscribe to receive the latest stories and updates.
                </p>
                <div className="flex border-b border-gray-300 pb-2 focus-within:border-gray-900 transition-colors duration-300">
                  <input type="email" placeholder="your@email.com" className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-300" />
                  <button className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors duration-300 ml-2">→</button>
                </div>
              </section>
            </EntranceAnimation>

            {/* Tags sidebar */}
            <EntranceAnimation
              type="stagger"
              selector=".sidebar-tag"
              stagger={0.08}
              duration={0.45}
              scrollTrigger
              scrollStart="top 90%"
            >
              <section>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                  Tags
                  <span className="flex-1 h-px bg-gray-100" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TagsData.map((tag, index) => (
                    <Link key={index} href={`/UI-components/Pages/Blogs?category=${tag}`} className="sidebar-tag text-xs tracking-widest uppercase px-3 py-1.5 border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300">
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            </EntranceAnimation>

            {/* Instagram gallery: stagger en cada foto */}
            <EntranceAnimation
              type="stagger"
              selector=".gallery-item"
              stagger={0.07}
              duration={0.5}
              ease="power2.out"
              scrollTrigger
              scrollStart="top 90%"
            >
              <section>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                  Instagram
                  <span className="flex-1 h-px bg-gray-100" />
                </h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {GalleryData.map((img, index) => (
                    <div key={index} className="gallery-item relative aspect-square overflow-hidden group cursor-pointer">
                      <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <i className="bi bi-instagram text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </EntranceAnimation>

          </aside>
        </div>
      </div>
    </>
  )
}

export default BlogDetails
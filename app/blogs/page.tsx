"use client";

import Image from "next/image";
import Link from "next/link";
import sectionbanner from "@/public/section-banner.png";
import ArticlesData from "@/app/JsonData/BlogsData.json";
import { EntranceAnimation } from "@/app/Animations";

const Blogs = () => {
  return (
    <>
      {/* Banner Principal */}
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionbanner}
          alt="Section Banner"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <EntranceAnimation type="fadeDown" duration={0.8} scrollTrigger={false} className="content z-10 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
              <Link href="/">Home</Link>
            </li>

            <li className="text-gray-500 font-bold">•</li>

            <li className="uppercase text-xs font-unbounded text-prim font-semibold">
              <Link href="/blogs">Blogs</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm">
            Our Articles
          </h2>
        </EntranceAnimation>
      </div>

      {/* SECCIÓN DE TARJETAS REDISEÑADA - ESTILO PREMIUM */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-gradient-to-b from-white to-gray-50/40">
        <EntranceAnimation type="stagger" selector=".blog-post-card" duration={0.8} stagger={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ArticlesData.map((blog, index) => (
              <div key={index} className="blog-post-card group">
                <Link href={`/blogs/${blog.id}`}>
                  <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden border border-gray-100">

                    {/* Contenedor de imagen con aspecto de galería premium */}
                    <div className="blog-image relative overflow-hidden bg-gray-100">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={blog.img}
                          alt={blog.author}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>

                      {/* Overlay elegante al hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Badge flotante (opcional, añade sensación premium) */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        Leer artículo
                      </div>
                    </div>

                    {/* Contenido de la tarjeta con mejor jerarquía visual */}
                    <div className="flex flex-col grow p-5">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-14 group-hover:text-prim transition-colors duration-200">
                        {blog.title}
                      </h2>

                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <i className="bi bi-calendar4-week text-prim"></i>
                          <span>{blog.date}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <i className="bi bi-chat-dots text-prim"></i>
                          <span>{blog.comments}</span>
                        </div>
                      </div>

                      {/* Botón con estilo moderno */}
                      <div className="mt-5 pt-2">
                        <button className="group/btn w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:bg-prim hover:text-white hover:border-prim transition-all duration-300 cursor-pointer">
                          <span>Explorar más</span>
                          <i className="bi bi-arrow-right text-sm transition-transform duration-300 group-hover/btn:translate-x-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </EntranceAnimation>
      </div>
    </>
  );
};

export default Blogs;
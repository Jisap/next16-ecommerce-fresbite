"use client"

import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import ArticlesData from "@/app/JsonData/BlogsData.json"

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

        <div className="content z-10 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="text-gray-500 font-bold">•</li>
            <li className="uppercase text-xs font-unbounded text-prim font-semibold">
              <Link href="/UI-components/Pages/Blogs">Blogs</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm">
            Our Articles
          </h2>
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {ArticlesData.map((blog, index) => (
            <div key={index}>
              <Link href={`/UI-components/Pages/Blogs/${blog.id}`}>
                <div className='flex flex-col group'>
                  <div className='blog-image relative overflow-hidden rounded-lg'>
                    <Image 
                      src={blog.img}
                      width={1000}
                      height={1000}
                      alt={blog.author}
                      className='w-full h-full object-contain group-hover:scale-105 transition-all duration-300'
                    />

                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300'></div>
                  </div>
                  
                  <div className='flex flex-col my-5 px-5'>
                    <h2 className='text-2xl hover:text-prim transition-all duration-200 line-clamp-1 min-h-8'>
                      {blog.title}
                    </h2>

                    <div className='flex gap-4 mt-3'>
                      <h2 className='text-xl'>
                        <i className='bi bi-calendar4-week'></i>{" "}
                        {blog.date}
                      </h2>

                      <h2 className='text-xl'>
                        <i className='bi bi-chat-dots'></i> {" "}
                        {blog.comments}
                      </h2>
                    </div>

                    <div>
                      <button className='btn text-black font-semibold px-5 py-2 rounded-lg mt-5 border border-black transition-all duration-300 cursor-pointer'>
                        <div className='btn-text'>
                          Explore More <i className='bi bi-arrow-right ps2'></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Blogs
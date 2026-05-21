"use client"

import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import ArticlesData from "@/app/JsonData/BlogsData.json"
import { useParams } from 'next/navigation'


const BlogDetails = () => {

  const { id } = useParams();
  const blog = ArticlesData.find((item) => item.id === Number(id));

  if(!blog) {
    return (
      <div className='px-4 lg:px-20 py-24 text-center'>
        <h2 className='text-4xl text-gray-400'>
          Blog not found
        </h2>

        <Link href="UI-components/Pages/Blogs" className='inline-block mt-6 text-prim underline'>
          Back to Blogs
        </Link>
      </div>
  )}

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
              <Link href="/UI-components/Pages/Blogs">Blogs Details</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
            {blog.title}
          </h2>
        </div>
      </div>

      <div className='flex flex-col-reverse lg:flex-row gap-5 px-2 lg:px-8 xl:px-20 py-12'>
        <div className='w-full lg:w-1/2 sticky top-0 left-0 h-full'>
          <div>
            <h2 className='text-2xl font-medium'>
              Recent post
            </h2>

            <div className='w-full lg:w-3/4 pt-1'>
              <div className='border-b rounded-full'></div>
            </div>

            <div className='w-full'>
              {ArticlesData.slice(0,4).map((blog,index) => (
                <Link key={index} href={`/UI-components/Pages/Blogs/${blog.id}`} className='flex items-center gap-2 mt-5'>
                  <div className='flex gap-3'>
                    <div className='w-[200px] md:w-1/2 lg:w-[200px]'>
                      <Image 
                        src={blog.img}
                        alt={blog.author}
                        width={150}
                        height={150}
                        className='w-full h-fit object-cover rounded-lg'
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails
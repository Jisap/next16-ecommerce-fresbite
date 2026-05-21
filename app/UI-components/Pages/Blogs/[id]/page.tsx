"use client"

import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import ArticlesData from "@/app/JsonData/BlogsData.json"
import { useParams } from 'next/navigation'
import gallery1 from "@/public/blog-det-gallery1.avif"
import gallery2 from "@/public/blog-det-gallery2.webp"
import gallery3 from "@/public/blog-det-gallery3.avif"
import gallery4 from "@/public/blog-det-gallery4.avif"
import gallery5 from "@/public/blog-det-gallery5.avif"
import gallery6 from "@/public/blog-det-gallery6.avif"
import gallery7 from "@/public/blog-det-gallery7.avif"

const BlogDetails = () => {

  const CategoriesData = [
    "Babystore",
    "Bag",
    "Cosmetic",
    "Decorate",
    "Electronic",
    "Fashion",
    "Furniture"
  ];

  const TagsData = [
    "Fruit",
    "Grocery",
    "Vegetable",
    "Dried Fruit"
  ]

  const GalleryData = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6
  ]

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

                    <div className='w-full py-1'>
                      <div className='flex h-full flex-col justify-between'>
                        <div className='flex gap-4 mt-3'>
                          <span className='font-medium'>
                            <i className='bi bi-calendar4-week'></i>{" "}
                            {blog.date}
                          </span>

                          <span className='font-medium'>
                            <i className='bi bi-chat-dots'></i>{" "}
                            {blog.comments}
                          </span>
                        </div>

                        <span className='text-xl font-medium hover:text-prim duration-300 transition-colors'>
                          {blog.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1'>
              <div>
                <h2 className='text-2xl mt-7 mb-3 font-medium'>
                  Categories
                </h2>

                {CategoriesData.map((category, index) => (
                  <Link 
                    key={index} 
                    href={`/UI-components/Page/Blogs?category=${category}`}
                    className='flex items-center gap-2 mt-2 ps-2 hover:ps-4 transition-all duration-300'  
                  >
                    <span className='font-medium hover:text-prim duration-300 transition-colors'>
                      {category}
                    </span>
                  </Link>
                ))}

                <h2 className='text-2xl mt-7 mb-3 font-medium'>
                  Tags
                </h2>

                <div className='flex flex-wrap'>
                  {TagsData.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/UI-components/Pages/Blogs?category=${tag}`}
                      className='px-4 py-2 border rounded-md me-2 hover:bg-black hover:text-white transition-all duration-300'
                    >
                      <span className='font-medium'>
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='text-2xl mt-7 mb-3 font-medium'>
                  Newsletter
                </h2>

                <div className='flex justify-between items-center gap-2 w-full md:w-3/4 border-b border-gray-300 pb-2 px-2'>
                  <input 
                    type="text"
                    placeholder='Enter your email'
                    className='w-full outline-none'
                  />
                    <i className='bi bi-envelope'></i>
                </div>

                <h2 className='text-2xl mt-7 mb-3'>
                  Instagram
                </h2>

                <div className='grid grid-cols-3 gap-2 w-full md:w-3/4'>
                  {GalleryData.map((img, index) => (
                    <div key={index} className='relative cursor-pointer group overflow-hidden rounded-lg'>
                      <Image 
                        src={img}
                        alt="img"
                        width={1000}
                        height={1000}
                        className='w-full h-full object-cover cursor-pointer rounded-lg transition-all duration-300'
                      />

                      <div className='absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300'></div>

                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <i className='bi bi-instagram text-white text-3xl'></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails
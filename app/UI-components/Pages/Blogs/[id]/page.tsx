// "use client"

// import Image from 'next/image'
// import Link from 'next/link'
// import sectionbanner from "@/public/section-banner.png"
// import ArticlesData from "@/app/JsonData/BlogsData.json"
// import { useParams } from 'next/navigation'
// import gallery1 from "@/public/blog-det-gallery1.avif"
// import gallery2 from "@/public/blog-det-gallery2.webp"
// import gallery3 from "@/public/blog-det-gallery3.avif"
// import gallery4 from "@/public/blog-det-gallery4.avif"
// import gallery5 from "@/public/blog-det-gallery5.avif"
// import gallery6 from "@/public/blog-det-gallery6.avif"
// import gallery7 from "@/public/blog-det-gallery7.avif"
// import articlesDes1 from "@/public/artical-des1.jpg"
// import articlesDes2 from "@/public/artical-des2.webp"

// const BlogDetails = () => {

//   const CategoriesData = [
//     "Babystore",
//     "Bag",
//     "Cosmetic",
//     "Decorate",
//     "Electronic",
//     "Fashion",
//     "Furniture"
//   ];

//   const TagsData = [
//     "Fruit",
//     "Grocery",
//     "Vegetable",
//     "Dried Fruit"
//   ]

//   const GalleryData = [
//     gallery1,
//     gallery2,
//     gallery3,
//     gallery4,
//     gallery5,
//     gallery6
//   ]

//   const { id } = useParams();
//   const blog = ArticlesData.find((item) => item.id === Number(id));

//   if(!blog) {
//     return (
//       <div className='px-4 lg:px-20 py-24 text-center'>
//         <h2 className='text-4xl text-gray-400'>
//           Blog not found
//         </h2>

//         <Link href="UI-components/Pages/Blogs" className='inline-block mt-6 text-prim underline'>
//           Back to Blogs
//         </Link>
//       </div>
//   )}

//   return (
//     <>
//       {/* Banner Principal */}
//       <div className="page-banner bg-black h-55 flex justify-between items-center relative">
//         <Image
//           src={sectionbanner}
//           alt="Section Banner"
//           fill
//           className="w-full h-full object-cover absolute top-0 left-0 right-0"
//         />

//         <div className="content z-10 w-full h-full flex justify-center items-center flex-col">
//           <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
//             <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="text-gray-500 font-bold">•</li>
//             <li className="uppercase text-xs font-unbounded text-prim font-semibold">
//               <Link href="/UI-components/Pages/Blogs">Blogs Details</Link>
//             </li>
//           </ul>

//           <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
//             {blog.title}
//           </h2>
//         </div>
//       </div>

//       <div className='flex flex-col-reverse lg:flex-row gap-5 px-2 lg:px-8 xl:px-20 py-12'>
//         <div className='w-full lg:w-1/2 sticky top-0 left-0 h-full'>
//           <div>
//             <h2 className='text-2xl font-medium'>
//               Recent post
//             </h2>

//             <div className='w-full lg:w-3/4 pt-1'>
//               <div className='border-b rounded-full'></div>
//             </div>

//             <div className='w-full'>
//               {ArticlesData.slice(0,4).map((blog,index) => (
//                 <Link key={index} href={`/UI-components/Pages/Blogs/${blog.id}`} className='flex items-center gap-2 mt-5'>
//                   <div className='flex gap-3'>
//                     <div className='w-[200px] md:w-1/2 lg:w-[200px]'>
//                       <Image 
//                         src={blog.img}
//                         alt={blog.author}
//                         width={150}
//                         height={150}
//                         className='w-full h-fit object-cover rounded-lg'
//                       />
//                     </div>

//                     <div className='w-full py-1'>
//                       <div className='flex h-full flex-col justify-between'>
//                         <div className='flex gap-4 mt-3'>
//                           <span className='font-medium'>
//                             <i className='bi bi-calendar4-week'></i>{" "}
//                             {blog.date}
//                           </span>

//                           <span className='font-medium'>
//                             <i className='bi bi-chat-dots'></i>{" "}
//                             {blog.comments}
//                           </span>
//                         </div>

//                         <span className='text-xl font-medium hover:text-prim duration-300 transition-colors'>
//                           {blog.title}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1'>
//               <div>
//                 <h2 className='text-2xl mt-7 mb-3 font-medium'>
//                   Categories
//                 </h2>

//                 {CategoriesData.map((category, index) => (
//                   <Link 
//                     key={index} 
//                     href={`/UI-components/Page/Blogs?category=${category}`}
//                     className='flex items-center gap-2 mt-2 ps-2 hover:ps-4 transition-all duration-300'  
//                   >
//                     <span className='font-medium hover:text-prim duration-300 transition-colors'>
//                       {category}
//                     </span>
//                   </Link>
//                 ))}

//                 <h2 className='text-2xl mt-7 mb-3 font-medium'>
//                   Tags
//                 </h2>

//                 <div className='flex flex-wrap'>
//                   {TagsData.map((tag, index) => (
//                     <Link 
//                       key={index}
//                       href={`/UI-components/Pages/Blogs?category=${tag}`}
//                       className='px-4 py-2 border rounded-md me-2 hover:bg-black hover:text-white transition-all duration-300'
//                     >
//                       <span className='font-medium'>
//                         {tag}
//                       </span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className='text-2xl mt-7 mb-3 font-medium'>
//                   Newsletter
//                 </h2>

//                 <div className='flex justify-between items-center gap-2 w-full md:w-3/4 border-b border-gray-300 pb-2 px-2'>
//                   <input 
//                     type="text"
//                     placeholder='Enter your email'
//                     className='w-full outline-none'
//                   />
//                     <i className='bi bi-envelope'></i>
//                 </div>

//                 <h2 className='text-2xl mt-7 mb-3'>
//                   Instagram
//                 </h2>

//                 <div className='grid grid-cols-3 gap-2 w-full md:w-3/4'>
//                   {GalleryData.map((img, index) => (
//                     <div key={index} className='relative cursor-pointer group overflow-hidden rounded-lg'>
//                       <Image 
//                         src={img}
//                         alt="img"
//                         width={1000}
//                         height={1000}
//                         className='w-full h-full object-cover cursor-pointer rounded-lg transition-all duration-300'
//                       />

//                       <div className='absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300'></div>

//                       <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
//                         <i className='bi bi-instagram text-white text-3xl'></i>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='w-full lg:w-1/1'>
//           <div className='blog-image relative overflow-hidden rounded-lg group'>
//             <Image 
//               src={blog.img}
//               alt="blogimg"
//               width={1000}
//               height={1000}
//               className='w-full h-full object-contain gorup-hover:scale-105 transition-all duration-300'
//             />

//             <div className='absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300'></div>
//           </div>

//           <div className='mt-10'>
//             <div className='flex gap-4 mt-3'>
//               <h2 className='text-xl'>
//                 <i className='bi bi-calendar4-week'></i>{" "}
//                 {blog.date}
//               </h2>

//               <h2 className='text-xl'>
//                 <i className='bi bi-person'></i>{" "}
//                 {blog.author}
//               </h2>
//             </div>

//             <h2 className='mt-5 text-4xl font-semibold hover:text-prim transition-all duration-200'>
//               {blog.title}
//             </h2>

//             <p className='mt-5 text-lg text-gray-500 tracking-wide'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam repellendus iure, saepe deleniti eligendi natus similique quasi quia mollitia nostrum veritatis vitae consequatur omnis minus tempora quod ab repellat.
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore dolor aperiam placeat vitae nobis praesentium accusantium cumque id, rerum exercitationem magnam, aut sit saepe, ut officia earum quas iusto!
//             </p>

//             <p className='mt-5 text-lg text-gray-500 tracking-wide'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur veritatis expedita quam consequatur, hic ipsa odit corrupti dicta quo vero obcaecati enim minima unde sit in reiciendis magni fuga!
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium eum ut est molestias at, libero voluptates dolor numquam id hic ex quos. Eius corrupti nostrum sequi dolorum sunt dolorem corporis?
//             </p>

//             <div className='mt-5'>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
//                 <Image 
//                   src={articlesDes1}
//                   alt="articlesDes1"
//                   className='w-full h-full rounded-md'
//                 />
//                 <Image 
//                   src={articlesDes2}
//                   alt="articlesDes2"
//                   className='w-full h-full rounded-md'
//                 />
//               </div>

//               <h2 className='mt-5 text-4xl font-semibold'>
//                 Something reflecte from our soul to the outside world - and emotion
//               </h2>

//               <p className='mt-5 text-lg text-gray-500 tracking-wide'>
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit voluptatum fugiat facilis laudantium distinctio. At rerum assumenda quos iusto delectus! Iure nisi neque harum ullam aliquid rerum error ea architecto!
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias repellendus fugiat commodi quidem omnis incidunt quis doloremque dolores libero. Aut cum dolorum quam, vel atque beatae ullam assumenda nobis quasi.
//               </p>

//               <div className='flex flex-wrap mt-5'>
//                 {TagsData.map((tag, index) => (
//                   <Link
//                     key={index}
//                     href={`/UI-components/Pages/Blogs?category=${tag}`}
//                     className='px-4 py-2 border rounded-md me-2 hover:bg-black hover:text-white transition-all duration-300'
//                   >
//                     <span className='font-medium'>
//                       {tag}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default BlogDetails

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
import articlesDes1 from "@/public/artical-des1.jpg"
import articlesDes2 from "@/public/artical-des2.webp"

const BlogDetails = () => {

  const CategoriesData = [
    "Babystore",
    "Bag",
    "Cosmetic",
    "Decorate",
    "Electronic",
    "Fashion",
    "Furniture"
  ]

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
    gallery6,
  ]

  const { id } = useParams()
  const blog = ArticlesData.find((item) => item.id === Number(id))

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-6xl font-thin tracking-widest text-gray-200">404</p>
        <h2 className="text-2xl font-light text-gray-400 tracking-wide">
          Article not found
        </h2>
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
      {/* ── Hero Banner ── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={sectionbanner}
          alt="Section Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-8 lg:px-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-white/30 text-xs">—</span>
            <Link
              href="/UI-components/Pages/Blogs"
              className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
            >
              Journal
            </Link>
            <span className="text-white/30 text-xs">—</span>
            <span className="text-xs tracking-widest uppercase text-white">Article</span>
          </nav>

          {/* Category pill */}
          <span className="inline-block mb-4 text-[10px] tracking-[0.2em] uppercase bg-prim/90 text-white px-3 py-1 w-fit">
            {CategoriesData[0]}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-4xl line-clamp-2">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 mt-5 text-white/50 text-xs tracking-widest uppercase">
            <span>{blog.date}</span>
            <span className="w-4 h-px bg-white/30" />
            <span>By {blog.author}</span>
            <span className="w-4 h-px bg-white/30" />
            <span>{blog.comments} comments</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

          {/* ── Main content ── */}
          <article className="flex-1 min-w-0">

            {/* Hero image */}
            <div className="relative overflow-hidden rounded-sm group mb-12 aspect-[16/9]">
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Drop-cap intro paragraph */}
            <p className="text-lg text-gray-600 leading-relaxed tracking-wide first-letter:text-7xl first-letter:font-thin first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-gray-900 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam repellendus iure, saepe deleniti eligendi natus similique quasi quia mollitia nostrum veritatis vitae consequatur omnis minus tempora quod ab repellat.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore dolor aperiam placeat vitae nobis praesentium accusantium cumque id, rerum exercitationem magnam.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed tracking-wide mb-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur veritatis expedita quam consequatur, hic ipsa odit corrupti dicta quo vero obcaecati enim minima unde sit in reiciendis magni fuga!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium eum ut est molestias at, libero voluptates dolor numquam id hic ex quos.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-prim pl-8 my-14 py-2">
              <p className="text-2xl sm:text-3xl font-light text-gray-800 leading-snug italic tracking-tight">
                "Something reflected from our soul to the outside world — and emotion."
              </p>
            </blockquote>

            {/* Dual image grid */}
            <div className="grid grid-cols-2 gap-3 my-12">
              <div className="aspect-[4/3] relative overflow-hidden rounded-sm group">
                <Image
                  src={articlesDes1}
                  alt="Article detail 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] relative overflow-hidden rounded-sm group">
                <Image
                  src={articlesDes2}
                  alt="Article detail 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Section heading */}
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 leading-snug tracking-tight mt-14 mb-6">
              Something reflected from our soul to the outside world — and emotion
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed tracking-wide mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit voluptatum fugiat facilis laudantium distinctio. At rerum assumenda quos iusto delectus! Iure nisi neque harum ullam aliquid rerum error ea architecto!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias repellendus fugiat commodi quidem omnis incidunt quis doloremque dolores libero.
            </p>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 pt-10 border-t border-gray-100 mt-10">
              <span className="text-xs tracking-widest uppercase text-gray-400 mr-2">Tags</span>
              {TagsData.map((tag, index) => (
                <Link
                  key={index}
                  href={`/UI-components/Pages/Blogs?category=${tag}`}
                  className="text-xs tracking-widest uppercase px-4 py-2 border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-14">

            {/* Recent posts */}
            <section>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                Recent posts
                <span className="flex-1 h-px bg-gray-100" />
              </h3>

              <div className="space-y-6">
                {ArticlesData.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    href={`/UI-components/Pages/Blogs/${item.id}`}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-0.5">
                      <span className="text-[10px] tracking-widest uppercase text-gray-400">
                        {item.date}
                      </span>
                      <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-prim transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                Categories
                <span className="flex-1 h-px bg-gray-100" />
              </h3>

              <ul className="space-y-1">
                {CategoriesData.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/UI-components/Page/Blogs?category=${category}`}
                      className="flex items-center justify-between py-2.5 border-b border-gray-50 text-sm text-gray-600 hover:text-prim hover:pl-2 transition-all duration-300 group"
                    >
                      <span>{category}</span>
                      <span className="text-gray-300 group-hover:text-prim transition-colors duration-300 text-xs">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Newsletter */}
            <section>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                Newsletter
                <span className="flex-1 h-px bg-gray-100" />
              </h3>

              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Subscribe to receive the latest stories and updates.
              </p>

              <div className="flex border-b border-gray-300 pb-2 focus-within:border-gray-900 transition-colors duration-300">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-300"
                />
                <button className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors duration-300 ml-2">
                  →
                </button>
              </div>
            </section>

            {/* Tags */}
            <section>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                Tags
                <span className="flex-1 h-px bg-gray-100" />
              </h3>

              <div className="flex flex-wrap gap-2">
                {TagsData.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/UI-components/Pages/Blogs?category=${tag}`}
                    className="text-xs tracking-widest uppercase px-3 py-1.5 border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>

            {/* Instagram gallery */}
            <section>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 flex items-center gap-3">
                Instagram
                <span className="flex-1 h-px bg-gray-100" />
              </h3>

              <div className="grid grid-cols-3 gap-1.5">
                {GalleryData.map((img, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden group cursor-pointer">
                    <Image
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <i className="bi bi-instagram text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </aside>
        </div>
      </div>
    </>
  )
}

export default BlogDetails
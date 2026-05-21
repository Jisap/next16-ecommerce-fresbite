import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import aboutImg01 from "@/public/about-img-01.webp"


const About = () => {
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
              <Link href="/UI-components/Pages/About">About</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
            About
          </h2>
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16'>
        <div className='flex flex-col items-center justify-center'>
          <h4 className='text-lg font-medium uppercase mb-3'>
            Since 1982 our story
          </h4>

          <p className='text-center text-black/50 text-lg md:text-xl lg:w-[68%] font-medium'>
            In early 1982, it all started with a simple idea: 
            to bring high-quality organic products closer to people who value a more natural, 
            transparent, and environmentally conscious lifestyle.
          </p>
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16'>
        <div className='flex flex-col lg:items-center lg:flex-row gap-5 lg:gap-15'>
          <div className='relative w-full lg:w-1/2 overflow-hidden group'>
            <Image 
              src={aboutImg01}
              alt="about-img"
              className='transition-transform duration-500 ease-in-out group-hover:scale-110 object-cover'
            />
          </div>

          <div className='w-full lg:w-1/2'>
            <h2 className='text-3xl md:text-5xl font-bold mb-8'>
              Story about us
            </h2>

            <p className='text-black/50 text-lg md:text-xl lg:w-[75%] font-medium mb-5'>
              Our mission is to make organic living more accessible by offering carefully selected products that combine quality, sustainability, and trust, 
              while supporting healthier choices for our customers and a better future for our planet
            </p>

            <p className='text-black/50 text-lg md:text-xl lg:w-[75%] font-medium mb-5'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere alias possimus tempore,
               optio aspernatur, nam dolorem corporis quos minima in sed ea 
              deserunt eveniet, cupiditate laboriosam esse aliquid sit temporibus.
            </p>

            <span className='text-lg italic cursor-pointer'>
              Harlie Puth
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
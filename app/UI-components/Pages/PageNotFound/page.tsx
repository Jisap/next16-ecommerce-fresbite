

import { EntranceAnimation } from '@/app/Animations'
import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png";
import pagenotfound from "@/public/pagenotfound.webp"

const PageNotFound = () => {
  return (
    <>
      {/* Banner Principal  */}
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
              <Link href="/blogs">404</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm">
            404 Page Not Found
          </h2>
        </EntranceAnimation>
      </div>

      {/* Contenido Mejorado */}
      <div className='flex justify-center flex-col-reverse items-center lg:flex-row gap-8 lg:gap-12 px-5 lg:px-8 xl:px-20 py-16 lg:py-24 max-w-7xl mx-auto'>

        {/* Imagen con animación */}
        <div className='w-full lg:w-1/2'>
          <EntranceAnimation
            type="fadeRight"
            duration={0.8}
            scrollTrigger={false}
          >
            <Image
              src={pagenotfound}
              alt="404 Illustration"
              className='w-full h-auto max-h-[500px] object-contain drop-shadow-2xl'
              priority
            />
          </EntranceAnimation>
        </div>

        {/* Contenido textual */}
        <div className='w-full lg:w-1/2 flex flex-col text-center lg:text-left lg:items-start space-y-4'>

          <EntranceAnimation
            type="fadeLeft"
            duration={0.6}
            delay={0.2}
            scrollTrigger={false}
          >
            <span className='inline-block text-sm font-semibold tracking-widest text-prim uppercase mb-2'>
              Error 404
            </span>
          </EntranceAnimation>

          <EntranceAnimation
            type="fadeLeft"
            duration={0.7}
            delay={0.3}
            scrollTrigger={false}
          >
            <h3 className='text-5xl sm:text-6xl lg:text-7xl font-bold font-unbounded leading-tight'>
              Oops!
            </h3>
          </EntranceAnimation>

          <EntranceAnimation
            type="fadeLeft"
            duration={0.7}
            delay={0.4}
            scrollTrigger={false}
          >
            <p className='text-gray-500 text-lg sm:text-xl max-w-md lg:max-w-none mx-auto lg:mx-0 leading-relaxed'>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </EntranceAnimation>

          <EntranceAnimation
            type="fadeUp"
            duration={0.7}
            delay={0.5}
            scrollTrigger={false}
          >
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/shop"
                className='group inline-flex items-center gap-2 bg-prim text-white hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-8 py-3.5 rounded-lg font-medium text-sm uppercase tracking-wide'
              >
                Continue Shopping
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/"
                className='inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-prim hover:text-prim transition-all duration-300 px-8 py-3.5 rounded-lg font-medium text-sm uppercase tracking-wide'
              >
                Back to Home
              </Link>
            </div>
          </EntranceAnimation>

          {/* Decorative element */}
          <EntranceAnimation
            type="fade"
            duration={1}
            delay={0.7}
            scrollTrigger={false}
          >
            <div className="pt-8 flex items-center gap-4 text-gray-400 text-sm">
              <div className="h-px w-12 bg-gray-300" />
              <span>Need help? <Link href="/contact" className="text-prim hover:underline">Contact us</Link></span>
            </div>
          </EntranceAnimation>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
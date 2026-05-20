import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-10 
        bg-[url("/freshbity-footer-bg.webp")] bg-gray-light bg-contain bg-no-repeat bg-center'
      >
        <div className='footer-item'>
          <Link href="/" className="logo font-unbounded text-xl sm:text-2xl cursor-pointer">
            Fresh<span className='text-prim'>Bite</span>
          </Link>

          <p className='mt-4 mb-2 text-gray-500 text-md'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>

          <span className='text-gray-500'>
            &copy; 2026 by <span className='text-black'>Freshbite</span>
          </span>
        </div>

        <div>
          
        </div>
      </div>
    </>
  )
}

export default Footer
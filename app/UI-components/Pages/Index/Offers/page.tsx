import Link from 'next/link'
import React from 'react'

const Offers = () => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-2 items-center lg:px-8 xl:px-12 gap-2 py-12'>
        <div className='banner-item text-white p-8 lg:p-10 rounded-xl h-full flex flex-col justify-between'>
          <p className='text-2xl font-medium'>Deals of the week</p>

          <Link href="/" className='text-secondary font-medium text-md capitalize cursor-pointer mt-4'>
            View Offers</Link>
        </div>

        <div className='banner-item text-white p-8 lg:p-10 rounded-xl h-full flex flex-col justify-between'>
          <p className='text-2xl font-medium'>Biggest discounts</p>

          <Link href="/" className='text-secondary font-medium text-md capitalize cursor-pointer mt-4'>
            View Offers</Link>
        </div>

        <div className='banner-item text-white p-8 lg:p-10 rounded-xl h-full flex flex-col justify-between'>
          <p className='text-2xl font-medium'>Combos you cant miss</p>

          <Link href="/" className='text-secondary font-medium text-md capitalize cursor-pointer mt-4'>
            View Offers</Link>
        </div>

        <div className='banner-item text-white p-8 lg:p-10 rounded-xl h-full flex flex-col justify-between'>
          <p className='text-2xl font-medium'>The $19.00 corner</p>

          <Link href="/" className='text-secondary font-medium text-md capitalize cursor-pointer mt-4'>
            View Offers</Link>
        </div>

        <div className='banner-item text-white p-8 lg:p-10 rounded-xl h-full flex flex-col justify-between'>
          <p className='text-2xl font-medium'>Limited time offer</p>

          <Link href="/" className='text-secondary font-medium text-md capitalize cursor-pointer mt-4'>
            View Offers</Link>
        </div>
      </div>
    </>
  )
}

export default Offers
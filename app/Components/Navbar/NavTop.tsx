import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const NavTop = () => {
  return (
    <>
      <div className='bg-gray-100 hidden lg:flex justify-between items-center py-3 px-2 lg:px-8 xl:px-12'>
        <span>Delivery on next day from 10:00 am to 09:00 pm</span>

        <ul>
          <li className='flex items-center gap-2'>
            <Icon icon="famicons:call-outline" width="24" height="24" />
            <span>
              Need Help? :{" "}
              <Link href="/UI-Components/Pages/Contact">
                +91 9876543210
              </Link>
            </span>
          </li>
        </ul>

        <ul className='flex gap-3'>
          <Link href='/UI-Components/Pages/Contact'>
            <li>Contact</li>
          </Link>
          <Link href='/UI-Components/Pages/Blog'>
            <li>Blogs</li>
          </Link>
          <Link href='/UI-Components/Pages/Order-Tracking'>
            <li>Order Tracking</li>
          </Link>
        </ul>
      </div>

      <div className='bg-gray-100 py-3 px-2 overflow-hidden lg:hidden'>
        <div className='marquee inline-flex items-center gap-10 whitespace-nowrap min-w-full'>
          <span>Delivery on next day from 10:00 am to 09:00 pm</span>

          <ul>
            <li className='flex items-center gap-2'>
              <Icon icon="famicons:call-outline" width="24" height="24" />
              <span>
                Need Help? :{" "}
                <Link href="/UI-Components/Pages/Contact">
                  +91 9876543210
                </Link>
              </span>
            </li>
          </ul>

          <ul className='flex gap-3'>
            <Link href='/UI-Components/Pages/Contact'>
              <li>Contact</li>
            </Link>
            <Link href='/UI-Components/Pages/Blog'>
              <li>Blogs</li>
            </Link>
            <Link href='/UI-Components/Pages/Order-Tracking'>
              <li>Order Tracking</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavTop
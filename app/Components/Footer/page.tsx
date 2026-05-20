"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

// Importación de métodos de pago desde el directorio public
import visaIcon from '@/public/visa-svgrepo-com.svg'
import mastercardIcon from '@/public/mastercard-svgrepo-com.svg'
import paypalIcon from '@/public/paypal-svgrepo-com.svg'
import amexIcon from '@/public/american-express-svgrepo-com.svg'
import discoverIcon from '@/public/discover-3-svgrepo-com.svg'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-light bg-[url('/freshbite-footer-bg.webp')] bg-cover bg-no-repeat bg-center border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12 pt-16 pb-8">
        
        {/* Main Grid: Totalmente responsiva para todos los tamaños */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200/60">
          
          {/* Columna 1: Logo & Info */}
          <div className="footer-item flex flex-col justify-between">
            <div>
              <Link href="/" className="logo font-unbounded text-xl sm:text-2xl cursor-pointer font-bold">
                Fresh<span className="text-prim">Bite</span>
              </Link>
              <p className="mt-4 mb-6 text-gray-500 text-[14px] leading-relaxed">
                Your one-stop destination for fresh, organic, and healthy food items. Bringing nature's best directly to your doorstep.
              </p>
            </div>
            
            {/* Redes Sociales con Micro-interacciones */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-prim hover:border-prim hover:scale-110 transition-all duration-300">
                <Icon icon="ri:facebook-fill" width="18" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-prim hover:border-prim hover:scale-110 transition-all duration-300">
                <Icon icon="ri:twitter-x-fill" width="16" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-prim hover:border-prim hover:scale-110 transition-all duration-300">
                <Icon icon="ri:instagram-line" width="18" />
              </a>
              <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-prim hover:border-prim hover:scale-110 transition-all duration-300">
                <Icon icon="ri:pinterest-fill" width="18" />
              </a>
            </div>
          </div>

          {/* Columna 2: My Account */}
          <div className="footer-item">
            <h4 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-6 relative inline-block">
              My account
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-prim"></span>
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  My account
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Cart" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  My cart
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Wishlist" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  My wishlist
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Order history
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Return policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Our Legal */}
          <div className="footer-item">
            <h4 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-6 relative inline-block">
              Our legal
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-prim"></span>
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Cart" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Wishlist" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  About us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Track order
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Store location
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Information */}
          <div className="footer-item">
            <h4 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-6 relative inline-block">
              Information
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-prim"></span>
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Cart" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Keep in touch
                </Link>
              </li>
              <li>
                <Link href="/UI-components/Pages/Wishlist" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-500 hover:text-prim text-[15px] font-normal transition-all duration-300 flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-prim opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  Faq's
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 5: Contact Us con Iconos */}
          <div className="footer-item">
            <h4 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-6 relative inline-block">
              Contact us
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-prim"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-[15px]">
                <Icon icon="solar:phone-calling-outline" className="text-prim shrink-0 mt-1" width="18" />
                <a href="tel:+1234567890" className="hover:text-prim transition-colors duration-300 font-medium">+1234 567 890</a>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-[15px]">
                <Icon icon="solar:letter-outline" className="text-prim shrink-0 mt-1" width="18" />
                <a href="mailto:info@domain.com" className="hover:text-prim transition-colors duration-300 font-medium">info@domain.com</a>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-[15px] leading-relaxed">
                <Icon icon="solar:map-point-outline" className="text-prim shrink-0 mt-1" width="18" />
                <span>401 Broadway, 24th Floor, Orchard View, Vadodara, India</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-[15px]">
                <Icon icon="solar:clock-circle-outline" className="text-prim shrink-0 mt-1" width="18" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior: Copyright y Métodos de Pago */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; 2026 by <span className="text-black font-semibold">FreshBite</span>. All rights reserved.
          </div>
          
          {/* Métodos de pago importados directamente del proyecto */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-100/80 shadow-sm">
            <Image src={visaIcon} alt="Visa" className="h-5 w-auto object-contain" style={{ height: '20px', width: 'auto' }} />
            <Image src={mastercardIcon} alt="Mastercard" className="h-5 w-auto object-contain" style={{ height: '20px', width: 'auto' }} />
            <Image src={paypalIcon} alt="Paypal" className="h-5 w-auto object-contain" style={{ height: '20px', width: 'auto' }} />
            <Image src={amexIcon} alt="American Express" className="h-5 w-auto object-contain" style={{ height: '20px', width: 'auto' }} />
            <Image src={discoverIcon} alt="Discover" className="h-5 w-auto object-contain" style={{ height: '20px', width: 'auto' }} />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
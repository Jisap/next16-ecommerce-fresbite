import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png";
import contactImg01 from "@/public/contact-01.webp"
import { EntranceAnimation } from "@/app/Animations"

const Contact = () => {
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

        <EntranceAnimation type="fadeDown" duration={0.8} scrollTrigger={false} className="content z-10 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <li className="uppercase text-xs font-unbounded text-gray-800 hover:text-prim transition-colors">
              <Link href="/">Home</Link>
            </li>

            <li className="text-gray-500 font-bold">•</li>

            <li className="uppercase text-xs font-unbounded text-prim font-semibold">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm">
            Contact Us
          </h2>
        </EntranceAnimation>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* Imagen de contacto - Entrada desde la izquierda */}
          <EntranceAnimation type="fadeRight" duration={1} className='relative w-full lg:w-1/2 overflow-hidden group rounded-lg'>
            <Image
              src={contactImg01}
              alt="Contact"
              className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
            />
          </EntranceAnimation>

          {/* Información de contacto - Staggered fadeUp */}
          <EntranceAnimation type="stagger" selector=".animate-contact-item" duration={0.8} stagger={0.12} className='w-full lg:w-1/2'>
            <span className='text-lg animate-contact-item block'>We&apos;d love to hear from you</span>

            <h2 className='text-3xl md:text-4xl font-bold mt-5 mb-15 animate-contact-item'>
              Contact Us
            </h2>

            <div className='animate-contact-item flex mb-8 gap-5 items-end'>
              <i className='bi bi-telephone text-2xl'></i>

              <div>
                <p className='text-black/80 font-medium'>
                  LET&apos;S TALK
                </p>

                <h4 className='font-semibold text-lg hover:text-prim-dark transition cursor-pointer'>
                  +0123-456-7890
                </h4>
              </div>
            </div>

            <div className='animate-contact-item flex mb-8 gap-5 items-end'>
              <i className='bi bi-envelope text-2xl'></i>

              <div>
                <p className='text-black/80 font-medium'>
                  SAY HI!
                </p>

                <h4 className='font-semibold text-lg hover:text-prim-dark transition cursor-pointer'>
                  support@store.com
                </h4>
              </div>
            </div>

            <div className='animate-contact-item flex mb-8 gap-5 items-end'>
              <i className='bi bi-geo-alt text-2xl'></i>

              <div>
                <p className='text-black/80 font-medium'>
                  STORE ADDRESS
                </p>

                <h4 className='font-semibold text-lg'>
                  1010 Avenue of the Moon, New York, NY 10019
                </h4>
              </div>
            </div>

            <div className='animate-contact-item flex gap-4 mt-8 px-10'>
              <div className='hover:text-prim-dark hover:-translate-y-1 transition'>
                <Link href="https://www.facebook.com/" className='cursor-pointer'>
                  <i className='bi bi-facebook '></i>
                </Link>
              </div>

              <div className='hover:text-prim-dark hover:-translate-y-1 transition'>
                <Link href="https://www.x.com/" className='cursor-pointer'>
                  <i className='bi bi-twitter-x '></i>
                </Link>
              </div>

              <div className='hover:text-prim-dark hover:-translate-y-1 transition'>
                <Link href="https://www.instagram.com/" className='cursor-pointer'>
                  <i className='bi bi-instagram '></i>
                </Link>
              </div>

              <div className='hover:text-prim-dark hover:-translate-y-1 transition'>
                <Link href="https://www.youtube.com/" className='cursor-pointer'>
                  <i className='bi bi-youtube '></i>
                </Link>
              </div>
            </div>
          </EntranceAnimation>
        </div>

        {/* Tarjetas de características - Staggered fadeUp */}
        <EntranceAnimation type="stagger" selector=".animate-feature-item" duration={0.8} stagger={0.15} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-15 gap-8'>
          <div className='animate-feature-item flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300'>
            <i className="bi bi-geo-alt text-3xl text-prim mb-2"></i>
            <h3 className='uppercase font-semibold mb-2 mt-3'>
              STORE ADDRESS
            </h3>

            <p className='text-center text-lg text-black/50 lg:w-[75%] font-medium'>
              The quickest way to get in touch is to fill out the form on this page.
            </p>
          </div>

          <div className='animate-feature-item flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300'>
            <i className="bi bi-shield-check text-3xl text-prim mb-2"></i>
            <h3 className='uppercase font-semibold mb-2 mt-3'>
              SAVE PAYMENTS
            </h3>

            <p className='text-center text-lg text-black/50 lg:w-[75%] font-medium'>
              You can pay for your order in 3 interest-free installments using Klarna.
            </p>
          </div>

          <div className='animate-feature-item flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300'>
            <i className="bi bi-headset text-3xl text-prim mb-2"></i>
            <h3 className='uppercase font-semibold mb-2 mt-3'>
              24/7 SUPPORT
            </h3>

            <p className='text-center text-lg text-black/50 lg:w-[75%] font-medium'>
              Our support team is available 24/7 to assist you with any questions or concerns you may have.
            </p>
          </div>
        </EntranceAnimation>
      </div>

      {/* Google Maps - ScaleIn */}
      <EntranceAnimation type="scaleIn" duration={0.8} className='px-2 lg:px-8 xl:px-12 py-8 lg:py-0 sm:py-16'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232559.02673210207!2d-3.844343464188269!3d40.438098610297125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e1!3m2!1ses!2ses!4v1779462336762!5m2!1ses!2ses" width="100%" height="400" loading="lazy" className="rounded-lg shadow-sm border-0"></iframe>
      </EntranceAnimation>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16'>
        {/* Formulario - Títulos */}
        <EntranceAnimation type="fadeUp" duration={0.8} className='flex flex-col items-center justify-center mb-10'>
          <span className='text-lg mb-3 text-prim font-medium'>
            Keep in touch with us
          </span>

          <h2 className='text-3xl md:text-4xl font-bold'>
            Let&apos;s get in touch with us
          </h2>
        </EntranceAnimation>

        {/* Formulario - Inputs y Textarea */}
        <div className='flex flex-col lg:flex-row gap-8'>
          <EntranceAnimation type="fadeRight" duration={0.8} className='w-full lg:w-1/2'>
            <div className='space-y-6'>
              <div>
                <input
                  type="text"
                  placeholder="Your full name"
                  className='outline-none border border-gray-300 w-full px-5 py-3 rounded-md focus:border-prim transition-all duration-300'
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className='outline-none border border-gray-300 w-full px-5 py-3 rounded-md focus:border-prim transition-all duration-300'
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Your Phone Number"
                  className='outline-none border border-gray-300 w-full px-5 py-3 rounded-md focus:border-prim transition-all duration-300'
                />
              </div>

              <div className='flex gap-5 items-start'>
                <input
                  type="checkbox"
                  className='outline-none mt-1 text-prim'
                />

                <p className='text-black/50 text-sm md:text-base font-medium select-none'>
                  I accept the terms & conditions and I understand that my data will be hold securely in accordance with the privacy policy
                </p>
              </div>
            </div>
          </EntranceAnimation>

          <EntranceAnimation type="fadeLeft" duration={0.8} className='w-full lg:w-1/2 flex flex-col justify-between'>
            <textarea
              rows={7}
              placeholder="Your message"
              className='px-5 py-3 outline-none border border-gray-300 w-full rounded-md focus:border-prim transition-all duration-300'
            />

            <div className='mt-5'>
              <button
                className='uppercase bg-prim text-white px-6 py-3 rounded-md transition-all duration-300 cursor-pointer hover:bg-black font-semibold tracking-wider'
              >
                Send Message
              </button>
            </div>
          </EntranceAnimation>
        </div>
      </div>
    </>
  )
}

export default Contact
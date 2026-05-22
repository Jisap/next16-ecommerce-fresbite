"use client"

import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import { useState } from 'react';

const ShoppingData = [
  {
    question: "How can I contact you?",
    answer: "You can reach our customer care team through multiple channels: fill out our contact form on the website, email us at hello@yourstore.com, or call/WhatsApp us at +XX XXX XXX XXXX. Our team is available Monday to Friday, 9 AM to 6 PM (GMT-5), and we aim to respond within 24 hours. For urgent questions about your organic order (frescura, certificaciones, ingredientes), mention 'Priority: Organic Order' in your message for faster assistance."
  },
  {
    question: "What is your return policy?",
    answer: "We stand behind the quality of our organic products. If you're not completely satisfied, you have up to 90 days from delivery to request a return. For perishable items (frutas, verduras, lácteos), please report any issue within 48 hours of receipt with photos for immediate resolution. Non-perishable items can be returned in their original packaging. Once we receive and verify the return, your refund will be processed within 5-7 business days to your original payment method. No questions asked."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We offer flexible and secure payment options: all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, bank transfers, and local payment methods depending on your region. For orders over $100, we also offer installment plans with 0% interest (subject to approval). All transactions are protected with SSL encryption and PCI-DSS compliance. Prices are shown in your local currency with real-time conversion."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is prepared and shipped, you'll receive a confirmation email with a tracking number and a direct link to monitor your package in real-time. For fresh organic products, we partner with logistics providers that prioritize temperature-controlled transport. You can also track your order anytime by logging into your account and visiting 'My Orders'. If your delivery includes perishables, you'll receive an SMS notification 1 hour before arrival to ensure someone is home to receive it."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 40 countries worldwide. International delivery times vary by destination (typically 5-12 business days) and are calculated at checkout. Please note that customs duties, taxes, or import fees may apply depending on your country's regulations—these are the responsibility of the recipient. For organic certifications to be recognized internationally, we include all necessary documentation with your shipment. Due to freshness constraints, some perishable items may not be available for certain destinations; our system will notify you during checkout if this applies."
  }
];

const Faqs = () => {

  const [openShopping, setOpenShopping] = useState<number | null>(null);

  const toggleShopping = (index: any) => {
    setOpenShopping(openShopping === index ? null : index);
  };

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
              <Link href="/UI-components/Pages/Faqs">Faq's</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
            Faq's
          </h2>
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 pb-8 pt-8 sm:pt-16'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='w-full lg:w-1/3 lg:sticky h-full top-0 left-0'>
            <span className='text-lg font-medium uppercase'>Most common question</span>

            <h2 className='text-3xl md:text-4xl font-bold mt-5 mb-15'>
              Most popular question
            </h2>

            <div className='mb-15'>
              <span className='text-lg font-medium uppercase'>
                ASK US ANYTHING
              </span>

              <div className='flex mt-3 items-center gap-3'>
                <i className='bi bi-telephone'></i>

                <div>
                  <h4 className='text-black/80 hover:text-prim-dark transition cursor-pointer'>
                    +00-1234567890
                  </h4>
                </div>
              </div>

              <div className='flex mt-3 items-center gap-3'>
                <i className='bi bi-envelope'></i>

                <div>
                  <h4 className='text-black/80 hover:text-prim-dark transition cursor-pointer'>
                    demo@support.com
                  </h4>
                </div>
              </div>
            </div>

            <div>
              <span className='text-lg font-medium uppercase'>MY ACCOUNT</span>

              <div className='mt-3 space-y-2'>
                <h4 className='font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer'>
                  COMPANY POLICIES
                </h4>

                <h4 className='font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer'>
                  PAYMENT OPTIONS
                </h4>

                <h4 className='font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer'>
                  TERMS & CONDITIONS
                </h4>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-1/1 lg:border-l border-gray-300 lg:px-18 space-y-5'>
            <h2 className='font-bold text-3xl'>
              Shopping Information
            </h2>

            <div className='space-y-4 w-full'>
              {ShoppingData.map((item, index) => (
                <div
                  key={index}
                  className={`
                    overflow-hidden py-4 transition.all duration-300
                    ${index !== ShoppingData.length - 1 ? "border-b border-gray-200" : ""}  
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggleShopping(index)}
                    className="w-full flex justify-between items-center"
                  >
                    <span className='text-md text-left md:text-lg uppercase font-medium'>
                      {item.question}
                    </span>

                    {openShopping === index ? (
                      <i className='bi bi-dash text-2xl'></i>
                    ) : (
                      <i className='bi bi-plus text-2xl'></i>
                    )}
                  </button>

                  <div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faqs
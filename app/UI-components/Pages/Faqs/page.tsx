"use client"

import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import { useState } from 'react';

const ShoppingData = [
  {
    question: "How can I contact you?",
    answer: "You can reach our customer care team through multiple channels: fill out our contact form on the website, email us at hello@yourstore.com, or call/WhatsApp us at +XX XXX XXX XXXX. Our team is available Monday to Friday, 9 AM to 6 PM (GMT-5), and we aim to respond within 24 hours."
  },
  {
    question: "What is your return policy?",
    answer: "We stand behind the quality of our organic products. If you're not completely satisfied, you have up to 90 days from delivery to request a return. For perishable items, please report any issue within 48 hours of receipt with photos. Refunds are processed within 5-7 business days."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We offer flexible and secure payment options: all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, bank transfers, and local payment methods depending on your region. For orders over $100, we also offer installment plans with 0% interest."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can also track your order anytime by logging into your account and visiting 'My Orders'. For fresh organic products, you'll receive an SMS notification 1 hour before arrival."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 40 countries worldwide. International delivery times vary by destination (typically 5-12 business days). Customs duties or import fees may apply depending on your country's regulations and are the responsibility of the recipient."
  }
];

const ExchangeData = [
  {
    question: "Can I return or exchange something in store?",
    answer: "Yes! If you have a physical store or partner location near you, you can return or exchange eligible items in person. Just bring your order confirmation and the product in its original packaging. For organic perishables, in-store exchanges are only accepted within 48 hours of delivery."
  },
  {
    question: "How do I request an exchange for a different product?",
    answer: "Log into your account, go to 'My Orders', and select 'Request Exchange'. Choose the replacement item of equal or lesser value, or pay the difference if upgrading. Once we receive the original item, we'll ship your new selection at no extra cost."
  },
  {
    question: "What if I receive a damaged or spoiled organic product?",
    answer: "If your organic produce arrives damaged or spoiled, please contact us within 48 hours with photos. We'll immediately send a replacement at no cost or issue a full refund — your choice. For non-perishable items with packaging defects, we cover return shipping."
  },
  {
    question: "Can I exchange a product after the return window has closed?",
    answer: "Our standard exchange window is 90 days from delivery. After this period, exchanges are evaluated case-by-case. If the product is non-perishable, unopened, and in resalable condition, we may still accept it for store credit."
  },
  {
    question: "Do I pay for return shipping when exchanging an item?",
    answer: "For exchanges due to our error (wrong item, damaged goods, quality issues), we provide a prepaid return label at no cost. For voluntary exchanges, return shipping is the customer's responsibility, unless you're an enrolled member of our loyalty program."
  },
  {
    question: "What about exchanges for subscription boxes or recurring orders?",
    answer: "If you receive an organic subscription box and want to exchange an item, let us know within 72 hours. We can replace the item in your next box or send a standalone replacement. Manage your subscription from your account dashboard."
  }
];

const PaymentsData = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, bank transfers, and regional payment methods. For wholesale or corporate accounts, we provide invoicing options and flexible payment terms."
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. Our checkout uses SSL/TLS encryption, 3D Secure authentication, and PCI-DSS Level 1 compliance. We never store your full credit card details — tokenization ensures your data remains protected end-to-end."
  },
  {
    question: "Can I use multiple payment methods for a single order?",
    answer: "You can combine store credit, gift cards, or loyalty points with one primary payment method to cover the remaining balance. Split payments across two cards aren't supported, but for large wholesale orders our sales team can arrange custom payment structures."
  },
  {
    question: "Do you offer payment plans or financing options?",
    answer: "For orders over $100, you can split your payment into 3, 6, or 12 interest-free installments through our partner Affirm (subject to credit approval). Corporate accounts can also negotiate custom payment terms (Net 30, Net 60) after account verification."
  },
  {
    question: "What happens if my payment is declined?",
    answer: "First verify that your card details, billing address, and CVV are correct. If the issue persists, try an alternative method. For partial failures, we'll notify you via email within 1 hour and hold your cart for 24 hours while you resolve the payment."
  },
  {
    question: "Do you charge sales tax or import duties?",
    answer: "Sales tax is calculated automatically based on your shipping address. For international orders, import duties or customs fees are not included in your checkout total and are the responsibility of the recipient upon delivery."
  },
  {
    question: "How and when will I receive my refund?",
    answer: "Refunds are processed to your original payment method within 5-7 business days after we verify the returned item. For perishable organic products reported within 48 hours, refunds are often issued immediately upon photo verification."
  }
];

type FaqItem = {
  question: string;
  answer: string;
};

type AccordionSectionProps = {
  title: string;
  data: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
};

const AccordionSection = ({ title, data, openIndex, onToggle }: AccordionSectionProps) => (
  <div className="mb-12">
    {/* Section header */}
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-black/40 whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>

    {/* Items */}
    <div>
      {data.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border-b border-gray-100 first:border-t first:border-gray-100"
          >
            <button
              type="button"
              onClick={() => onToggle(index)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-medium text-gray-900 leading-snug">
                {item.question}
              </span>

              {/* Icon circle */}
              <span
                className={`
                  shrink-0 w-6 h-6 rounded-full border flex items-center justify-center
                  transition-all duration-200
                  ${isOpen
                    ? 'border-gray-400 bg-gray-100'
                    : 'border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-50'
                  }
                `}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                >
                  <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {/* Answer */}
            <div
              className={`
                overflow-hidden transition-all duration-400 ease-in-out
                ${isOpen ? 'max-h-64 pb-4 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <p className="text-sm text-gray-500 leading-relaxed pr-10">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Faqs = () => {
  const [openShopping, setOpenShopping] = useState<number | null>(null);
  const [openExchange, setOpenExchange] = useState<number | null>(null);
  const [openPayments, setOpenPayments] = useState<number | null>(null);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<number | null>>,
    current: number | null,
    index: number
  ) => {
    setter(current === index ? null : index);
  };

  return (
    <>
      {/* Banner */}
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
              <Link href="/UI-components/Pages/Faqs">Faq&apos;s</Link>
            </li>
          </ul>

          <h2 className="text-2xl sm:text-4xl font-unbounded font-bold text-black mt-3 drop-shadow-sm text-center px-4 max-w-3xl line-clamp-2">
            Faq&apos;s
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 lg:px-8 xl:px-16 pb-16 pt-10 sm:pt-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Sidebar */}
          <aside className="w-full lg:w-56 xl:w-64 shrink-0 lg:sticky lg:top-8 lg:self-start">

            <div className="pb-6 mb-6 border-b border-gray-100">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-black/40 mb-3">
                Frequently asked
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                We&apos;re here to help
              </h2>
            </div>

            <div className="pb-6 mb-6 border-b border-gray-100">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-black/40 mb-3">
                Ask us anything
              </p>

              <div className="space-y-2">
                <a
                  href="tel:+001234567890"
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2h2.5l1 2.5L4 6c.9 1.8 2.2 3.1 4 4l1.5-1.5L12 9.5V12c-5.5.5-10.5-4.5-10-10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +00-1234567890
                </a>

                <a
                  href="mailto:demo@support.com"
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  demo@support.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-black/40 mb-3">
                My account
              </p>

              <nav className="space-y-0">
                {['Company policies', 'Payment options', 'Terms & conditions'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-center justify-between py-2.5 text-sm font-medium text-gray-600 border-b border-gray-100 last:border-0 hover:text-gray-900 transition-colors group"
                  >
                    {item}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 lg:border-l border-gray-100 lg:pl-16">
            <AccordionSection
              title="Shopping information"
              data={ShoppingData}
              openIndex={openShopping}
              onToggle={(i) => toggle(setOpenShopping, openShopping, i)}
            />
            <AccordionSection
              title="Returns & exchanges"
              data={ExchangeData}
              openIndex={openExchange}
              onToggle={(i) => toggle(setOpenExchange, openExchange, i)}
            />
            <AccordionSection
              title="Payment information"
              data={PaymentsData}
              openIndex={openPayments}
              onToggle={(i) => toggle(setOpenPayments, openPayments, i)}
            />
          </main>

        </div>
      </div>
    </>
  );
};

export default Faqs;
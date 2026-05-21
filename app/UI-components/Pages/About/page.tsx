import Image from 'next/image'
import Link from 'next/link'
import sectionbanner from "@/public/section-banner.png"
import aboutImg01 from "@/public/about-img-01.webp"
import teamImg01 from "@/public/team-01.webp"
import teamImg02 from "@/public/team-02.webp"
import teamImg03 from "@/public/team-03.webp"
import teamImg04 from "@/public/team-04.webp"


const missionData = [
  {
    icon: "bi bi-bullseye",
    title: "Our mission",
    desc: "Our mission is to make organic living more accessible by offering carefully selected products that promote health, sustainability, and a more conscious lifestyle."
  },
  {
    icon: "bi bi-crosshair",
    title: "Our vision",
    desc: "We envision a future where natural and organic products become part of everyday life, helping people and communities live healthier while protecting the planet."
  },
  {
    icon: "bi bi-headphones",
    title: "Your support",
    desc: "Our customers are at the heart of everything we do, and we are committed to providing reliable support, quality service, and products you can trust every day."
  }
]

const teamData = [
  {
    img: teamImg01,
    name: "Johnny Smith",
    role: "Founder & Organic Specialist"
  },
  {
    img: teamImg02,
    name: "Cathy Warren",
    role: "Sustainability Manager"
  },
  {
    img: teamImg03,
    name: "Daniel Green",
    role: "Nutrition & Wellness Advisor"
  },
  {
    img: teamImg04,
    name: "Emma Carter",
    role: "Customer Experience Manager"
  }
]

const features = [
  {
    icon: "bi-geo-alt",
    title: "Order tracking",
    desc: "Sigue tu pedido en tiempo real, desde la finca ecológica hasta la puerta de tu hogar."
  },
  {
    icon: "bi-arrow-counterclockwise",
    title: "90 days return",
    desc: "Hasta 90 días para devoluciones sin complicaciones si la frescura o calidad orgánica no cumple tus expectativas."
  },
  {
    icon: "bi-currency-dollar",
    title: "Money guarantee",
    desc: "Garantía de calidad 100% orgánica certificada. Reembolso total si el producto no alcanza nuestros estándares."
  },
  {
    icon: "bi-credit-card",
    title: "Flexible payment",
    desc: "Opciones de pago adaptadas a ti: cuotas sin interés, transferencia bancaria o billeteras digitales."
  },
  {
    icon: "bi-shield",
    title: "Secure checkout",
    desc: "Compra con total tranquilidad gracias a nuestra pasarela de pago encriptada y verificada por estándares internacionales."
  }
];



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

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16 bg-gray-light'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {missionData.map((item, index) => (
            <div key={index} className='flex flex-col items-center'>
              <i className={`${item.icon} text-3xl`}></i>

              <h3 className='uppercase font-medium mb-2 mt-5'>{item.title}</h3>

              <p className='text-center text-black/50 lg:w-[65%] font-medium'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16 lg:py-20'>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-lg mb-3'>Highly skiled</span>

          <h2 className='text-3xl md:text-4xl font-bold'>
            Meet our teams
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-15'>
          {teamData.map((member, index) => (
            <div key={index} className='group'>
              <div className='overflow-hidden rounded-md'>
                <Image 
                  src={member.img}
                  alt="team-image"
                  className='w-full transition-transform duration-500 ease-in-out transform-gpu group-hover:scale-110'
                />
              </div>

              <div className='text-center mt-5'>
                <h4 className='uppercase font-medium text-md'>
                  {member.name}
                </h4>

                <span className='text-black/80 font-medium'>
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='px-2 lg:px-8 xl:px-12 py-8 sm:py-16 lg:py-20 bg-gray-light'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10'>
          {features.map((item, index) => (
            <div key={index} className='group flex flex-col items-center text-center'>
              <i className={`bi ${item.icon} text-3xl transition-transform duration-500 ease-in-out group-hover:scale-x-[-1]`}></i>

              <h3 className='text-xl font-semibold mt-5'>{item.title}</h3>

              <p className='text-black/50 text-lg font-medium'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default About
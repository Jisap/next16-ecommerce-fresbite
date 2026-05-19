import Image from "next/image"
import service1 from "@/public/freshbite-service1.webp"
import service2 from "@/public/freshbite-service2.webp"
import service3 from "@/public/freshbite-service3.webp"



const Services = () => {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 relative py-8">
        <div className="bg-gray-light p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 rounded-sm">
          <div className="service-item flex items-center flex-col sm:flex-row gap-8">
            <div className="service-image h-30 w-34">
              <Image src={service1} alt="service1" className="w-full h-full object-contain" />
            </div>

            <div className="service-content sm:text-start text-center">
              <span className="shadow-2xl bg-white rounded-2xl p-2 w-8 h-8">01</span>
              <h4 className="text-xl font-medium pt-3">Best quality</h4>
              <p className="text-gray-600 max-w-55">Not only fast for us quality is also number one</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
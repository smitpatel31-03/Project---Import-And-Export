import React from 'react'

function HeroSection() {
  return (
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
              Savi<span className="text-black">Import And Export</span>
              </h1>
              <p className="text-lg text-blue-700 mt-2 font-semibold">
                Connecting Worlds, Exporting Opportunities!!
              </p>
              <p className="mt-4 text-gray-700 text-lg">
                Boost global business with our highly recommended trading company.
              </p>
            </div>
    
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src='https://i0.wp.com/scikiq.com/blog/wp-content/uploads/2023/07/image-8.png?resize=630,416&ssl=1'
                alt="Trade Global"
                className="w-full"
              />
            </div>
    </div>
  )
}

export default HeroSection

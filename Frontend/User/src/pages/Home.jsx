import React, { useEffect, useState } from 'react'
import services from '../services/config'
import { CatagoryCard,HeroSection } from '../components/index.js'

function Home() {
    const [catagory,setCatagory] = useState([])

    useEffect(()=>{
        const fetchCatagory = async() => {
            const data = await services.getAllCatagory().then((cat)=>{
                if(cat){
                    setCatagory(cat)
                }
            })
        }

        fetchCatagory();
    },[])

    
  return (
    <div className='w-full h-scree'>
     <section className="bg-blue-100 min-h-screen flex items-center justify-center">
     <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
              Savi<span className="text-black">Import And Export.</span>
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
    </section>
    <section>
  <div className="bg-[#000B40] py-12">
    <div className="max-w-6xl mx-auto text-center text-white">
      <h2 className="text-3xl font-bold mb-8">Services</h2>
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {catagory && catagory.map((catagory, index) => (
          <CatagoryCard key={index} catagory={catagory} />
        ))}
      </div>
    </div>
  </div>
</section>

    <section className="bg-blue-100 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20165.jpg" 
            alt="About TradeLinkGlobal"
            className="w-full"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            About <span className="text-black">Savi import export</span>
          </h2>
          <p className="text-xl text-black font-semibold mt-3">
            Insights and Resources to help drive your Business Forward Faster.
          </p>
          <p className="mt-4 text-gray-700 text-lg">
            We build results-oriented brand strategy and continually refine the
            campaign for the greatest outcome. From full-scale branding
            strategy, we are reaching almost desired buyers throughout the
            world.
          </p>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Home

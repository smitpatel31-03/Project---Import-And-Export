import React,{useState,useEffect} from 'react'
import CategoryCard from '../components/CatagoryCard'
import services from '../services/config'
import { Link } from 'react-router-dom'

function Catagories() {
    const [catagory,setCatagory] = useState([])

    console.log(catagory);
    
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
    <div>
      <div className="bg-[#000B40] py-12">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Services</h2>
        <div className="grid md:grid-cols-3 gap-6 px-4">
        {catagory && catagory.map((catagory)=>(
          <Link to={`/catagoryDetail/${catagory._id}`}>
            <CategoryCard catagory={catagory}/>
          </Link>
        ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Catagories

import React,{useState} from 'react'
import { CatagoryForm,CatagoryImage } from '../components/index.js'

function ChangeCatagoryDetail({catagory,initialDetail,initialImage}) {
    const [details, setDetails] = useState(initialDetail)
    const [image, setImage] = useState(initialImage)


    
    if(details){
        return (
            <div>
              <CatagoryForm catagory={catagory} />
            </div>
          )
    }
    else if(image){
        return(
            <div>
                <CatagoryImage catagory={catagory}/>
            </div>
        )
    }
    else{
        return(
            <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center items-center'>
            <p className="text-white text-lg">No Catagory selected</p>
        </div>
        )
    }
  
}

export default ChangeCatagoryDetail

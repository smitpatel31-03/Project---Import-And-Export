import React,{useState} from "react";
import {ProductForm,ProductFeatureImage,
  ProductPhotos} from '../components/index.js'

function ChangeProductDetail({ product, initialDetail = false, initialImage = false, initialPhotos = false }) {
  const [detail, setDetail] = useState(initialDetail)
  const [image, setImage] = useState(initialImage)
  const [photos, setPhotos] = useState(initialPhotos)

  if(detail){
    return(

      <ProductForm Product={product}/>
    )
  }
  else if(image){
    return(

      <ProductFeatureImage product={product} />
    )
  }
  else if(photos){
    return(

      <ProductPhotos product={product}/>
    )
  }
  else{
    return(
      <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center items-center'>
                <p className="text-white text-lg">No product selected</p>
            </div>
    )
  }

}

export default ChangeProductDetail;

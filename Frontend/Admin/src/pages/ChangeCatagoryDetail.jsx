import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router'
import { CatagoryForm } from '../components/index.js'
import service from '../services/config.js'

function ChangeCatagoryDetail() {
    const {id} = useParams()
    
    const [catagory,setCatagory] = useState()

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            const data = await service.catagoryDetailsOrListOfCatagorysProduct(id);
            if (data) {
                setCatagory(data);
                
            }
        };
        fetchCategoryDetails();
    }, [id]);

    console.log('catagory :',catagory);
    


  return (
    <div>
      <CatagoryForm catagory={catagory}/>
    </div>
  )
}

export default ChangeCatagoryDetail


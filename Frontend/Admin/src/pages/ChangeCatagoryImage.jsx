import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router'
import { CatagoryImage } from '../components/index.js'
import service from '../services/config.js'

function ChangeCatagoryImage() {
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

  return (
    <div>
      <CatagoryImage catagory={catagory}/>
    </div>
  )
}

export default ChangeCatagoryImage



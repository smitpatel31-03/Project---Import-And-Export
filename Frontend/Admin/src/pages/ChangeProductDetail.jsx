import React,{useEffect,useState} from 'react'
import {ProductForm} from '../components/index.js'
import { useParams } from 'react-router';
import service from '../services/config.js';

function ChangeProductDetail() {
  const {id} = useParams()
  const [product,setProduct] = useState()

  useEffect(() => {
    const fetchProductData = async () => {
        try {
            const prod = await service.getProductsDetails(id);
            if (prod) {
              setProduct(prod);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }

    };

    fetchProductData();
}, [id]);
  return (
    <div>
      <ProductForm Product={product}/>
    </div>
  )
}

export default ChangeProductDetail

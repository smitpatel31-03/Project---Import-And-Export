import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router';
import service from '../services/config.js';
import { ProductPhotos } from '../components/index.js';

function AddImagesToProduct() {
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
      <ProductPhotos product={product}/>
    </div>
  )
}

export default AddImagesToProduct

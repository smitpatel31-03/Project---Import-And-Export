import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
function BookProduct() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const prod = await services.getProductDetails(id);

                if (prod) {
                    setProductDetails(prod);
                    console.log(prod);
                    
                }

            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductData();
    }, [id]);

    if (!productDetails) {
        return (
            <div className="text-center p-10 text-xl font-bold">
                No Product Found
            </div>
        );
    }

  return (
    <div>
      book
    </div>
  )
}

export default BookProduct

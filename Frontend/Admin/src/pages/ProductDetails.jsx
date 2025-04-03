import React, { useState, useEffect } from 'react';
import { Button } from '../components/index.js';
import service from '../services/config.js';
import { useNavigate, useParams } from 'react-router';
import { ChangeProductDetail } from './index.js'

function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [featuredImage, setFeaturedImage] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const prod = await service.getProductsDetails(id);
                if (prod) {
                    setProductDetails(prod);
                    setFeaturedImage(prod.featuedImages);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }

        };

        fetchProductData();
    }, [id]);

  

    

    if (!productDetails) {
        return (
            <div className='w-full h-screen flex items-center justify-center bg-zinc-800 text-white'>
                <h1 className='text-2xl font-bold'>Product Not Found</h1>
            </div>
        );
    }

        return (
            <div className='w-full min-h-screen bg-zinc-800 text-white p-8 flex flex-col items-center'>
                <h1 className='text-4xl font-extrabold text-white mb-6'>{productDetails.name}</h1>

                <div className='flex w-full max-w-5xl gap-10'>
                    <div className='w-2/3'>
                        <div className='w-full h-80 rounded-lg overflow-hidden shadow-lg'>
                            <img
                                src={featuredImage}
                                alt={productDetails.name}
                                className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                            />
                        </div>

                        <div className='flex gap-3 mt-4'>
                            {productDetails.photos && productDetails.photos.map((image, index) => (
                                <div
                                    key={index}
                                    className='w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-blue-500 cursor-pointer transition-all'
                                    onClick={() => setFeaturedImage(image)}
                                >
                                    <img src={image} alt={`photo-${index}`} className='w-full h-full object-cover' />
                                </div>
                            ))}
                            <div
                                className='w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-blue-500 cursor-pointer transition-all'
                                onClick={() => setFeaturedImage(productDetails.featuedImages)}>
                                <img src={productDetails.featuedImages} alt={productDetails.name} />
                            </div>
                        </div>
                    </div>

                    <div className='w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg space-y-4'>
                        <h2 className='text-xl font-semibold'><span className='text-gray-400'>Price:</span> <span className='text-green-400'>$ {productDetails.price}</span></h2>
                        <h2 className='text-xl font-semibold'><span className='text-gray-400'>Product ID:</span> {productDetails.productId}</h2>
                        <h2 className='text-xl font-semibold'><span className='text-gray-400'>Stock:</span> {productDetails.stock}</h2>
                    </div>
                </div>

                <div className='mt-8 w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg text-white text-lg'>
                    <p>{productDetails.description}</p>
                </div>

                <div className='mt-6 flex gap-4'>
                    <Button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>navigate(`/changeProductDetails/${id}`)}>Update Product Details</Button>
                    <Button className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>navigate(`/ChangeProductFeatureImage/${id}`)}>Change Featured Image</Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>navigate(`/addImagesToProduct/${id}`)}>Add Photos</Button>
                </div>

            </div>
        );
  
}

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import services from '../services/config';

function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [featuredImage, setFeaturedImage] = useState("");
    const [photos, setPhotos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const prod = await services.getProductDetails(id);
                if (prod) {
                    setProductDetails(prod);
                    setFeaturedImage(prod.featuedImages);
                    setPhotos(prod.photos || []);
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
        <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-purple-900 min-h-screen flex justify-center items-center p-6">
            <div className="max-w-5xl w-full shadow-lg border border-gray-300 flex flex-col md:flex-row gap-6 p-6 rounded-lg bg-white bg-opacity-60">
                {/* Left Section - Images */}
                <div className="w-full md:w-1/2">
                    <img 
                        src={featuredImage} 
                        alt={productDetails.name} 
                        className="w-full h-96 object-cover border p-2 rounded-lg" 
                    />
                    <div className="flex gap-2 mt-4">
                        {photos.map((photo, index) => (
                            <img 
                                key={index} 
                                src={photo} 
                                alt="Thumbnail" 
                                className="w-16 h-16 border cursor-pointer hover:border-blue-500 rounded-md"
                                onClick={() => setFeaturedImage(photo)} 
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section - Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{productDetails.name}</h2>
                        <p className="text-gray-600 text-lg mt-2">Product ID: <span className="font-semibold">{productDetails.productId}</span></p>
                        <p className="text-2xl font-semibold text-green-600 mt-4">Price: ${productDetails.price}</p>

                        {/* Product Description */}
                        <div className="mt-6 text-gray-700">
                            <h3 className="text-xl font-semibold">Description</h3>
                            <p className="mt-2">{productDetails.description}</p>
                        </div>
                    </div>
                    
                    <button 
                        className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition"
                        onClick={() => navigate(`/bookproduct/${id}`)} 
                    >
                        Book Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

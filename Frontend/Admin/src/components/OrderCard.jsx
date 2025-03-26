import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({ _id, CurruntOrder, status, statusLocation }) {
    const productName = CurruntOrder?.product?.name || "Unknown Product";
    const productFeatuedImages = CurruntOrder?.product?.featuedImages || [];
    const productImage = Array.isArray(productFeatuedImages) ? productFeatuedImages[0] : productFeatuedImages;

    return (
        <Link to={`/OrderDetails/${_id}`} className="block">
            <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center hover:shadow-lg transition duration-300">
                
                {/* Left Side: Product Image */}
                <div className="w-1/4 h-40 overflow-hidden rounded-lg">
                    <img
                        src={productImage || "/placeholder-image.jpg"} 
                        alt={productName}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Right Side: Order Details */}
                <div className="w-3/4 pl-4">
                    <h2 className="text-lg font-bold text-white">{productName}</h2>
                    <p className="text-sm text-gray-400 mt-1">Status: {status || "Pending"}</p>
                    <p className="text-sm text-gray-500">Location: {statusLocation || "Unknown"}</p>
                </div>

            </div>
        </Link>
    );
}

export default OrderCard;

import React from 'react';
import { Link } from 'react-router-dom'; // Fixed incorrect import

function ProductCard({ _id, featuedImages, name, productId }) {
  
  
  return (
    <Link to={`/ProductDetails/${_id}`}>
      <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition duration-300">
        
        <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
          <img
            src={featuedImages}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-white">{name}</h2>
          <h3 className="text-sm text-gray-400 mt-1">ID: {productId}</h3>
        </div>
        
      </div>
    </Link>
  );
}

export default ProductCard;

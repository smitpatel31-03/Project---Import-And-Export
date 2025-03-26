import React from "react";

const ProductCard = ({ product }) => {
    console.log(product);
    
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl shadow-lg p-6 flex flex-col items-start space-y-4 w-80">
      <h3 className="text-white text-xl font-semibold">{product.name}</h3>
      <img src={product.featuedImages} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
      <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
        Checkout →
      </button>
    </div>
  );
};

export default ProductCard;

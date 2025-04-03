import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
    
    const [productConvertedRatePrice, setProductConvertedRatePrice] = useState(null);
    const convertedRate = useSelector((state) => state?.curruncyConvert?.convertedValue);

    useEffect(() => {
        if (convertedRate && product?.price) {
            setProductConvertedRatePrice(Math.floor(convertedRate * product?.price));
        }
    }, [convertedRate, product?.price]);

    return (
        <div className="bg-gradient-to-r from-zinc-400 to-gra-600 rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 w-80 transition-transform transform hover:scale-105">
            <h3 className="text-white text-lg font-bold">{product?.name}</h3>
            
            <img 
                src={product?.featuedImages} 
                alt={product?.name} 
                className="w-full h-40 shadow-md "
            />

            <div className="w-full text-white bg-zinc-800 p-3 rounded-lg shadow-md text-center">
                <div className="text-lg font-semibold">Your Rate: {productConvertedRatePrice ?? "N/A"}</div>
                <div className="text-sm">USD Rate: {product?.price}</div>
            </div>

            <button className="bg-white text-black- px-5 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
                Checkout →
            </button>
        </div>
    );
};

export default ProductCard;

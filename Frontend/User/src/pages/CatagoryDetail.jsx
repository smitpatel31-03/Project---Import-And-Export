import React, { useState, useEffect } from 'react';
import service from '../services/config.js';
import { Link, useParams } from 'react-router';
import {ProductCard} from '../components/index.js' 

function CatagoryDetail() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            const data = await service.getCatagoryDetails(id);
            if (data) {
                setCategory(data);
                console.log('data :',data);
                
                setProducts([data.products] || []);
            }
        };
        fetchCategoryDetails();
    }, [id]);

    if (!category) {
        return <div className="text-center text-white text-2xl">No Category Found</div>;
    }

    console.log('category :',category);
    console.log('product :',products);
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-700 via-blue-900 to-gray-900 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Category Details with Glassmorphism Effect */}
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-10 text-center border border-white/20">
              <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                {category.name}
              </h1>
              <img
                src={category.image}
                alt={category.name}
                className="w-full max-h-80 object-cover rounded-2xl my-6 shadow-lg"
              />
              <p className="text-lg text-white/90">{category.description}</p>
            </div>
    
            {/* Featured Products Section */}
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-6">
                Featured Products
              </h2>
    
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((item, index) => (
                    <ProductCard key={index} product={item} />
                  ))}
                </div>
              ) : (
                <p className="text-white text-center text-lg">No products available.</p>
              )}
            </div>
          </div>
        </div>
      );
}

export default CatagoryDetail;
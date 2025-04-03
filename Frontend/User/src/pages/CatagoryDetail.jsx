import React, { useState, useEffect } from 'react';
import service from '../services/config.js';
import { Link, useParams } from 'react-router';
import { ProductCard } from '../components/index.js';

function CatagoryDetail() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            const data = await service.getCatagoryDetails(id);
            if (data) {
                setCategory(data);
                console.log('data :', data);
                setProducts(data.products || []);
            }
        };
        fetchCategoryDetails();
    }, [id]);

    if (!category) {
        return <div className="text-center text-white text-2xl">No Category Found</div>;
    }

    console.log('category :', category);
    console.log('product :', products);

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-700  to-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Category Details with Left-Aligned Image & Right-Aligned Text */}
                <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center md:items-start border border-white/20">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full md:w-1/2 max-h-80 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="md:ml-8 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
                            {category.name}
                        </h1>
                        <p className="text-lg text-white/90">{category.description}</p>
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-6 text-center">
                        Featured Products
                    </h2>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                            {products.map((item, index) => (
                                <div key={index} className="w-full sm:w-72 md:w-80 p-4">
                                    <ProductCard product={item} />
                                </div>
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

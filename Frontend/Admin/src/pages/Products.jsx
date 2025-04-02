import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import service from '../services/config.js';
import { Container, ProductCard, Button } from '../components/index.js';

function Products() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await service.getAllProducts();
                if (Array.isArray(products.data)) {
                    setProduct(products.data);
                } else {
                    setProduct([products.data]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='w-full min-h-screen bg-zinc-800 text-white py-8'>
            <Container>
                {/* Title & Add Product Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products</h1>
                    
                </div>

                {/* Product Cards */}
                {product.length === 0 ? (
                    <div className="text-center text-xl text-gray-400">No Products Found</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {product.map((prod) => (
                            <ProductCard key={prod._id} product={prod} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Products;

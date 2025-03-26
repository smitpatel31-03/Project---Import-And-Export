import React, { useState, useEffect } from "react";
import { ProductCard } from "../components/index.js"; 
import services from "../services/config";
import { Link } from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState([]); // Ensure state is always an array

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const prod = await services.getAllProduct();
                if (Array.isArray(prod)) {
                    setProduct(prod); // Set the product state only if it's an array
                } else {
                    setProduct([prod]); // Fallback to an empty array
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProduct([]); // Ensure we don't pass undefined to map
            }
        };

        fetchProducts();
    }, []);

    

    return (
        <section className="bg-cover bg-center min-h-screen p-8 bg-zinc-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                    <h2 className="text-3xl font-bold text-white">Products</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product?.length > 0 ? (
                        product.map((item, index) => (
                            <Link to={`/productDetails/${item._id}`}>
                            <ProductCard key={index} product={item} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-white">No products available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Product;

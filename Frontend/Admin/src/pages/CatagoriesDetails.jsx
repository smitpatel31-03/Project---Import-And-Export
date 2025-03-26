import React, { useState, useEffect } from 'react';
import { ProductCard, Container,Button } from '../components/index.js';
import service from '../services/config.js';
import { useParams } from 'react-router';
import{ ChangeCatagoryDetail } from './index.js';

function CategoriesDetails() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [showComponent, setShowComponent] = useState()

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            const data = await service.catagoryDetailsOrListOfCatagorysProduct(id);
            if (data) {
                setCategory(data);
                setProducts([data.products] || []);
            }
        };
        fetchCategoryDetails();
    }, [id]);

    if (!category) {
        return <div className="text-center text-white text-2xl">No Category Found</div>;
    }

    const handleShowComponent = (type) => {
        setShowComponent(type)
    }

    return (
        <div className="bg-gray-900 w-full min-h-screen text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-6">{category.name}</h1>
            <div className="flex flex-col lg:flex-row bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Left Section - Category Image */}
                <div className="w-full lg:w-2/3 p-4">
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-64 object-cover rounded-lg shadow-md" 
                    />
                    <div className="flex gap-2 mt-4">
                        {category.images?.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt="Category Thumbnail" 
                                className="w-10 h-16 object-cover border border-gray-700 rounded-md cursor-pointer hover:opacity-80" 
                            />
                        ))}
                    </div>
                </div>
                
                {/* Right Section - Details */}
                <div className="w-full lg:w-1/3 p-4 bg-gray-700 rounded-lg shadow-md">
                    <p className="text-lg"><strong>Price:</strong> <span className="text-green-400">$100</span></p>
                    <p className="text-lg"><strong>Product ID:</strong> <span className="font-bold">C01</span></p>
                    <p className="text-lg"><strong>Stock:</strong> <span className="font-bold">9999498</span></p>
                </div>
            </div>

            <div className="bg-gray-800 text-lg p-4 mt-6 rounded-md shadow-md">
                {category.description}
            </div>
            
            <div className="flex gap-4 mt-6">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={()=>handleShowComponent('details')}>Update Category</Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={()=>handleShowComponent('image')}>Change Image</Button>
                <Button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => navigate(`/add-product/${id}`)}
                    >
                        + Add Product
                    </Button>
            </div>
            
            <Container>
                <h2 className="text-3xl font-bold mb-6 mt-10 text-gray-100 border-b border-gray-700 pb-2">Products</h2>
                {products.length === 0 ? (
                    <div className="p-6 text-xl font-semibold text-gray-400">No Products Found</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((prod) => (
                            <ProductCard key={prod._id} {...prod} />
                        ))}
                    </div>
                )}
            </Container>

            {showComponent && (
                <ChangeCatagoryDetail
                catagory={category}
                initialDetail={showComponent==='details'}
                initialImage={showComponent==='image'}
                />
            )}
        </div>
    );
}

export default CategoriesDetails;

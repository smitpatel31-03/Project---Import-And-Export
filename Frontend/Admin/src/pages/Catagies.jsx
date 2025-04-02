import React, { useEffect, useState } from 'react';
import service from '../services/config.js';
import { CatagoriesCard, Container,Button } from '../components/index.js';
import {useNavigate} from 'react-router'

function Catagies() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await service.getAllCatagories();

                
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        

        fetchCategories();
    }, []);

    
    

    return (
        <div className="w-full min-h-screen text-center bg-zinc-800 text-white p-6">
            <Container>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <Button
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate(`/addCatagory`)}
                    >
                        + Add Category
                    </Button>
                   
                </div>

                {categories.length === 0 ? (
                    <div className="p-4 text-xl font-semibold text-gray-400">
                        Categories Not Found
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {categories.map((category) => (
                            <div key={category?._id} className="p-2 w-1/4">
                                <CatagoriesCard Catagory={category} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
           
        </div>
    );
}

export default Catagies;

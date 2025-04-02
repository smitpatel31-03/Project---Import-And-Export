import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Services from '../services/config.js';
import { useForm } from 'react-hook-form';
import { Button } from '../components/index.js';
import { useSelector } from 'react-redux';
import authServices from '../services/auth.js';
import services from '../services/config.js';

function BookProduct() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [address, setAddress] = useState([]);
    const { register, handleSubmit } = useForm();
    const data = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const prod = await Services.getProductDetails(id);
                if (prod) setProductDetails(prod);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductData();
    }, [id]);

    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const add = await authServices.findUserAddress(data);
                setAddress(Array.isArray(add) ? add : []);
            } catch (error) {
                console.error("Error fetching user address:", error);
            }
        };
        fetchUserAddress();
    }, [data]);

    const submit = async (formdata) => {
        try {
            const result = await services.bookOrder(id, { ...formdata });
            if (result) navigate('/');
        } catch (error) {
            console.error("Something went wrong while booking order:", error);
        }
    };

    if (!productDetails) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-500">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row">
                {/* Product Image & Info */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">{productDetails.name}</h1>
                    <img 
                        className="w-full h-80 object-cover rounded-lg mt-4 shadow-md"
                        src={productDetails?.featuedImages} 
                        alt={productDetails?.name} 
                    />
                    <p className="mt-3 text-lg text-green-600 font-semibold">Price: ${productDetails.price}</p>
                </div>
                
                {/* Form Section */}
                <div className="md:w-1/2 p-6">
                    <form onSubmit={handleSubmit(submit)} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                            <input 
                                type="number" 
                                min="1" 
                                defaultValue="1" 
                                {...register("quantity")} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Select Address</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {address.map((addr) => (
                                    <label key={addr?._id} className="cursor-pointer border p-3 rounded-lg bg-gray-100 shadow-sm hover:bg-blue-100">
                                        <input type="radio" {...register("address")} value={addr?._id} className="hidden" />
                                        <div className="p-2 bg-white rounded-lg shadow-md">
                                            <p className="font-semibold">{addr.addressLine1}, {addr.addressLine2}</p>
                                            <p>{addr.city}, {addr.state} - {addr.zipcode}, {addr.country}</p>
                                            <p className="text-blue-600">{addr.phone}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <Button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition">Book Order</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookProduct;

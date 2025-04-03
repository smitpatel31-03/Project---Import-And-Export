import React, { useState, useEffect } from 'react';
import service from '../services/config';
import { Button,OrderForm } from '../components/index.js';
import { useNavigate, useParams } from 'react-router';

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const data = await service.getOrderDetails(id);
            if (data) {
                setOrder(data);
            }
        };

        fetchOrderDetails();
    }, [id]);

    console.log("order :",order);
    

    if (!order) {
        return <h1 className="text-center text-white mt-10">No Order Found</h1>;
    }


    return (
        <div className="w-full min-h-screen bg-gray-900 p-6">
            <div className="grid md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-center">
                    <img 
                        src={order?.CurruntOrder?.product?.featuedImages} 
                        alt={order?.CurruntOrder?.product?.name} 
                        className="w-80 h-52 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="text-white">
                    <h1 className="text-2xl font-bold">{order?.CurruntOrder?.product?.name}</h1>
                    <p className="text-gray-400 mt-2">Product ID: {order?.CurruntOrder?.product?.productId}</p>
                    <p className="text-gray-400">Category: {order?.CurruntOrder?.product?.catagories?.name}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                
                 <div className="text-white">
                 <h2 className="text-xl font-semibold">Order Details</h2>
                 <p className="text-gray-400 mt-2">Status: {order?.status}</p>
                 <p className="text-gray-400">Location: {order?.statusLocation}</p>
                 
             </div>
               
                <div>
                    
                    <div className="text-white">
                        <h2 className="text-xl font-semibold">User Details</h2>
                        <p className="text-gray-400 mt-2">{order?.CurruntOrder?.user?.fullName}</p>
                        <p className="text-gray-400">{order?.CurruntOrder?.user?.email}</p>
                        <p className="text-gray-400">{order?.CurruntOrder?.user?.country}</p>
                    </div>
                

                    <div className="mt-4 text-white">
                        <h2 className="text-xl font-semibold">Delivery Address</h2>
                        <p className="text-gray-400 mt-2">{order?.CurruntOrder?.delivryaddress?.addressLine1}</p>
                        <p className="text-gray-400">{order?.CurruntOrder?.delivryaddress?.addressLine2}</p>
                        <p className="text-gray-400">{order?.CurruntOrder?.delivryaddress?.city}, {order?.CurruntOrder?.delivryaddress?.state}</p>
                        <p className="text-gray-400">{order?.CurruntOrder?.delivryaddress?.postalCode}, {order?.CurruntOrder?.delivryaddress?.country}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <Button onClick={()=>navigate(`/UpdateOrderDetails/${id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition">Update Order Details</Button>
            </div>
        </div>
    );
}

export default OrderDetails;

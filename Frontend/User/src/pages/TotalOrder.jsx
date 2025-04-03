import React, { useState, useEffect } from 'react';
import services from '../services/config';
import { OrderCard } from '../components/index.js';
import { Link } from 'react-router';

function TotalOrder() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const ord = await services.getOrder();
            
                if(Array.isArray(ord)){
                    setOrder(ord[0]?.totalorders)
                }
                else if(ord){
                    setOrder([ord[0]?.totalorders])
                }
                else{
                    setOrder([])
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
    
        fetchOrder();
    }, []);


    
    

    return (
        <section className="bg-cover bg-center min-h-screen p-8 bg-zinc-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                    <h2 className="text-3xl font-bold text-white">Orders</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order?.length > 0 ? (
                        order?.map((item, index) => (
                            <Link to={`/orderDetails/${item?._id}`}>
                                <OrderCard key={index} order={item} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-white">No products available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TotalOrder;

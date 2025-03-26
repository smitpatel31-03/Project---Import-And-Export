import React, { useState, useEffect } from 'react';
import service from '../services/config.js';
import { Container, OrderCard } from '../components/index.js';

function Order() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await service.getCurruntOrders();
                if (Array.isArray(orders)) {
                    setOrder(orders);
                } else {
                    setOrder([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='w-full min-h-screen bg-zinc-800 text-white py-8'>
            <Container>
                <h1 className="text-3xl font-bold mb-6">Orders</h1>

                {order.length === 0 ? (
                    <div className="text-center text-xl text-gray-400">No Orders Found</div>
                ) : (
                    <div className="space-y-4">
                        {order.map((ord) => (
                            <div key={ord._id} className="w-full">
                                <OrderCard {...ord} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Order;

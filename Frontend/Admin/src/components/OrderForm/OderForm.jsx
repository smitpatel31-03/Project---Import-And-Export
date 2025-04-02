import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import service from '../../services/config.js';
import { Input, Select, Button } from '../index.js';
import services from '../../services/config.js';

function OrderForm({ Order }) {
    const [orderDetails, setOrderDetails] = useState(null);
    const { register, handleSubmit, reset } = useForm({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const data = await service.getOrderDetails(Order);
            if (data) {
                setOrderDetails(data);
            }
        };
        fetchOrderDetails();
    }, [Order]);

    useEffect(() => {
        if (orderDetails) {
            reset({
                status: orderDetails?.status || "",
                statusLocation: orderDetails?.statusLocation || ""
            });
        }
    }, [orderDetails, reset]);

    const submit = async (data) => {
        const dbOrder = await services.updateOrderDetails(Order, data);
        if (dbOrder) {
            navigate(`/OrderDetails/${Order}`);
        }
    };

    if (!orderDetails) {
        return <h1 className="text-white text-center mt-10 text-2xl">Order Not Found</h1>;
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-2/3 mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Update Order Status</h2>
            
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-1">Status</label>
                <Select
                    options={["PENDING", "PROCESSING", "SHIPPED", "IN TRANSIT", "CUSTOMS CLEARANCE", "DELIVERED", "CANCELLED", "FAILED"]}
                    className="w-full p-2 border border-gray-600 bg-gray-900 text-black rounded-md"
                    {...register("status", { required: true })}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-1">Status Location</label>
                <Input
                    placeholder="Enter Status Location"
                    className="w-full p-2 border border-gray-600 bg-gray-900 text-black rounded-md"
                    {...register("statusLocation", { required: true })}
                />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition duration-200">
                Update
            </Button>
        </form>
    );
}

export default OrderForm;

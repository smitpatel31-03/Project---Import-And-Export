import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import services from '../services/config';

const orderStatuses = [
  "PENDING", 
  "PROCESSING", 
  "SHIPPED", 
  "IN TRANSIT", 
  "CUSTOMS CLEARANCE", 
  "DELIVERED"
];

function CurruntOrderDetails() {
    const { id } = useParams();
    const [curruntOrderDetails, setCurruntOrderDetails] = useState();
    
    useEffect(() => {
        const fetchCurruntOrderDetails = async () => {
            const data = await services.getCurruntOrderDetails(id);
            setCurruntOrderDetails(data || null);
        };

        fetchCurruntOrderDetails();
    }, [id]);

    if (!curruntOrderDetails) {
        return <h1 className="text-center text-red-500 text-xl font-bold mt-10">Currunt Order Details Not Found</h1>;
    }

    console.log("curruntOrderDetails :", curruntOrderDetails);

    const currentStatusIndex = orderStatuses.indexOf(curruntOrderDetails?.status);

    return (
        <div className="p-8 bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-xl flex">
                
                {/* Image on the Left */}
                <div className="w-1/3 flex justify-center items-center">
                    <img 
                        src={curruntOrderDetails?.curruntOrder?.product?.featuedImages} 
                        alt={curruntOrderDetails?.curruntOrder?.product?.name} 
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Order Details */}
                <div className="w-2/3 pl-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">CURRENT ORDER DETAIL</h1>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product Name:</h2>
                            <p className="text-gray-700">{curruntOrderDetails?.curruntOrder?.product?.name}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product ID:</h2>
                            <p className="text-gray-700">{curruntOrderDetails?.curruntOrder?.product?.productId}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product Price:</h2>
                            <p className="text-gray-700">${curruntOrderDetails?.curruntOrder?.product?.price}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Order Quantity:</h2>
                            <p className="text-gray-700">{curruntOrderDetails?.curruntOrder?.quntity}</p>
                        </div>
                    </div>

                    {/* Order Tracking Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">Order Tracking</h2>
                        <div className="flex justify-between items-center w-full px-6 relative">
                            {orderStatuses.map((status, index) => (
                                <div key={status} className="flex flex-col items-center w-full">
                                    {/* Tracking Circles */}
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold shadow-md mb-2
                                        ${index <= currentStatusIndex ? 'bg-blue-600' : 'bg-gray-300'}`}>✓</div>
                                    
                                    {/* Status Name */}
                                    <p className={`text-sm font-medium ${index <= currentStatusIndex ? 'text-blue-700' : 'text-gray-500'}`}>{status}</p>
                                    
                                    {/* Active Location Display */}
                                    {index === currentStatusIndex && (
                                        <p className="text-xs text-green-600 font-semibold mt-1">{curruntOrderDetails?.statusLocation}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Address Section */}
            <div className="max-w-5xl w-full bg-white mt-6 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Order Address</h2>
                <div className="text-center text-gray-700 space-y-2">
                    <p className="font-semibold">{curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.addressLine1}</p>
                    {curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.addressLine2 && (
                        <p>{curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.addressLine2}</p>
                    )}
                    <p>{curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.city} - {curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.postalCode}</p>
                    <p>{curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.state}, {curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.country}</p>
                    <p className="font-semibold">📞 {curruntOrderDetails?.curruntOrder?.userDeliveryAddress?.mobileNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default CurruntOrderDetails;

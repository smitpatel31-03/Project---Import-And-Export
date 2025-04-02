import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import services from '../services/config';

function OrderDetails({order}) {
  const [orderDetails, setOrderDetails] = useState()

  const {id} = useParams()

  console.log(id);
  
  useEffect(()=>{
    const fetchOrderDetils = async() => {
      const data = await services.getUserOrderDetails(id)  
      if (data) setOrderDetails(data)
      else setOrderDetails(null)
      
    }

    fetchOrderDetils()
  },[id])


  console.log(orderDetails);
  
  return (
    <div className="p-8 bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-xl flex">
                
                {/* Image on the Left */}
                <div className="w-1/3 flex justify-center items-center">
                    <img 
                        src={orderDetails?.product?.featuedImages} 
                        alt={orderDetails?.product?.name} 
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Order Details */}
                <div className="w-2/3 pl-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">ORDER DETAIL</h1>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product Name:</h2>
                            <p className="text-gray-700">{orderDetails?.product?.name}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product ID:</h2>
                            <p className="text-gray-700">{orderDetails?.product?.productId}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Product Price:</h2>
                            <p className="text-gray-700">${orderDetails?.product?.price}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Order Quantity:</h2>
                            <p className="text-gray-700">{orderDetails?.quntity}</p>
                        </div>
                    </div>

                    <div className="max-w-5xl w-full bg-white mt-6 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Order Address</h2>
                <div className="text-center text-gray-700 space-y-2">
                    <p className="font-semibold">{orderDetails?.userDeliveryAddress?.addressLine1}</p>
                    {orderDetails?.userDeliveryAddress?.addressLine2 && (
                        <p>{orderDetails?.userDeliveryAddress?.addressLine2}</p>
                    )}
                    <p>{orderDetails?.userDeliveryAddress?.city} - {orderDetails?.userDeliveryAddress?.postalCode}</p>
                    <p>{orderDetails?.userDeliveryAddress?.state}, {orderDetails?.userDeliveryAddress?.country}</p>
                    <p className="font-semibold">📞 {orderDetails?.userDeliveryAddress?.mobileNumber}</p>
                </div>
            </div>
                    
                </div>
            </div>
      </div>
  )
}

export default OrderDetails


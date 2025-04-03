import React from 'react';

function CurruntOrderCard({ order }) {
  console.log('order:', order);

  // Status colors
  const statusColors = {
    PENDING: 'bg-yellow-500',
    PROCESSING: 'bg-blue-500',
    SHIPPED: 'bg-green-500',
    'IN TRANSIT': 'bg-purple-500',
    'CUSTOMS CLEARANCE': 'bg-orange-500',
    DELIVERED: 'bg-teal-500',
  };

  const statusColor = statusColors[order?.status] || 'bg-gray-500';

  return (
    <div className="w-full max-w-sm p-4">
      <div className="bg-gradient-to-br from-gray-600 to-gray-800 shadow-2xl rounded-lg p-5 text-white">
        {/* Product Name */}
        <h3 className="text-xl font-bold mb-3 text-center">
          {order?.orderDetails?.productDetails?.name || 'Product Name'}
        </h3>

        {/* Product Image */}
        <div className="relative w-full flex justify-center">
          <img
            src={
              order?.orderDetails?.productDetails?.featuedImages ||
              'https://via.placeholder.com/300'
            }
            alt={order?.orderDetails?.productDetails?.name || 'Product'}
            className="rounded-md w-full h-40 shadow-md"
          />
        </div>

        {/* Order Status */}
        <div className={`mt-4 px-3 py-1 rounded-full text-center font-semibold ${statusColor}`}>
          {order?.status || 'Unknown Status'}
        </div>

        {/* Checkout Button */}
        <button className="mt-4 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg w-full hover:bg-gray-200 transition-all">
          Checkout →
        </button>
      </div>
    </div>
  );
}

export default CurruntOrderCard;

import React from 'react';

function OrderCard({ order }) {
    if (!order || !order?.totalorders) {
        return <div className="text-red-500">Invalid order data</div>;
    }

    console.log('order :',order);
    

    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl rounded-2xl p-5 w-full max-w-sm text-white">
      {/* Product Name */}
      <h3 className="text-xl font-semibold mb-3">{order.totalorders?.product?.name || "Product Name"}</h3>

      <div className="relative w-full flex justify-center">
        <img
          src={order.totalorders?.product?.featuedImages|| "https://via.placeholder.com/300"}
          alt={order.totalorders?.product?.name || "Product"}
          className="rounded-lg object-cover w-full h-40 shadow-md"
        />
      </div>

      {/* Description */}
      <p className="text-sm mt-3 text-white/90">
        {order.totalorders?.product?.description || "Premium quality product with excellent durability."}
      </p>

      {/* Action Button */}
      <button className="mt-4 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg w-full hover:bg-gray-200 transition-all">
        Checkout →
      </button>
    </div>
  
  
    );
}

export default OrderCard;

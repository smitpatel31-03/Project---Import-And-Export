import React from 'react'

function CurruntOrderCard({order}) {

    
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl rounded-2xl p-5 w-full max-w-sm text-white">
      {/* Product Name */}
      <h3 className="text-xl font-semibold mb-3">{order?.orderDetails?.productDetails?.name || "Product Name"}</h3>

      <div className="relative w-full flex justify-center">
        <img
          src={order?.orderDetails?.productDetails?.featuedImages|| "https://via.placeholder.com/300"}
          alt={order?.orderDetails?.productDetails?.name || "Product"}
          className="rounded-lg object-cover w-full h-40 shadow-md"
        />
      </div>

      <button className="mt-4 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg w-full hover:bg-gray-200 transition-all">
        Checkout →
      </button>
    </div>
    </div>
  )
}

export default CurruntOrderCard

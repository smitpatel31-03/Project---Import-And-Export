import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="bg-white p-5 shadow-md rounded-xl border border-gray-300 hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-bold text-gray-900 flex items-center">
        📍 Address
      </h2>
      <p className="text-gray-600 mt-2">{address.addressLine1}</p>
      <p className="text-gray-600">{address.addressLine2}</p>
      <p className="text-gray-800 font-semibold">
        {address.city} - {address.postalCode}
      </p>
      <p className="text-gray-600">{address.state}, {address.country}</p>
      <p className="text-blue-700 font-medium flex items-center mt-3">
        📞 {address.mobileNumber}
      </p>
    </div>
  );
};

export default AddressCard;

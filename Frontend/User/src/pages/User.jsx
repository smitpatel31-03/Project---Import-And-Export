import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import authServices from "../services/auth";
import { AddressCard } from "../components";
import { Button } from "../components/index.js";

function User() {
  const [userDetails, setUserDetails] = useState(null);
  const [userDeliveryAddress, setUserDeliveryAddress] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      const data = await authServices.getUserDetails();
      if (data) {
        setUserDetails(data);
        setUserDeliveryAddress(Array.isArray(data.userAddresses) ? data.userAddresses : []);
      } else {
        setUserDetails(null);
      }
    };
    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">User Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        
        {/* User Profile Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{userDetails.fullName}</h1>
          <p className="text-gray-500 text-lg">{userDetails.email}</p>
          <p className="text-gray-700 font-semibold text-xl mt-2">📞 {userDetails.phoneNumber}</p>
          <p className="text-gray-600 text-lg">{userDetails.country}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 justify-center" onClick={() => navigate(`/changeUserDetails`)}>
            ✏️ Edit Details
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 justify-center" onClick={() => navigate(`/changePassword`)}>
            🔒 Change Password
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 justify-center" onClick={() => navigate(`/addAddress`)}>
            ➕ Add Address
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 justify-center" onClick={() => navigate(`/totalOrders`)}>
            📦 Total Orders
          </Button>
        </div>

        {/* Delivery Addresses */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          📍 Delivery Addresses
        </h2>
        <div className="grid gap-6">
          {userDeliveryAddress.length > 0 ? (
            userDeliveryAddress.map((address, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <AddressCard address={address} />
                <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => navigate(`/UpdateAddressDetails/${address._id}`)}>
                  ✏️ Update Address
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center italic">No saved addresses yet. Add one to get started! 📍</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;

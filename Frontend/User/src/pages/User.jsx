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
        <div className="flex justify-center gap-4 mb-6">
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2 " onClick={()=> navigate(`/changeUserDetails`)}>
            ✏️ Edit Details
          </Button>
          <Button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 flex items-center gap-2" onClick={()=> navigate(`/changePassword`)}>
            🔒 Change Password
          </Button>
          <Button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2" onClick={() => navigate(`/addAddress`)}>
            ➕ Add Address
          </Button>
        </div>

        {/* Delivery Addresses */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
          📍 Delivery Addresses
        </h2>
        <div className="grid gap-6">
          {userDeliveryAddress.length > 0 ? (
            userDeliveryAddress.map((address, index) => (
              <div key={index}>
                <AddressCard address={address} />
                <Button onClick={() => navigate(`/UpdateAddressDetails/${address._id}`)}>
                  Update Address
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved addresses.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;

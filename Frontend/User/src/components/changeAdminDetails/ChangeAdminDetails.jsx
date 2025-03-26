import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authServices from "../../services/auth";
import { Input, Button } from "../index.js";

function ChangeAdminDetails() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // Fetch user data and pre-fill the form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authServices.getUserDetails();
        if (data) {
          console.log("Fetched User Data:", data);
          setUserData(data);
          reset(data); // Pre-fill form fields with user data
        } else {
          console.log("No user data found.");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [reset]);

  // Handle form submission
  const submit = async (formData) => {
    try {
      console.log("Updated Data:", formData); // Check updated data in console
      const response = await authServices.changeUserDetails(formData);
      if (response) navigate("/user");
    } catch (error) {
      console.error("Error Updating User Data:", error);
      setError("Failed to update user details. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Profile</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Show user data in UI */}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: true })}
        />

        <Input
          label="Phone Number"
          type="number"
          placeholder="Enter Your Phone Number"
          {...register("phoneNumber", { required: true })}
        />

        <Input
          label="Full Name"
          placeholder="Enter Your Full Name"
          {...register("fullName", { required: true })}
        />

        <Input
          label="Country"
          placeholder="Enter Your Country"
          {...register("country", { required: true })}
        />

        <Button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default ChangeAdminDetails;

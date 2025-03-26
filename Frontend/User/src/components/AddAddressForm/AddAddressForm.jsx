import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import { Input, Button } from "../index.js";

function AddAddressForm({ address }) {  // Accept address as a prop
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();  // Using reset function

  // 🔹 Update the form when `address` data is available
  useEffect(() => {
    if (address) {
      reset({
        name: address?.name || "",
        addressLine1: address?.addressLine1 || "",
        addressLine2: address?.addressLine2 || "",
        city: address?.city || "",
        postalCode: address?.postalCode || "",
        state: address?.state || "",
        country: address?.country || "",
        mobileNumber: address?.mobileNumber || "",
      });
    }
  }, [address, reset]);  // 🔹 Dependency array ensures reset is called only when `address` changes

  const submit = async (formData) => {
    try {
      let data;
      if (address) {
        data = await authServices.updateUserAddress(address._id, formData);
      } else {
        data = await authServices.addUserAddress(formData);
      }

      if (data) navigate("/user");
    } catch (err) {
      setError("Failed to save address. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        {address ? "Update Address" : "Add Address"}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input label="Name" placeholder="Enter Your Name" {...register("name", { required: true })} />
        <Input label="Address Line 1" placeholder="Enter Address Line 1" {...register("addressLine1", { required: true })} />
        <Input label="Address Line 2" placeholder="Enter Address Line 2" {...register("addressLine2")} />
        <Input label="City" placeholder="Enter Your City" {...register("city", { required: true })} />
        <Input label="Postal Code" type="number" placeholder="Enter Postal Code" {...register("postalCode", { required: true })} />
        <Input label="State" placeholder="Enter Your State" {...register("state", { required: true })} />
        <Input label="Country" placeholder="Enter Your Country" {...register("country", { required: true })} />
        <Input label="Mobile Number" placeholder="Enter Your Mobile Number" {...register("mobileNumber", { required: true })} />

        <Button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          {address ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}

export default AddAddressForm;

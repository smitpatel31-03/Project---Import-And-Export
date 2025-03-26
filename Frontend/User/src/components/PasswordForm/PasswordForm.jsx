import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authServices from "../../services/auth";
import { Input, Button } from "../index.js";

function PasswordForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const submit = async (formData) => {
    try {
      const data = await authServices.changeUserPassword(formData);
      if (data) navigate("/user");
    } catch (error) {
      console.error(error);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Change Password</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="Old Password"
          type="password"
          placeholder="Enter Your Old Password"
          {...register("oldPassword", { required: true })}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter Your New Password"
          {...register("newPassword", { required: true })}
        />

        <Input
          label="Confirm New Password"
          placeholder="Confirm Your New Password"
          {...register("confirmNewPassword", { required: true })}
        />

        <Button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default PasswordForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Fixed import
import { login as authLogin } from '../Store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authServices from '../services/auth.js';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError("");

    try {
      const session = await authServices.loginUser({ ...data });

      if (session) {

        const adminData = await authServices.getCurruntUser();
        if (adminData) {
          dispatch(authLogin(adminData));
          navigate('/');
        }

        
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex-1 flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-lg bg-gray-700 rounded-xl p-8 shadow-xl border border-gray-600">
          <div className="mb-6 flex justify-center">
            <Logo width="80px" />
          </div>
  
          <h2 className="text-center text-2xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-center text-gray-400">
            Don't have an account?&nbsp;
            <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition duration-200">
              Sign up
            </Link>
          </p>
  
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
  
          {/* Login Form */}
          <form onSubmit={handleSubmit(login)} className="mt-6">
            <div className="space-y-5">
              <Input
                label="Email:"
                placeholder="Enter Your Email:"
                className="w-full bg-gray-600 text-black border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Invalid email format"
                  }
                })}
              />
  
              <Input
                label="Password:"
                placeholder="Enter Your Password"
                type="password"
                className="w-full bg-gray-600 text-black border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required"
                })}
              />
  
              <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition duration-300">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  
}

export default Login;

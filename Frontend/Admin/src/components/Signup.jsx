import React, { useState } from 'react'
import authServices from '../services/auth'
import { Link, useNavigate } from 'react-router'
import { login as authlogin } from '../store/authSlice.js'
import { Button, Input, Select, Logo } from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {

            const session = await authServices.registerAdmin({ ...data })

            if (session) {

                const adminData = await authServices.getCurruntAdmin();
                if (adminData) {
                    dispatch(authlogin(adminData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.messagw)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-gray-800 text-white rounded-xl p-10 border border-gray-700 shadow-lg">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-400 transition-all duration-200 hover:text-blue-300 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="Enter Your Full Name"
                            className="bg-gray-700 text-black border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            {...register("name", {
                                required: true
                            })}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter Your Email"
                            type="email"
                            className="bg-gray-700 text-black border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            {...register("email", {
                                required: true,
                                validate: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address"
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter Your Password"
                            type="password"
                            className="bg-gray-700 text-black border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Select
                            options={["ADMIN", "OWNER", "CREATOR", "DELIVERY"]}
                            label="Role"
                            className="bg-gray-700 text-black border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            {...register("role", {
                                required: true
                            })}
                        />

                        <Input
                            label="Key"
                            placeholder="Enter Your Key"
                            type="text"
                            className="bg-gray-700 text-black border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            {...register("key", {
                                required: true
                            })}
                        />

                        <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition duration-300">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Signup

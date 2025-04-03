import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Services from "../services/config.js";
import { useForm } from "react-hook-form";
import { Button } from "../components/index.js";
import { useSelector } from "react-redux";
import authServices from "../services/auth.js";
import { loadScript } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import conf from "../conf/conf.js";
import services from '../services/config.js'

function BookProduct() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [address, setAddress] = useState([]);
    const { register, handleSubmit, watch, setValue } = useForm({ defaultValues: { quntity: 1 } }); // Set default value
    const data = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [paypalLoaded, setPaypalLoaded] = useState(false);

    console.log("services :",services);
    

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const prod = await Services.getProductDetails(id);
                if (prod) setProductDetails(prod);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductData();
    }, [id]);

    console.log("productDetails :", productDetails);


    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const add = await authServices.findUserAddress(data);
                setAddress(Array.isArray(add) ? add : []);
            } catch (error) {
                console.error("Error fetching user address:", error);
            }
        };
        fetchUserAddress();
    }, [data]);

    useEffect(() => {
        const loadPaypalScript = async () => {
            try {
                await loadScript({ clientId: conf.paypalClientId });
                setPaypalLoaded(true);
            } catch (error) {
                console.error("Failed to load PayPal SDK", error);
            }
        };
        loadPaypalScript();
    }, []);

    const bookOrder = async (formdata) => {
        try {
            console.log("formdata :",formdata);
            
            const result = await Services.bookOrder(id, { ...formdata });
            if (result) navigate("/");
        } catch (error) {
            console.error("Something went wrong while booking order:", error);
        }
    };

    const createOrder = async () => {
        try {
            const response = await Services.createPaypalOrder({ amount: productDetails.price });
            console.log("🆕 New PayPal Order ID:", response.orderID);
            return response.orderID;
        } catch (error) {
            console.error("❌ Error creating PayPal order:", error);
            return null;
        }
    };

    const capturedOrders = new Set();

    const captureOrder = async (orderID, formData) => {
        if (capturedOrders.has(orderID)) {
            console.warn("⚠️ Order already captured, skipping duplicate request:", orderID);
            return;
        }
    
        capturedOrders.add(orderID); // Mark order as captured
    
        try {
            console.log("📡 Sending request to capture PayPal order:", orderID);
    
            const response = await Services.capturePaypalOrder({ orderID });
    
            if (response?.status === "COMPLETED") {
                console.log("✅ Order Captured Successfully", response);
                await bookOrder(formData);  // Ensure booking happens only after successful capture
            } else {
                console.error("❌ Order capture failed. Unexpected status:", response);
            }
        } catch (error) {
            console.error("❌ Error capturing PayPal order:", error.response?.data || error);
        }
    };
    
    
    


    const quntity = watch("quntity"); // Get the latest quantity from React Hook Form

    if (!productDetails) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-500">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row">
                {/* Product Image & Info */}
                <div className="md:w-1/2 flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold text-gray-800">{productDetails?.name}</h1>
                    <img
                        className="w-full h-80 object-cover rounded-lg mt-4 shadow-md"
                        src={productDetails?.featuedImages}
                        alt={productDetails?.name}
                    />
                    <p className="mt-3 text-lg text-green-600 font-semibold">Price: ${productDetails.price}</p>
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 p-6">
                    <form
                        onSubmit={handleSubmit(async (formdata) => {
                            const orderID = await createOrder();
                            if (orderID) {
                                captureOrder(orderID, formdata);
                            }
                        })}
                        className="space-y-6"
                    >
                        {/* Quantity */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                {...register("quntity", { valueAsNumber: true })} // Ensures it's a number
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                                           focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Address Selection */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Select Address</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {address.map((addr) => (
                                    <label
                                        key={addr?._id}
                                        className={`cursor-pointer border p-4 rounded-lg shadow-sm transition 
                            ${watch("userDeliveryAddress") === addr?._id
                                                ? "bg-blue-500 text-white border-blue-700"  // Properly Apply Selected Styling
                                                : "bg-gray-50 text-gray-800 hover:bg-blue-100"
                                            }`}
                                    >
                                        <input type="radio" {...register("userDeliveryAddress")} value={addr?._id} className="hidden" />
                                        <div className="p-2 rounded-lg">
                                            <p className="font-semibold">{addr.addressLine1}, {addr.addressLine2}</p>
                                            <p className="text-sm">{addr.city}, {addr.state} - {addr.zipcode}, {addr.country}</p>
                                            <p className="font-semibold">{addr.phone}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* PayPal Button */}
                        <div className="mt-6">
                            {paypalLoaded ? (
                                <PayPalScriptProvider options={{ clientId: conf.paypalClientId }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    { amount: { value: (productDetails.price * quntity).toFixed(2) } }
                                                ],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            try {
                                                const details = await actions.order.capture();
                                                console.log("✅ Transaction details:", details);
                                        
                                                alert("Transaction completed by " + details.payer.name.given_name);
                                        
                                                const orderID = details.id;
                                                const formData = { quntity, address: watch("userDeliveryAddress") };
                                        
                                                console.log("📡 Capturing order with orderID:", orderID, "and formData:", formData);
                                        
                                                if (details.status === "COMPLETED") {
                                                    console.log("✅ Order already captured. Booking order...");
                                                    await bookOrder(formData);  // ✅ Place the order in your system
                                                    return;
                                                }
                                        
                                                await captureOrder(orderID, formData); // Capture order if not already completed
                                        
                                                console.log("✅ Order captured successfully!");
                                                
                                            } catch (error) {
                                                console.error("❌ Error capturing PayPal order:", error);
                                                alert("Payment failed. Please try again.");
                                            }
                                        }}
                                        
                                        
                                        
                                        
                                    />
                                </PayPalScriptProvider>
                            ) : (
                                <Button className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg">
                                    Loading PayPal...
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookProduct;

import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js'


const generateAccessToken = async () => {
    try {
        const response = await axios.post("https://api-m.paypal.com/v1/oauth2/token", 
            "grant_type=client_credentials", 
            {   
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID,
                    password: process.env.PAYPAL_SECRET,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return response.data.access_token;  // ✅ Always return a fresh token
    } catch (error) {
        console.error("❌ Error generating PayPal Access Token:", error.response?.data || error.message);
        throw new Error("Failed to generate PayPal access token");
    }
};

const createOrder = asyncHandler(async(req,res)=>{
    try {
        const accessToken = await generateAccessToken();
        const orderData = {
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: req.body.amount,
                },
            }],
        };

        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, orderData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        res
        .status(200)
        json(new ApiResponse(200, { orderID: response.data.id }, "PayPal order created successfully."));
    } catch (error) {
        console.error("PayPal Order Creation Error:", error.response?.data || error.message);
        next(new ApiError(500, "Failed to create PayPal order", error.response?.data || []));
    }
})

const captureOrder = asyncHandler(async (req, res) => {
    try {
        // ✅ Always get a fresh access token before making API requests
        const accessToken = await generateAccessToken();
        const orderID = req.body.orderID;

        // ✅ Step 1: Fetch order details (check if already completed)
        const orderDetails = await axios.get(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (orderDetails.data.status === "COMPLETED") {
            return res.status(400).json({ error: "Order already captured" });
        }

        // ✅ Step 2: Capture the order
        const response = await axios.post(`https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return res.status(200).json({ success: true, data: response.data, message: "PayPal order captured successfully." });

    } catch (error) {
        console.error("❌ PayPal Order Capture Error:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to capture PayPal order", details: error.response?.data || [] });
    }
});




export{
    createOrder,
    captureOrder
}
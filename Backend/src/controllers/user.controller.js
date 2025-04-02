import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { UserAddress } from "../models/usersAddress.model.js"
import { Order } from "../models/order.model.js"
import { CurruntOrder } from "../models/curruntOrders.model.js"
import { Product } from "../models/product.models.js"
import { Category } from "../models/catagory.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        //find user
        //genrate access and refresh token
        //update the database
        //save the database
        //return access and refresh token

        //find user
        const user = await User.findById(userId)


        //genrate access and refresh token
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        //update the database
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something Went Wrong While Genrating Refresh And Access Token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //import user details
    //validate user details
    //check email and phone number is available or not
    //add user to database
    // remove password and refresh token field from response
    //check user is created or not
    //response user


    //import user details
    const { email, password, fullName, phoneNumber, country } = req.body

    //validate user details
    if ([email, password, fullName, phoneNumber, country].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields Are Compulsory Or Required")
    }

    //check email and phone number is available or not
    const existedUser = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    })

    if (existedUser) {
        throw new ApiError(409, "Email And Phonenumber Are Already Exist")
    }

    //add user to database
    const user = await User.create({
        email,
        password,
        fullName,
        phoneNumber,
        country
    })


    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")


    //check user is created or not
    if (!createdUser) {
        throw new ApiError(500, "Something Went Wrong While Registering User");
    }

    //refresh token and access token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secured: true
    }

    //response send cookie
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: createdUser, accessToken, refreshToken
            },
                "User Created In Successfully"
            )
        )
})

const loginUser = asyncHandler(async (req, res) => {
    //get user details
    //validate user details
    //find user
    //validate password
    //refresh token and access token
    //response send cookie

    //get user details
    const { email, password } = req.body


    //validate user details
    if (!email) {
        throw new ApiError(401, "Please Enter User Details")
    }

    //find user
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }
    //validate password
    const isPasswordValidate = await user.isPasswordCorrect(password)

    if (!isPasswordValidate) {
        throw new ApiError(401, "Invalid Crendentials")
    }



    //refresh token and access token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


    const logedInUser = await User.findById(user._id).select("-password -refreshToken ")

    const options = {
        httpOnly: true,
        secured: true
    }

    //response send cookie
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: logedInUser, accessToken, refreshToken
            },
                "User Loggend In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    //find user
    //remove refresh token
    //remove cookie

    //find user
    //remove refresh token

    await User.findByIdAndUpdate(
        req.user.id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    const options = {
        httpOnly: true,
        secured: true
    }

    res
        .status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Loogedout Successfully"))
})

const getCurruntUser = asyncHandler(async (req, res) => {
    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Currunt User"
            )
        )
})

const UsersRefreshAccessToken = asyncHandler(async (req, res) => {
    //get refresh token
    //decode refresh token
    //find user
    //validate refresh token
    //set refresh and access token
    //response cookie


    //get refresh token
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        //decode refresh token
        const decodeToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRATE_USER)

        //find user
        const user = await User.findById(decodeToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid User Refresh Token")
        }

        //validate refresh token
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "User Refresh Token Is Expired Or Used")
        }

        const options = {
            httpOnly: true,
            secured: true
        }

        //set refresh and access token
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        //response cookie
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {
                    user: { accessToken, refreshToken }
                }),
                "User's Access Token Refreshed Successfully"
            )

    } catch (error) {
        throw new ApiError(401, "Invalid User Refresh Token")
    }
})

const addUserAddress = asyncHandler(async (req, res) => {
    //get address details
    //check all adddress fields
    //import users
    //save the data in database
    //response user

    //get address details
    const { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber } = req.body

    if ([name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber].some((fild) => fild?.trim === "")) {
        throw new ApiError(400, "All Fields Are Compulsary Or Required")
    }

    //import users
    const user = await User.findById(req.user?._id)

    const addAddress = await UserAddress.create({
        name,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        state,
        country,
        mobileNumber,
        user: req.user?._id
    })

    user.address.push(addAddress)
    await user.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { addAddress },
                "User Address Add Successfully"
            )
        )
})

const updateUserAddress = asyncHandler(async (req, res) => {
    const { useraddressId } = req.params
    const { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber } = req.body

    if ([name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber].some((fild) => fild?.trim === "")) {
        throw new ApiError(400, "All Fields Are Compulsary Or Required")
    }

    const updateAddress = await UserAddress.findByIdAndUpdate(useraddressId, {
        name,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        state,
        country,
        mobileNumber,
    })

    await updateAddress.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updateAddress,
                "User Address Add Successfully"
            )
        )
})

const changeUsersCurruntPassword = asyncHandler(async (req, res) => {
    //get oldpassword and new password
    //check new password and conform password
    //find user
    //check old password
    //save new password
    //return response


    //get oldpassword and new password
    const { oldPassword, newPassword, conformNewPassword } = req.body

    //check new password and conform password
    if (newPassword !== conformNewPassword) {
        throw new ApiError(401, "Conform Pawword Is Wrong")
    }
    
    //find user
    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(401, "Something Went Wrong While Finding the user")
    }

    //check old password
    const isPasswordValidate = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValidate) {
        throw new ApiError(400, "Invalid Old Password")
    }

    //save new password
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    //return response
    res
        .status(200)
        .json(
            new ApiResponse(
                201, {}, "Password Changed Successfully")
        )
})

const changeUserDetails = asyncHandler(async (req, res) => {
    //get oldpassword and new password
    //check new password and conform password
    //find user
    //check old password
    //save new password
    //return response


    //get oldpassword and new password
    const { email, phoneNumber, fullName, country } = req.body

    

    if ([email, phoneNumber, fullName, country].some((filed) => filed.trim() === "")) {
        throw new ApiError(401, "All Fields Are Compulsory Or Required")
    }


    //find user
    const user = await User.findOneAndUpdate(
        req.user?._id,
        {
            email,
            phoneNumber,
            fullName,
            country
        },
        {
            new: true
        }
    ).select("-password")

    //return response
    res
        .status(200)
        .json(
            new ApiResponse(
                201, {}, "Accounts Detaied Updated Successfully")
        )
})

// const addProductsToCart = asyncHandler(async (req, res) => {})

const bookOrder = asyncHandler(async (req, res) => {
    const { quntity, userDeliveryAddress } = req.body
    const { productId } = req.params

    console.log("userDeliveryAddress :",userDeliveryAddress);
    
    const user = await User.findById(req.user?._id)

    
    const order = await Order.create({
        user,
        product: productId,
        quntity,
        userDeliveryAddress: new mongoose.Types.ObjectId(userDeliveryAddress)
    })

    const addToCurruntOrder = await CurruntOrder.create({
        curruntOrder: order,
        status: "PENDING"
    })

    const product = await Product.findByIdAndUpdate(productId,
        { $inc: { stock: -quntity } },
        { new: true }
    )

    product.save({ validateBeforeSave: false })
    user.Orders.push(addToCurruntOrder)
    user.save({ validateBeforeSave: false })


    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                { order, addToCurruntOrder, user },
                "Product Added Successfully"
            )
        )
})

const getUserDetails = asyncHandler(async (req, res) => {

    const getUser = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "useraddresses",
                localField: "_id",
                foreignField: "user",
                as: "userAddresses",
                pipeline: [
                    {
                        $project: {
                            addressLine1: 1,
                            addressLine2: 1,
                            city: 1,
                            postalCode: 1,
                            state: 1,
                            country: 1,
                            mobileNumber: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                email: 1,
                fullName: 1,
                phoneNumber: 1,
                country: 1,
                userAddresses: 1,
                userOrders: 1
            }
        }
    ])

    if (!getUser?.length) {
        throw new ApiError(401, "User Does Not Exist")
    }

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                getUser[0],
                "User Details"
            )
        )
})

const getUserOrders = asyncHandler(async (req, res) => {
    
    const userOrders = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "user",
                as: "totalorders",
                pipeline: [
                    {
                        $lookup: {
                            from: "products",
                            localField: "product",
                            foreignField: "_id",
                            as: "product",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        productId: 1,
                                        price: 1,
                                        featuedImages: 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "useraddresses",
                            localField: "userDeliveryAddress",
                            foreignField: "_id",
                            as: "userDeliveryAddress",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        addressLine1: 1,
                                        addressLine2: 1,
                                        city: 1,
                                        postalCode: 1,
                                        state: 1,
                                        country: 1,
                                        mobileNumber: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            product: {
                                $first: "$product"
                            },
                            userDeliveryAddress: {
                                $first: "$userDeliveryAddress"
                            },
                        }
                    },
                    {
                        $project: {
                            product: 1,
                            quntity: 1,
                            userDeliveryAddress: 1
                        }
                    }
                ],
            }
        },
        {
            $project:
            {
                quntity: 1,
                totalorders: 1
            }
        }
    ])

    if (!userOrders?.length) {
        throw new ApiError(401, "Can't Find User Orders")
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                userOrders,
                "User Order Details"
            )
        )
})

const getUserOrderDetails = asyncHandler(async (req, res) => {
    const { orderId } = req.params

    const userOrderDetails = await Order.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(orderId)
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            productId: 1,
                            price: 1,
                            featuedImages: 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "useraddresses",
                localField: "userDeliveryAddress",
                foreignField: "_id",
                as: "userDeliveryAddress",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            addressLine1: 1,
                            addressLine2: 1,
                            city: 1,
                            postalCode: 1,
                            state: 1,
                            country: 1,
                            mobileNumber: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                product: {
                    $first: "$product"
                },
                userDeliveryAddress: {
                    $first: "$userDeliveryAddress"
                },
            }
        },
        {
            $project: {
                product: 1,
                quntity: 1,
                userDeliveryAddress: 1
            }
        }
    ])
    

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                userOrderDetails,
                "User Orders"
            )
        )
})

const getCurruntOrder = asyncHandler(async (req, res) => {
    const userCurruntOrder = await CurruntOrder.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "curruntOrder",
                foreignField: "_id",
                as: "orderDetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "products",
                            localField: "product",
                            foreignField: "_id",
                            as: "productDetails",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "category",
                                        pipeline: [
                                            { $project: { name: 1 } }
                                        ]
                                    }
                                },
                                { $addFields: { category: { $first: "$category" } } },
                                {
                                    $project: {
                                        name: 1,
                                        productId: 1,
                                        price: 1,
                                        featuedImages: 1,
                                        description:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "useraddresses",
                            localField: "userDeliveryAddress",
                            foreignField: "_id",
                            as: "deliveryAddress",
                            pipeline: [
                                {
                                    $project: {
                                        addressLine1: 1,
                                        addressLine2: 1,
                                        city: 1,
                                        postalCode: 1,
                                        state: 1,
                                        country: 1,
                                        mobileNumber: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user",
                            pipeline: [
                                {
                                    $match: {
                                        _id: new mongoose.Types.ObjectId(req.user?._id)
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            productDetails: { $first: "$productDetails" },
                            deliveryAddress: { $first: "$deliveryAddress" }
                        }
                    },
                    {
                        $project: {
                            productDetails: 1,
                            deliveryAddress: 1
                        }
                    }
                ]
            }
        },
        { $addFields: { orderDetails: { $first: "$orderDetails" } } },
        {
            $project: {
                _id:1,
                orderDetails: 1,
                status: 1,
                statusLocation: 1
            }
        }
    ]);
    

    res.status(200).json(new ApiResponse(200, userCurruntOrder, "Current Order"));
});


const getCurruntOrderDetails = asyncHandler(async (req, res) => {
    const {orderId} = req.params

    const userCurruntOrderDetails = await CurruntOrder.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(orderId)
            }
        },
        {
           $lookup:{
            from:"orders",
            localField:"curruntOrder",
            foreignField:"_id",
            as:"curruntOrder",
            pipeline:[
                {
                    $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    productId: 1,
                                    price: 1,
                                    featuedImages: 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "useraddresses",
                        localField: "userDeliveryAddress",
                        foreignField: "_id",
                        as: "userDeliveryAddress",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    addressLine1: 1,
                                    addressLine2: 1,
                                    city: 1,
                                    postalCode: 1,
                                    state: 1,
                                    country: 1,
                                    mobileNumber: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $addFields: {
                        product: {
                            $first: "$product"
                        },
                        userDeliveryAddress: {
                            $first: "$userDeliveryAddress"
                        },
                    }
                },
                {
                    $project: {
                        product: 1,
                        quntity: 1,
                        userDeliveryAddress: 1
                    }
                }
            ]
           } 
        },
        {
            $addFields:{
                curruntOrder:{
                    $first:"$curruntOrder"
                }
            }
        },
        {
            $project:{
                curruntOrder:1,
                status:1,
                statusLocation:1
            }
        }
    ])

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            userCurruntOrderDetails,
            "User CurruntOrder Details"
        )
    )
})

const catagoryDetailsOrListOfCatagorysProduct = asyncHandler(async (req, res) => {
    const { catagoryId } = req.params

    const catagoryDetailsOrListOfCatagorysProduct = await Category.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(catagoryId)
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "products",
                foreignField: "_id",
                as: "products",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            productId: 1,
                            price: 1,
                            featuedImages: 1,
                            description: 1,
                            stock: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                products: {
                    $first: "$products"
                }
            }
        },
        {
            $project: {
                products: 1,
                name: 1,
                description: 1,
                image: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                catagoryDetailsOrListOfCatagorysProduct[0],
                "Catagories Details"
            )
        )
})

const getAllCatagories = asyncHandler(async (_, res) => {


    const AllCatagories = await Category.aggregate([
        {
            $project: {
                name: 1,
                description: 1,
                image: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                AllCatagories,
                "All Catagories"
            )
        )

})

const getProductsDetails = asyncHandler(async (req, res) => {
    const { productId } = req.params

    const productDetails = await Product.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "ProductsCategory",
                pipeline: [
                    {
                        $project: {
                            name: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ProductsOwner"
            }
        },
        {
            $addFields: {
                ProductsCategory: {
                    $first: "$ProductsCategory"
                },
                ProductsOwner: {
                    $first: "$ProductsOwner"
                }
            }
        },
        {
            $project: {
                name: 1,
                productId: 1,
                price: 1,
                photos: 1,
                featuedImages: 1,
                description: 1,
                stock: 1,
                ProductsCategory: 1,
                ProductsOwner: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                productDetails[0],
                "Product Details"
            )
        )
})

const getAllProducts = asyncHandler(async (_, res) => {

    const AllProducts = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categories",
                pipeline: [
                    {
                        $project: {
                            name: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                categories: {
                    $first: "$categories"
                }
            }
        },
        {
            $project: {
                categories: 1,
                name: 1,
                description: 1,
                featuedImages: 1,
                photos: 1,
                productId: 1,
                price: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                AllProducts,
                "Catagories Details"
            )
        )
})

const findUserAddress = asyncHandler(async (req, res) => {
    const { userId } = req.params
    
    const AddressDetails = await User.aggregate([
        { $match: 
            { 
                _id: new mongoose.Types.ObjectId(userId) 
            } 
        },
        {
            $lookup :{
                from:"useraddresses",
                localField:"address",
                foreignField:"_id",
                as:"address",
                pipeline:[
                    {
                        $project:{
                            addressLine1: 1, 
                            addressLine2: 1, 
                            city: 1, 
                            postalCode: 1, 
                            state: 1, 
                            country: 1, 
                            mobileNumber: 1
                        }
                    }
                ]
            }
        },
        { $project: 
            { 
                address: 1 
            } 
        }

    ])

    res.status(200).json(new ApiResponse(
        201,
        AddressDetails,
        "Your Address Details"
    ))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurruntUser,
    UsersRefreshAccessToken,
    addUserAddress,
    changeUsersCurruntPassword,
    changeUserDetails,
    // addProductsToCart,
    bookOrder,
    updateUserAddress,

    //Get Request
    getUserDetails,
    getUserOrders,
    catagoryDetailsOrListOfCatagorysProduct,
    getAllCatagories,
    getProductsDetails,
    getCurruntOrder,
    getAllProducts,
    findUserAddress,
    getUserOrderDetails,
    getCurruntOrderDetails
}

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Admin } from "../models/admin.model.js"
import { Category } from "../models/catagory.model.js"
import { Product } from "../models/product.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudnary } from "../utils/cloudinary.js"
import { CurruntOrder } from "../models/curruntOrders.model.js"
import mongoose from "mongoose"

const generateAccessAndRefreshToken = async (AdmnId) => {
    try {
        //find admin
        //genrate accesstoken and refreshtoken
        //update database
        //retuen accesstoken and refreshtoken 

        //find admin
        const admin = await Admin.findById(AdmnId)

        //genrate accesstoken and refreshtoken
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something Went Wrong While Genrating Refresh And Access Token")
    }
}

const registerAdmin = asyncHandler(async (req, res) => {
    //import data 
    //validate admin
    //check admin email is available or not
    //check admin enter a proper role or not
    //check if admin role is Owner then he k=have valid key or not
    //add admin to database
    // remove password , refreshtoken and key field from response
    //check Admin is crated or not
    //response Admin

    //import data 
    const { email, password, name, key, role } = req.body

    //validate admin
    if ([email, password, name, key, role].some((field) => field?.trim === "")) {
        throw new ApiError(400, "All Fields Are Coumplsory Or Required")
    }
    
    //check admin email is available or not
    const existedUser = await Admin.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User")
    }

    //check admin enter a proper role or not
    if (!["ADMIN", "OWNER", "CREATOR", "DELIVERY"].includes(role)) {
        throw new ApiError(401, "Enter A Valid Role")
    }


    //check if admin role is Owner then he have valid key or not
    if (role === "ADMIN" && key !== process.env.ADMIN_KEY || role === "CREATOR" && key !== process.env.CREATOR_KEY || role === "OWNER" && key !== process.env.OWNER_KEY) {
        throw new ApiError(409, "Enter A Valid Key")
    }


    //add admin to database
    const admin = await Admin.create({
        email,
        password,
        name,
        role
    })

    // remove password , refreshtoken and key field from response
    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -key -refreshToken"
    )

    //check Admin is crated or not
    if (!createdAdmin) {
        throw new ApiError(500, "Something Went Wrong While Registering Admin")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)

    const options = {
        httpOnly: true,
        secured: false,
        sameSite:"Lax"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: true,  
        sameSite: "Lax",  
        maxAge: 1000 * 60 * 60 * 24 * 7, 
    })
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {Admin: createdAdmin, accessToken, refreshToken},
            "Admin Created Successfully"
        )
    );
    
})

const loginAdmin = asyncHandler(async (req, res) => {
    //get Admin Details
    //validate Admin Details
    //find Admin
    //verify Password
    //genrate refreshtoken and accesstoken
    //send cookies

    //get Admin Details
    const { email, password } = req.body

    
    //validate Admin Details
    if (!email) {
        throw new ApiError(401, "Please Enter The Details")
    }

    
    //find Admin
    const admin = await Admin.findOne({email})

    if (!admin) {
        throw new ApiError(404, "Admin Not Found")
    }

    //verify Password
    const isPasswordValidate = await admin.isPasswordCorrect(password)

    if (!isPasswordValidate) {
        throw new ApiError(401, "Invalid Credentails");
    }

    //genrate refreshtoken and accesstoken
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false, 
        sameSite: "Lax",
    };
        
    return res
    .status(200)
    .cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: true,  
        sameSite: "Lax",  
        maxAge: 1000 * 60 * 60 * 24 * 7, 
    })
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {Admin: loggedInAdmin, accessToken, refreshToken},
            "Admin Logged In Successfully"
        )
    );
    
})

const logoutAdmin = asyncHandler(async (req, res) => {
    //find admin
    //remove refresh token from database
    //remove cookie

    //find admin
    //remove refresh token from database

    console.log("req.admin._id :",req.admin._id);
    
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secured: true
    }
    
    //remove cookie
    return res.status(201)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Admin Loggedout Successfully"))
})

const getCurruntAdmin = asyncHandler(async (req, res) => {
        
    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                req.admin,
                "Currunt Admin"
            )
        )
})

const AdminsRefreshAccessToken = asyncHandler(async (req, res) => {
    //get cookies and check cookie
    //decode the token
    //find user
    //vaidate refresh token
    //set refresh and access token
    //response cookies


    //get cookies and check cookie
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Admin")
    }

    try {
        //decode the token
        const decodeToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET_ADMIN)

        //find user
        const admin = await Admin.findById(decodeToken)

        if (!admin) {
            throw new ApiError(401, "Invalid Admin's Refresh Token");
        }

        //vaidate refresh token
        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "Admin's Refresh Token Is Expired Or Used")
        }

        const options = {
            httpOnly: true,
            secured: true
        }

        //set refresh and access token
        const { accessToken, refreshToken } = generateAccessAndRefreshToken(admin._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    { accessToken, refreshToken },
                    "Admin's Access Token Refreshed Ruccessfully"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Admin's Refresh Token")
    }

})

const changeAdminCurruntPassword = asyncHandler(async (req, res) => {
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

    //find admin
    const admin = await Admin.findById(req.admin?._id)

    if (!admin) {
        throw new ApiError(401, "Something Went Wrong While Finding the admin")
    }

    //check old password
    const isPasswordValidate = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordValidate) {
        throw new ApiError(400, "Invalid Old Password")
    }
    
    //save new password
    admin.password = newPassword
    await admin.save({ validateBeforeSave: false })

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken()
    //return response
    res
        .status(200)
        .json(
            new ApiResponse(
                201, { Admin: accessToken, refreshToken }, "Password Changed Successfully")
        )
})

const changeAdminRole = asyncHandler(async (req, res) => {
    const { role, key } = req.body

    if (!role || !key) {
        throw new ApiError(401, "All Fields Are Required")
    }

    if (role === "ADMIN" && key !== process.env.ADMIN_KEY || role === "CREATOR" && key !== process.env.CREATOR_KEY || role === "OWNER" && key !== process.env.OWNER_KEY) {
        throw new ApiError(409, "Enter A Valid Key")
    }

    const admin = await Admin.findById(req.admin?._id)

    admin.role = role
    await admin.save({ validateBeforeSave: true })

    res
        .status(200)
        .json(
            201,
            admin,
            "Admin Role Udated Successfully"
        )
})

const changeAdminDetails = asyncHandler(async (req, res) => {
    //get oldpassword and new password
    //check new password and conform password
    //find user
    //check old password
    //save new password
    //return response


    //get oldpassword and new password
    const { email, name } = req.body

    if (!email || !name) {
        throw new ApiError(401, "All Fields Are Compulsory Or Required")
    }

    const findEmail = await Admin.findOne({ email })

    if (findEmail) {
        throw new ApiError(401, "Email Is Already Existed")
    }


    //find user
    const admin = await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            email,
            name
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)
    //return response
    res
        .status(200)
        .json(
            new ApiResponse(
                201, { Admin: accessToken, refreshToken }, "Accounts Detaied Updated Successfully")
        )
})

const addCatagory = asyncHandler(async (req, res) => {
    if (req.admin?.role === "DELIVERY") {
        throw new ApiError(401, "Delivery Boy Can Not Add The Catagory")
    }
    const { name, description } = req.body


    if (!name || !description) {
        throw new ApiError(401, "All Fileds Are Required");
    }
    
    const imageLocalPath = req.file
    
    const image = await uploadOnCloudnary(imageLocalPath)
    
    
    
    if (!image) {
        throw new ApiError(401, "Image is requird")
    }

    
    
    const catagory = await Category.create({
        name,
        description,
        image
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                catagory,
                "Catagory Added Successfully"
            )
        )
})

const addProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, stock, owner, productId } = req.body
    const { catagoryId } = req.params

    if ([name, price, description, stock, owner, productId].some((field) => field.trim === "")) {
        throw new ApiError(401, "All Fileds Are Required");
    }

    const imageLocalPath = req.file

    const featuedImages = await uploadOnCloudnary(imageLocalPath)

    if (!featuedImages) {
        throw new ApiError(401, "featuedImages is requird")
    }

    const product = await Product.create({
        name,
        price,
        description,
        category: new mongoose.Types.ObjectId(catagoryId),
        stock,
        owner: new mongoose.Types.ObjectId(req.admin._id),
        productId,
        featuedImages
    })

    // await product.image.push(image)
    // product.save({ validateBeforeSave: false })

    const productCatagory = await Category.findById(catagoryId)

    await productCatagory.products.push(product)
    productCatagory.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                product,
                "Products Added Successfully"
            )
        )
})

const addPhotosToProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!req.files || req.files.length === 0) {
        throw new ApiError(401, "At least one image is required.");
    }
    
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let imageUrls = [];

    console.log(req.files);
    

    for (const file of req.files) {
        const image = await uploadOnCloudnary(file);
        
        console.log("image :",image);
        

        if (image) {
            imageUrls.push(image);
        }
    }

    if (imageUrls.length === 0) {
        throw new ApiError(401, "Image upload failed.");
    }

    product.photos.push(...imageUrls);
    await product.save({ validateBeforeSave: true });

    res.status(200).json(
        new ApiResponse(
            201,
            product.photos,
            "Images added successfully",
        ));
});

const changeProductDetails = asyncHandler(async (req, res) => {
    const { name, price, description, category, stock } = req.body
    const { productId } = req.params    

    if ([name, price, description, stock].some((field) => field.trim === "")) {
        throw new ApiError(401, "All Fileds Are Required");
    }


    const product = await Product.findById(productId)
    let updatedCatagory = product.category

    if (category && category !== product.category.toString()) {
        await Category.findByIdAndUpdate(updatedCatagory,
            {
                $pull: { products: productId }
            }
        )

        await Category.findByIdAndUpdate(category,
            {
                $addToSet: { products: productId }
            }
        )

        updatedCatagory = category
    }



    const updatedProduct = await Product.findByIdAndUpdate(productId,
        {
            name,
            price,
            description,
            category: updatedCatagory,
            stock,
        
        },
        { new: true }
    )

    if (!updatedProduct) {
        throw new ApiError(500, "Something Went Wrong While Update The Products")
    }

    await product.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProduct,
                "Product Updated SuccessFully"
            )
        )
})

const changeProductFeatureImage = asyncHandler(async (req, res) => {
    const { productId } = req.params

    const imageLocalPath = req.file

    const featuedImages = await uploadOnCloudnary(imageLocalPath)
    
    if (!featuedImages) {
        throw new ApiError(401, "Image is requird")
    }

    const updatedProductImage = await Product.findByIdAndUpdate(productId,
        {
            featuedImages
        },
        { new: true }
    )

    if (!updatedProductImage) {
        throw new ApiError(500, "Something Went Wrong While Update The Products")
    }

    await updatedProductImage.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProductImage,
                "Product Updated SuccessFully"
            )
        )
})

const changeCatagoryDetails = asyncHandler(async (req, res) => {
    const { catagoryId } = req.params
    const { name, description } = req.body

    if (!name || !description) {
        throw new ApiError(401, "All Fileds Are Required");
    }

    const updatedCatagory = await Category.findByIdAndUpdate(catagoryId,
        {
            name,
            description
        },
        { new: true }
    )

    if (!updatedCatagory) {
        throw new ApiError(500, "Something Went Wrong");
    }

    await updatedCatagory.save({ validateBeforeSave: true })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCatagory,
                "Catagory Updated Successfully"
            )
        )
})

const changeCatagoryImage = asyncHandler(async (req, res) => {
    const { catagoryId } = req.params

    console.log(req.file);
    

    const imageLocalPath = req.file

    console.log('imageLocalPath :',imageLocalPath);
    

    const image = await uploadOnCloudnary(imageLocalPath)

    if (!image) {
        throw new ApiError(401, "Image is requird")
    }

    const updatedCatagoryImage = await Category.findByIdAndUpdate(catagoryId,
        {
            image
        },
        { new: true }
    )

    if (!updatedCatagoryImage) {
        throw new ApiError(500, "Something Went Wrong");
    }

    await updatedCatagoryImage.save({ validateBeforeSave: true })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCatagoryImage,
                "Catagory Updated Successfully"
            )
        )
})

const updateOrderDetails = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { status, statusLocation } = req.body
    
    if (status === "DELIVERED" || status === "CANCELLED" || status === "FAILED") {
        await CurruntOrder.findByIdAndDelete(orderId)

        res
            .status(200)
            .json(
                new ApiResponse(200,
                    {},
                    "Prodct Deleted Successfully"
                )
            )
    }

    const updatedOrder = await CurruntOrder.findByIdAndUpdate(orderId,
        {
            status,
            statusLocation
        },
        { new: true }
    )

    if (!updatedOrder) {
        throw new ApiError(500, "Something Went Wrong");
    }

    await updatedOrder.save({ validateBeforeSave: true })

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                updatedOrder,
                "Orderd Updated SuccessFully"
            )
        )
})

//get route functions

const getAdminDetails = asyncHandler(async (req, res) => {
    const adminDetails = await Admin.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.admin?.id)
            }
        },
        {
            $project: {
                email: 1,
                name: 1,
                adminId: 1,
                role: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                adminDetails,
                "Admin Details"
            )
        )
})  

const getCurruntOrders = asyncHandler(async (_, res) => {
    const curruntOrders = await CurruntOrder.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "curruntOrder",
                foreignField: "_id",
                as: "CurruntOrder",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user",
                            pipeline: [
                                {
                                    $project: {
                                        email: 1,
                                        fullName: 1,
                                        phoneNumber: 1,
                                        country: 1
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "product",
                            foreignField: "_id",
                            as: "product",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "catagories",
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
                                        catagories: {
                                            $first: "$catagories"
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        name: 1,
                                        productId: 1,
                                        price: 1,
                                        featuedImages:1,
                                        catagories: 1
                                    }
                                }
                            ]
                        },

                    },
                    {
                        $lookup: {
                            from: "useraddresses",
                            localField: "userDeliveryAddress",
                            foreignField: "_id",
                            as: "delivryaddress",
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
                        $addFields: {
                            user: {
                                $first: "$user"
                            },
                            product: {
                                $first: "$product"
                            },
                            delivryaddress: {
                                $first: "$delivryaddress"
                            },

                        }
                    },
                    {
                        $project: {
                            user: 1,
                            product: 1,
                            delivryaddress: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                CurruntOrder: {
                    $first: "$CurruntOrder"
                }
            }
        },
        {
            $project: {
                CurruntOrder: 1,
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
                curruntOrders,
                "All Currunt Orders"
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
                            photos: 1,
                            description: 1,
                            stock: 1,
                            featuedImages:1
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

const getAllProducts = asyncHandler(async (_,res)=>{

    const AllProducts = await Product.aggregate([
        {
            $project: {
                name: 1,
                featuedImages: 1,
                productId:1,
                price:1
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
                featuedImages:1,
                photos: 1,
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

const getOrderDetails = asyncHandler(async(req, res)=>{
    const {orderId} = req.params

    const order = await CurruntOrder.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(orderId)
            },
        },
        {
            $lookup: {
                from: "orders",
                localField: "curruntOrder",
                foreignField: "_id",
                as: "CurruntOrder",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user",
                            pipeline: [
                                {
                                    $project: {
                                        email: 1,
                                        fullName: 1,
                                        phoneNumber: 1,
                                        country: 1
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "product",
                            foreignField: "_id",
                            as: "product",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "catagories",
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
                                        catagories: {
                                            $first: "$catagories"
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        name: 1,
                                        productId: 1,
                                        price: 1,
                                        featuedImages:1,
                                        catagories: 1
                                    }
                                }
                            ]
                        },

                    },
                    {
                        $lookup: {
                            from: "useraddresses",
                            localField: "userDeliveryAddress",
                            foreignField: "_id",
                            as: "delivryaddress",
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
                        $addFields: {
                            user: {
                                $first: "$user"
                            },
                            product: {
                                $first: "$product"
                            }
                        }
                    },
                    {
                        $project: {
                            user: 1,
                            product: 1,
                            delivryaddress: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                CurruntOrder: {
                    $first: "$CurruntOrder"
                }
            }
        },
        {
            $project: {
                CurruntOrder: 1,
                status:1,
                statusLocation:1
            }
        }
    ])

    res
    .status(200)
    .json(
        new ApiResponse(
            201,
            order[0],
            "Currunt Order"
        )
    )

})


export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getCurruntAdmin,
    AdminsRefreshAccessToken,
    changeAdminCurruntPassword,
    changeAdminRole,
    changeAdminDetails,
    addCatagory,
    addProduct,
    changeCatagoryImage,
    changeProductFeatureImage,
    addPhotosToProduct,
    changeProductDetails,
    changeCatagoryDetails,
    updateOrderDetails,

    //get Routes
    getCurruntOrders,
    catagoryDetailsOrListOfCatagorysProduct,
    getAllCatagories,
    getProductsDetails,
    getAdminDetails,
    getOrderDetails,
    getAllProducts
}

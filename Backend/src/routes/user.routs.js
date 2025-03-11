import { Router }  from "express"
import { registerUser,loginUser,logoutUser,UsersRefreshAccessToken,addUserAddress,bookOrder,updateUserAddress,changeUsersCurruntPassword,
    //Get Request
    getUserDetails,getUserOrders,catagoryDetailsOrListOfCatagorysProduct,getAllCatagories,getProductsDetails
 } from "../controllers/user.controller.js"
import { verifyJWTUser } from "../middlewares/auth.user.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWTUser,logoutUser)
router.route("/refresh-token").post(UsersRefreshAccessToken)
router.route("/addAddress").post(verifyJWTUser, addUserAddress)
router.route("/updateUserAddress/:userddressId").post(verifyJWTUser, updateUserAddress)
router.route("/bookOrder/:productId").post(verifyJWTUser, bookOrder)
router.route("/changeUsersCurruntPassword").post(verifyJWTUser, changeUsersCurruntPassword)
router.route("/getUserDetails").get(verifyJWTUser, getUserDetails)
router.route("/getUserOrders").get(verifyJWTUser, getUserOrders)
router.route("/catagoryDetailsOrListOfCatagorysProduct/:catagoryId").get(catagoryDetailsOrListOfCatagorysProduct)
router.route("/getAllCatagories").get(getAllCatagories)
router.route("/getProductsDetails/:productId").get(getProductsDetails)

export default router
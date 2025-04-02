import { Router }  from "express"
import { registerUser,loginUser,logoutUser,getCurruntUser,UsersRefreshAccessToken,addUserAddress,bookOrder,updateUserAddress,changeUsersCurruntPassword,
    //Get Request
    getUserDetails,getUserOrders,catagoryDetailsOrListOfCatagorysProduct,getAllCatagories,getProductsDetails,getCurruntOrder,changeUserDetails,getAllProducts,findUserAddress,getCurruntOrderDetails,getUserOrderDetails
 } from "../controllers/user.controller.js"
import { verifyJWTUser } from "../middlewares/auth.user.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWTUser,logoutUser)
router.route("/refresh-token").post(UsersRefreshAccessToken)
router.route("/addAddress").post(verifyJWTUser, addUserAddress)
router.route("/updateUserAddress/:useraddressId").patch(verifyJWTUser, updateUserAddress)
router.route("/bookOrder/:productId").post(verifyJWTUser, bookOrder)
router.route("/changeUsersCurruntPassword").patch(verifyJWTUser, changeUsersCurruntPassword)
router.route("/changeUserDetails").patch(verifyJWTUser, changeUserDetails)

//get routs
router.route("/getCurruntUser").get(verifyJWTUser,getCurruntUser)
router.route("/getUserDetails").get(verifyJWTUser, getUserDetails)
router.route("/getUserOrders").get(verifyJWTUser, getUserOrders)
router.route("/getCurruntOrder").get(verifyJWTUser, getCurruntOrder)
router.route("/catagoryDetailsOrListOfCatagorysProduct/:catagoryId").get(catagoryDetailsOrListOfCatagorysProduct)
router.route("/getAllCatagories").get(getAllCatagories)
router.route("/getProductsDetails/:productId").get(getProductsDetails)
router.route("/getAllProducts").get(getAllProducts)
router.route("/findUserAddress/:userId").get(verifyJWTUser,findUserAddress)
router.route("/getCurruntOrderDetails/:orderId").get(verifyJWTUser,getCurruntOrderDetails)
router.route("/getUserOrderDetails/:orderId").get(verifyJWTUser,getUserOrderDetails)

export default router
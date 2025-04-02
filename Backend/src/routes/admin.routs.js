import { Router } from "express"
import {
    registerAdmin, loginAdmin, logoutAdmin, getCurruntAdmin,addPhotosToProduct, AdminsRefreshAccessToken, addCatagory, addProduct, changeProductDetails, changeCatagoryDetails, updateOrderDetails, changeAdminCurruntPassword, changeAdminRole, changeAdminDetails,changeProductFeatureImage,changeCatagoryImage,

    //get request
    getCurruntOrders, catagoryDetailsOrListOfCatagorysProduct, getAllCatagories, getProductsDetails, getAdminDetails,getOrderDetails,
    getAllProducts
} from "../controllers/admin.controller.js"
import { verifyJWTAdmin } from "../middlewares/auth.admin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWTAdmin, logoutAdmin)
router.route("/refresh-token").post(AdminsRefreshAccessToken)
router.route("/addCatagory").post(
    (req, res, next) => {next();},
    verifyJWTAdmin,
    upload.single("image"),
    (req, res, next) => {next();},
    addCatagory);


router.route("/addProduct/:catagoryId").post(verifyJWTAdmin,upload.single("featuedImages"),addProduct)

//patch Routs
router.route("/addPhotosToProduct/:productId").patch(verifyJWTAdmin,upload.array("image",10),addPhotosToProduct)
router.route("/changeCatagoryImage/:catagoryId").patch((req, res, next) => {next();},verifyJWTAdmin,upload.single("image"),(req, res, next) => {next();},changeCatagoryImage)
router.route("/changeProductFeatureImage/:productId").patch((req, res, next) => {next();},verifyJWTAdmin,upload.single("featuedImages"),(req, res, next) => {next();},changeProductFeatureImage)
router.route("/changeCatagoryDetails/:catagoryId").patch(verifyJWTAdmin, changeCatagoryDetails)
router.route("/changeProductDetails/:productId").patch(verifyJWTAdmin, changeProductDetails)
router.route("/updateOrderDetails/:orderId").patch(verifyJWTAdmin, updateOrderDetails)
router.route("/changeAdminCurruntPassword").post(verifyJWTAdmin, changeAdminCurruntPassword)
router.route("/changeAdminRole").patch(verifyJWTAdmin, changeAdminRole)
router.route("/changeAdminDetails").patch(verifyJWTAdmin, changeAdminDetails)

//get routes
router.route("/getCurruntAdmin").get(verifyJWTAdmin, getCurruntAdmin)
router.route("/getCurruntOrders").get(verifyJWTAdmin,getCurruntOrders)
router.route("/catagoryDetailsOrListOfCatagorysProduct/:catagoryId").get(verifyJWTAdmin, catagoryDetailsOrListOfCatagorysProduct)
router.route("/getAllCatagories").get(verifyJWTAdmin, getAllCatagories)
router.route("/getProductsDetails/:productId").get(verifyJWTAdmin, getProductsDetails)
router.route("/getAdminDetails").get(verifyJWTAdmin, getAdminDetails)
router.route("/getOrderDetails/:orderId").get(verifyJWTAdmin, getOrderDetails)
router.route("/getAllProducts").get(verifyJWTAdmin, getAllProducts)

export default router
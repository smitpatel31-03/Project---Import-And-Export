import { Router }  from "express"
import { registerAdmin,loginAdmin,logoutAdmin,AdminsRefreshAccessToken,addCatagory,addProduct,changeProductDetails,changeCatagoryDetails,updateOrderDetails,changeAdminCurruntPassword,changeAdminRole,changeAdminDetails,

//get request
getCurruntOrders,catagoryDetailsOrListOfCatagorysProduct,getAllCatagories,getProductsDetails} from "../controllers/admin.controller.js"
import { verifyJWTAdmin } from "../middlewares/auth.admin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWTAdmin ,logoutAdmin)
router.route("/refresh-token").post(AdminsRefreshAccessToken)
router.route("/addCatagory").post(verifyJWTAdmin,
    upload.fields([{
        name:"image",
        maxCount : 1
    }]),
    addCatagory)
router.route("/addProduct/:catagoryId").post(verifyJWTAdmin,
    upload.fields([{
        name:"photos",
        maxCount : 1
    }]),
    addProduct)
router.route("/changeProductDetails/:productId").post(verifyJWTAdmin,changeProductDetails)
router.route("/changeCatagoryDetails/:catagoryId").post(verifyJWTAdmin,changeCatagoryDetails)
router.route("/updateOrderDetails/:orderId").post(verifyJWTAdmin,updateOrderDetails)
router.route("/changeAdminCurruntPassword").post(verifyJWTAdmin,changeAdminCurruntPassword)
router.route("/changeAdminRole").post(verifyJWTAdmin,changeAdminRole)
router.route("/changeAdminDetails").post(verifyJWTAdmin,changeAdminDetails)
router.route("/getCurruntOrders").get(verifyJWTAdmin,getCurruntOrders)
router.route("/catagoryDetailsOrListOfCatagorysProduct/:catagoryId").get(verifyJWTAdmin,catagoryDetailsOrListOfCatagorysProduct)
router.route("/getAllCatagories").get(verifyJWTAdmin,getAllCatagories)
router.route("/getProductsDetails/:productId").get(verifyJWTAdmin,getProductsDetails)
    
    export default router
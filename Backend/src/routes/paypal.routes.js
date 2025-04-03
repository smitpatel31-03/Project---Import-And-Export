import { Router } from "express";
import {createOrder,captureOrder} from '../controllers/paypal.controller.js'
import { verifyJWTUser } from "../middlewares/auth.user.middleware.js"

const router = Router()

router.route('/create-order').post(verifyJWTUser,createOrder)
router.route('/capture-order').post(verifyJWTUser,captureOrder)

export default router
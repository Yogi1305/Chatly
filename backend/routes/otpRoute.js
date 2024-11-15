import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
const router=express.Router();


router.route("/otpverify").post(verifyOtp);
router.route("/otpsend").post(sendOtp);
export default router;
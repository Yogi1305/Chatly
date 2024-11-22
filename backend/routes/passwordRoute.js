import express from "express";
import { password } from "../controllers/passwordreset.js";
const router=express.Router();

router.route("/passwordreset").post(password);

export default router;
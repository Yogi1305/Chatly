import bcrpyt from "bcryptjs";
import { User } from "../models/userModel.js";

export const password = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const emailver = await User.findOne({ email });
        if (!emailver)
            return res.status(200).json({
                message: "email doesnot exits",
                success: false
            })
        const hashedPassword = await bcrpyt.hash(pass, 10);

        const update = await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        if (update.modifiedCount > 0) {
            return res.status(200).json({
                message: "Password updated successfully",
                success: true,
            });
        } else {
            return res.status(500).json({
                message: "Failed to update password",
                success: false,
            });
        }
    } catch (error) {
       console.log("password reset se hu ",error);
       
    }
}

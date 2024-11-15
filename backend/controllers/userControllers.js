// logic to register the user
import { User } from "../models/userModel.js";
import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender, email } =
      req.body;
    if (
      !fullName ||
      !userName ||
      !password ||
      !confirmPassword ||
      !gender ||
      !email
    ) {
      return res.status(400).json({ message: "All field are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password doesnot match with confirm password " });
    }
    // validate email
    const regex = /^[a-zA-Z]+\.(22[2-7][0-9][0-9])@knit\.ac\.in$/;
    // return regex.test(email);
    if (!regex.test(email)) {
      return res
        .status(400)
        .json({ message: "please enter the college email" });
    }

    const useremail = await User.findOne({ email });
    if (useremail) {
      return res.status(400).json({ message: "email  already exist" });
    }

    // if username already exist check
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "username already exist" });
    }
    //   hash the password and legth of salt is 10;
    const hashpassword = await bcrpyt.hash(password, 10);
    //   to create a new user
    // when key and value is same donot write like fullName:fullName

    // for image
    const img = `https://avatar.iran.liara.run/public/${gender}?username=${userName}`;
    await User.create({
      fullName,
      userName,
      email,
      password: hashpassword,
      profileImg: img,
      gender,
    });
    //   const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    //   const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //   await User.create({
    //       fullName,
    //       username,
    //       password: hashedPassword,
    //       profilePhoto: gender === "boy" ? maleProfilePhoto : femaleProfilePhoto,
    //       gender
    //   });
    return res.status(201).json({
      message: "account create successfully",
      success: true,
    });
  } catch (error) {
    console.log("error is occur in usercontroller", error);
  }
};

// login

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: "username or password field is empty",
      });
    }
    const user = await User.findOne({ userName });
    if (!user)
      return res.status(200).json({
        message: "user doesnot exist",
        success: false,
      });
    const isPassword = await bcrpyt.compare(password, user.password);
    if (!isPassword) {
      return res.status(200).json({
        message: "password doesnot match",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set the token as a cookie and return user info
    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .status(200)
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profileImg: user.profileImg,
        success: true,
        message: `Welcome back ${user?.fullName.toUpperCase()}`,
      });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// logout

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

// authencation

export const getOtherUsers = async (req, res) => {
  try {
    const isLoggedIN = req.id;
    // find all user expect logged in user
    const otherUsers = await User.find({ _id: { $ne: isLoggedIN } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log("error in authencation in usercontroller:", error);
  }
};

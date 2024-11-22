import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { BASEURL } from "..";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/userSlice";

const PasswordReset = () => {
  const [User, setUser] = useState({ email: "" });
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [NewPass, setNewPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");

  const sendOtpHandler = async () => {
    try {
      const res = await axios.post(`${BASEURL}/api/v1/otp/otpsend`, { email: User.email }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      dispatch(setEmail(User.email));
      if (res.data.success) {
        toast.success(res.data.message);
        setIsOtpSent(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post(`${BASEURL}/api/v1/otp/otpverify`, { email: User.email, otp }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsVerified(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (NewPass !== ConfirmPass) {
      toast.error("New password does not match Confirm password");
      return;
    }
    try {
      const res = await axios.post(`${BASEURL}/api/v1/password/passwordreset`, { email: User.email, pass: NewPass }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An error occurred while resetting your password");
    }
  };

  return (
    <div className="text-black min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Email</h1>
        <form onSubmit={(e) => { e.preventDefault(); sendOtpHandler(); }}>
          <div>
            <label className="label p-2">
              <span className="text-base">Email</span>
            </label>
            <input
              value={User.email}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-secondary my-2">
            Send OTP
          </button>
        </form>
        {isOtpSent && (
          <form onSubmit={(e) => { e.preventDefault(); verifyOtpHandler(); }}>
            <div>
              <label className="label p-2">
                <span className="text-base">OTP</span>
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="ml-2 p-1 bg-white border-none rounded-md w-full"
                placeholder="Enter the OTP"
                type="text"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-secondary my-2">
              Verify OTP
            </button>
          </form>
        )}
        {isVerified && (
          <form onSubmit={updatePasswordHandler}>
            <div>
              <label className="label p-2">
                <span className="text-base">Enter the new Password</span>
              </label>
              <input
                value={NewPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="ml-2 p-1 bg-white border-none rounded-md w-full"
                placeholder="Enter the Password"
                type="password"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base">Confirm the Password</span>
              </label>
              <input
                value={ConfirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="ml-2 p-1 bg-white border-none rounded-md w-full"
                placeholder="Enter the confirm password"
                type="password"
              />
            </div>
            <button type="submit" className="btn">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;

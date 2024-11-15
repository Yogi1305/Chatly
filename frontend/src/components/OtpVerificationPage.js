// import React, { useState } from 'react';
// import { BASEURL } from '..';
// import axios from 'axios';



// const OtpVerificationPage = () => {
//   const [otpverify,setverify]=useState(null);
//   const onSubmitHandler =async(e)=>{
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASEURL}/api/v1/otp/otpverify`, otpverify, {
//         headers: {
//             'Content-Type': 'application/json',
          
//         },
//         withCredentials:true  });
//     } catch (error) {
//       console.log("error hu otpveri se",error);
      
//     }
//   }
//   return (
//     <div onSubmit={onSubmitHandler} className="w-screen h-screen flex justify-center items-center ">
//       <form className="w-full max-w-md p-8   shadow-lg bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700 ">OTP Verification</h2>
        
//         <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="otp">
//           Enter the OTP
//         </label>
        
//         <input
//            value={setverify(otpverify)}
//           type="text"
//           id="otp"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//           placeholder="Enter your OTP"
//         />
        
//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition duration-300 ease-in-out"
//         >
//           Verify OTP
//         </button>
//       </form>
//     </div>
//   );
// }

// export default OtpVerificationPage;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { BASEURL } from "..";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/userSlice";

const OtpVerificationPage = () => {
  const [User,setUser]=useState({
    
   
    email:""
});
const dispatch=useDispatch();

  
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  

  const sendOtpHandler = async () => {
    try {
      const res = await axios.post(`${BASEURL}/api/v1/otp/otpsend`, { email: User.email },{
        headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true
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
      const res = await axios.post(`${BASEURL}/api/v1/otp/otpverify`, { email: User.email, otp },{
        headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsVerified(true);
        navigate("/register")
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

 

  return (
    <div className="text-black min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Email Verification</h1>
        <form >
          
          <div>
            <label className="label p-2">
              <span className="text-base ">Email</span>
            </label>
            <input
              value={User.email}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your email"
              type="email"
            ></input>
          </div>
          <button type="button" onClick={sendOtpHandler} className="btn btn-sm btn-secondary my-2">
            Send OTP
          </button>
          {isOtpSent && (
            <>
              <div>
                <label className="label p-2">
                  <span className="text-base ">OTP</span>
                </label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="ml-2 p-1 bg-white border-none rounded-md w-full"
                  placeholder="Enter the OTP"
                  type="text"
                ></input>
              </div>
              <button type="button" onClick={verifyOtpHandler} className="btn btn-sm btn-secondary my-2">
                Verify OTP
              </button>
              
            </>
          )}
          
           
           
         </form>
       </div>
     </div>
   );
 };
 
 export default OtpVerificationPage;
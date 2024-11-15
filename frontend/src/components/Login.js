import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, } from 'react-redux';
import { setAuthUser, } from '../redux/userSlice.js';
import { BASEURL } from '..';

const Login = () => {
  const [User, setUser] = useState({
    userName: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch=useDispatch();
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
     try {
    const res = await axios.post(`${BASEURL}/api/v1/user/login`, User, {
      headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true  // Include cookies or other credentials with the request
  });
  // need to change to redirect the login to homechat
   if(res?.data?.success)
   {
    navigate("/");
    dispatch(setAuthUser(res?.data));
    toast.success(res?.data?.message)
   }
   else
   {
         navigate('/login');
         toast.error(res?.data?.message);
   }
  
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("hello login page se hu",error);
  }
    setUser({
      userName: "",
      password: ""
    });
  };

  return (
    <div className="text-black min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base">Username</span>
            </label>
            <input
              value={User.userName}
              onChange={(e) => setUser({ ...User, userName: e.target.value })}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your username"
              type="text"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              value={User.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <Link to="/emailVerification" className="hover:text-red-600 hover:underline mx-2">
            Don't have an account?
          </Link>
          <div>
            <button className="mt-1 btn btn-block btn-sm btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

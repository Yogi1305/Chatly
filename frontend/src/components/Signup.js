import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import { BASEURL } from "..";
import { useSelector } from "react-redux";



const Signup = () => {
  const {email}=useSelector(store=>store.user);
  const [User,setUser]=useState({
        fullName:"",
        userName:"",
        password:"",
        confirmPassword:"",
        gender:"",
        email:email,
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...User, gender });
  }
  const onSubmitHandler=async(e)=>{
   e.preventDefault();
   
   try {
    
    
    const res = await axios.post(`${BASEURL}/api/v1/user/register`, User, {
      headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true  // Include cookies or other credentials with the request
  });
  if (res.data.success) {
    navigate("/login");
    toast.success(res.data.message);
  }

  } catch (error) {
    toast.error(error.response.data.message);
    console.log("hello",error);
  }
   
  // setUser({
  //   fullName:"",
  //       userName:"",
  //       password:"",
  //       confirmPassword:"",
  //       gender:"",
  //       email:""
  // })
   
  };
  return (
    <div className="text-black min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base ">Full NAME</span>{" "}
            </label>
            <input
               value={User.fullName}
               onChange={(e)=>setUser({...User,fullName:e.target.value})}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your name"
              type="text"
            ></input>
          </div>
          {/* <div>
            <label className="label p-2">
              <span className="text-base ">Email</span>{" "}
            </label>
            <input
             value={User.email}
             onChange={(e)=>setUser({...User,email:e.target.value})}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your email"
              type="email"
            ></input>
          </div> */}
          <div>
            <label className="label p-2">
              <span className="text-base ">Username</span>{" "}
            </label>
            <input
             value={User.userName}
             onChange={(e)=>setUser({...User,userName:e.target.value})}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your username"
              type="text"
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base ">Password</span>{" "}
            </label>
            <input
              value={User.password}
              onChange={(e)=>setUser({...User,password:e.target.value})}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your password"
              type="password"
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base ">Confirm Password</span>{" "}
            </label>
            <input
             value={User.confirmPassword}
             onChange={(e)=>setUser({...User,confirmPassword:e.target.value})}
              className="ml-2 p-1 bg-white border-none rounded-md w-full"
              placeholder="Enter your password"
              type="password"
              autocomplete="new-password"
            ></input>
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input type="checkbox" 
              checked={User.gender === "boy"}
              onChange={() => handleCheckbox("boy")}
             
              className="checkbox mx-2" />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input type="checkbox" 
              
              checked={User.gender === "girl"}
              onChange={() => handleCheckbox("girl")}
              
              className="checkbox mx-2" />
            </div>
          </div>
          <Link to="/login" className= "  hover:text-red-600 hover:underline mx-2">
          Already have a account !!
          </Link>
          <div>
            <button className=" mt-1 btn btn-block btn-sm btn-primary"
            type="submit"
            >Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

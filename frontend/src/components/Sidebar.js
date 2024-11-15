import React, { useState } from 'react'
import {BiSearchAlt2} from "react-icons/bi";
import OtherUsers from './OtherUsers';
import {useNavigate}from "react-router-dom"
import axios from "axios";
import {toast}from "react-hot-toast"
import { setAuthUser, setOtherUsers} from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '..';

const Sidebar = () => {
  const [search,setsearch]=useState("");
  const {otherUsers,authUser} = useSelector(store=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logOutHandler=async()=>{
    try {
      const res= await axios.get(`${BASEURL}/api/v1/user/logout`);
      toast.success(res.data.message);
      navigate("/login");
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log("error is sidebar :",error);
      
    }
  }
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser){
        dispatch(setOtherUsers([conversationUser]));
    }else{
        toast.error("User not found!");
    }
}
  return (
    <div  className='border-r border-slate-500 p-4 flex flex-col relative text-white'>
        <form onSubmit={searchSubmitHandler}  action='' className='flex items-center gap-2'>
              <input 
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
              type='text' className='input input-bordered rounded-md bg-white text-black'>
              </input>
              <button type='submit' className='btn bg-zinc-700 text-white'><BiSearchAlt2 className='w-6 h-6 outline-none'/></button>
        </form>
        <div className='divider px-3'></div>
        <OtherUsers/>
        <div className='absolute right-0 left-0 bottom-0 mb-1'>
            <button onClick={logOutHandler} className='btn btn-sm'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar
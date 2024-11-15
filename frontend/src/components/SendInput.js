import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import {toast} from "react-hot-toast";
import { BASEURL } from '..';

const SendInput = () => {
  const[inputMessage,setInputMessage]=useState("");
  const {selectedUser}=useSelector(store=>store.user);
  const {messages}=useSelector(store=>store.message)
  const dispatch=useDispatch();
  const onSubmitHanlder= async(e)=>{
    e.preventDefault();
    if (!inputMessage.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      axios.defaults.withCredentials=true;
      // mesage type is json object
      const res=await axios.post(`${BASEURL}/api/v1/message/send/${selectedUser?._id}`, { message: inputMessage },{inputMessage},{
        headers:{
          'Content-Type':'application/json'
      },
      withCredentials:true
      });
      // dispatch(setMessages(...messages,res?.data?.newMessage));
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      // console.log(res);
      
      setInputMessage("");

    } catch (error) {
      console.log("SendInput ka error hu :",error);
      
    }
    // alert(inputMessage);
  }
  return (
    <form onSubmit={onSubmitHanlder} className='px-4 my-3'>
    <div className='w-full relative'>
        <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            type="text"
            placeholder='Send a message...'
            className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
            <IoSend />
        </button>
    </div>
</form>
  )
}

export default SendInput
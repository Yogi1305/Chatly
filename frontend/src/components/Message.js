import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
  const {authUser,selectedUser}=useSelector(store=>store.user);
  const scroll =useRef();
  useEffect(() => {
      // to get current message look first 
      scroll?.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  return (
    
      <div  ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar"></div>
        <div className="chat-header">
          
          <time className="text-xs opacity-50">{new Date().toLocaleString()}</time>
        </div>
        <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `}>{message?.message}</div>
        
      </div>
    
  );
};

export default Message;

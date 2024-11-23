import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector(store => store.user);
  const scroll = useRef();

  useEffect(() => {
    // Scroll to the bottom whenever the message updates
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Format the time sent (you can adjust the format as needed)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // or use .toLocaleString() if you want the date as well
  };

  return (
    <div
      ref={scroll}
      className={`chat ${message?.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar"></div>
      <div className="chat-header">
        {/* Display the time message was sent */}
        <time className="text-xs opacity-50">{formatTime(message?.timestamp)}</time>
      </div>
      <div
        className={`chat-bubble ${message?.senderId !== authUser?._id ? "bg-gray-200 text-black" : ""}`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;

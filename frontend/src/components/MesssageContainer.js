import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";

const MesssageContainer = () => {
  const { selectedUser ,authUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const isOnline = onlineUsers?.includes(selectedUser?._id);
  // useEffect(() => {
  //   dispatch(setSelectedUser(null));
  // }, []);
  return (
    <>
    {
        selectedUser !== null ? (
            <div className='md:min-w-[550px] flex flex-col'>
                <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                    <div className={`avatar ${isOnline ? 'online' : ''}`}>
                        <div className='w-12 rounded-full'>
                            <img src={selectedUser?.profileImg} alt="user-profile" />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between gap-2 flex-col'>
                            <p>{selectedUser?.fullName}</p>
                            <p className="text-sm opacity-20">{selectedUser?.email}</p>
                        </div>
                    </div>
                </div>
                <Messages />
                <SendInput />
            </div>
        ) : (
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
                <h1 className='text-2xl text-white'>Let's start conversation</h1>

            </div>
        )
    }
</>
  );
};

export default MesssageContainer;

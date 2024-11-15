import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = ({user}) => {
  // console.log(user);
  const dispatch =useDispatch();
  const {selectedUser,onlineUsers}=useSelector(store=>store.user);
  const isOnline=onlineUsers?.includes(user?._id);
  const selectedUserHandler=()=>{

   dispatch(setSelectedUser(user));
  }
  return (
  
    <div>
      <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id===user?._id?"bg-blue-300":""} flex gap-2 items-center   rounded-md cursor-pointer p-2`}>
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profileImg} alt="User Profile"></img>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex  justify-between  gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 color"></div>

    </div>
  )
}

export default OtherUser
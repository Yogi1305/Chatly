import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hook/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // console.log("otherUser se call kiya hai");
  // my custom hook
  // user is of store not from schema
  useGetOtherUsers();
  const {otherUsers}=useSelector(store=>store.user);
  if(!otherUsers)return ;
  // console.log(OtherUsers);
  
  return (
    <div className="overflow-auto">
      {
        otherUsers?.map((user)=>{
          return (
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
      
      

    </div>
  );
};

export default OtherUsers;

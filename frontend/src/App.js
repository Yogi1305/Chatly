import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.js";
import HomePage from "./components/HomePage.js";
import Login from "./components/Login.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice.js";
import { setSocket } from "./redux/socketSlice.js";
 import {BASEURL} from ".";
import OtpVerificationPage from "./components/OtpVerificationPage.js";
import PasswordReset from "./components/PasswordReset.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
     path:"/emailverification",
     element:<OtpVerificationPage/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/passwordreset",
    element:<PasswordReset/>
  },
]);

function App() {
  
  const { authUser } = useSelector((store) => store.user);
  const {socket}=useSelector((store)=>store.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io(`${BASEURL}`, {
        query: {
          userId: authUser?._id,
        },
      });
      
      dispatch(setSocket(socket));
      socket?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className=" p-4 h-screen flex items-center justify-center ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

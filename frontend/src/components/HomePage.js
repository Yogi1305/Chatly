import React from 'react'
import Sidebar from './Sidebar.js'
import MesssageContainer from './MesssageContainer.js'
import { useSelector } from 'react-redux'
import Login from './Login.js'

const HomePage = () => {
  const {authUser}=useSelector(store=>store.user);
  return (
    <>
      {
        authUser ? (
          < div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar />
            <MesssageContainer />
          </div>
        ) : (
          <Login />
        )
      }
    </>
  )
}

export default HomePage
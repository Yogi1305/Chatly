import React from 'react'
import Message from './Message'
import useGetMessages from '../hook/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealMessages from '../hook/useGetRealMessages';

const Messages = () => {
  useGetMessages();
  useGetRealMessages();
  const {messages}=useSelector(store=>store.message);
  if(!messages)return ;
  return (
    <div className='px-4 flex-1  overflow-auto'>
      {
        messages.map((message)=>{
          return (
            <Message key={message?._id} message={message}/>
          )
        })
      }
   
    </div>
  )
}

export default Messages
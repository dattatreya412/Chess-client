import React from 'react'
import { MdInbox, MdMarkEmailUnread } from 'react-icons/md';

const MessagesNavBar = () => {
  return (
    <section className='flex justify-evenly items-center h-12 w-full bg-black bg-opacity-50 rounded-lg shadow-md p-2'>
        <div className='flex flex-col items-center w-14 hover:bg-black hover:bg-opacity-10 rounded-2xl p-1 transition duration-300 ease-in-out transform hover:scale-105'>
            <MdInbox size={24} className='text-white'/>
            <small className='text-white'>Inbox</small>
        </div>
        <div className='flex flex-col items-center w-14 hover:bg-black hover:bg-opacity-10 rounded-2xl p-1 transition duration-300 ease-in-out transform hover:scale-105'>
            <MdMarkEmailUnread size={24} className='text-white'/>
            <small className='text-white'>Unread</small>
        </div>
    </section>
  )
}

export default MessagesNavBar
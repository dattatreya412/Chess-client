import React from 'react'
import { MdInbox, MdMarkEmailUnread } from 'react-icons/md';


const MessagesNavBar = () => {
  return (
    <section className='flex justify-evenly items-center h-12 w-64 bg-black bg-opacity-50'>
        <div className='flex flex-col items-center  w-14 hover:bg-black hover:bg-opacity-10 rounded-2xl'>
            <MdInbox size={20}/>
            <small>Inbox</small>
        </div>
        <div className='flex flex-col items-center  w-14 hover:bg-black hover:bg-opacity-10 rounded-2xl'>
            <MdMarkEmailUnread size={20}/>
            <small>Unread</small>
        </div>

    </section>
  )
}

export default MessagesNavBar
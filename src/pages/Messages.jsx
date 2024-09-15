import React from 'react'
import MessagesNavBar from './Messages/MessagesNavBar'
import NewMessageBar from './Messages/NewMessageBar'
import FriendsList from './Messages/FriendsList'
import ConversationHeader from './Messages/ConversationHeader'
import MessagesContainer from './Messages/MessagesContainer'

const Messages = () => {
  return (
    <section className='flex w-full h-full gap-7 '>
      <div className='h-full'>
      <MessagesNavBar/>
      <NewMessageBar/>
      <FriendsList/>
      </div>
      <div className='w-[55vw]'>
        <ConversationHeader/>
        <MessagesContainer/>
      </div>
    </section>
  )
}

export default Messages
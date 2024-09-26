import React from 'react'


const ConversationHeader = ({displayMessagesList, presentConversation}) => {
  return (
    <section className='flex justify-between items-center h-12 w-full bg-gray-800 px-6 py-2 rounded-lg shadow-md'>
        <p className='text-white text-lg font-semibold'>{!displayMessagesList ? "Compose New Message" : `Conversation with ${presentConversation}`}</p>
    </section>
  )
}

export default ConversationHeader
import React from 'react'
import SendMessage from './SendMessage'

const MessagesContainer = () => {
  return (
    <section className='relative w-full h-[86vh] bg-black bg-opacity-40'> 
    <div className='absolute flex items-end h-full w-full'>
    <SendMessage/>
    </div>
        
    </section>
)
}

export default MessagesContainer
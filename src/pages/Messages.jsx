import React, {useState} from 'react'
import MessagesNavBar from './Messages/MessagesNavBar'
import NewMessageBar from './Messages/NewMessageBar'
import MessagesList from './Messages/MessagesList'
import ConversationHeader from './Messages/ConversationHeader'
import MessagesContainer from './Messages/MessagesContainer'

const Messages = () => {
  const [conversationHeader, setConversationHeader] = useState('');
  const [messages, setMessages] = useState('');
  const [displayMessagesList, setDisplayMessagesList] = useState(false);
  const displayMessages = (item) => {
    console.log("trigered message ")
    console.log(item)
    setMessages(item.messagesId);
    setDisplayMessagesList(true)
  };
  return (
    <section className='flex w-full h-[95vh] gap-7 p-4'>
      <div className='h-full w-1/3 bg-white rounded-lg shadow-md p-4'>
        <MessagesNavBar/>
        <NewMessageBar/>
        <MessagesList displayMessages={displayMessages} />
      </div>
      <div className='w-2/3 bg-white rounded-lg shadow-md p-4'>
        <ConversationHeader displayMessagesList={displayMessagesList}/>
        <MessagesContainer messages={messages} displayMessagesList={displayMessagesList}/>
      </div>
    </section>
  )
}

export default Messages
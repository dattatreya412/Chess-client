import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";

const MessagesContainer = ({ objectId, displayMessagesList, presentConversation }) => {
  const [messagesList, setMessagesList] = useState([]);
  const userName = useSelector((state) => state.user.username);
  const messages = useSelector((state) => state.messages.items);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if(objectId !== '' && messages && messages.messagesList){
      let data = messages.messagesList.filter(item => item.userId === objectId);
      data = data[0]
      if(data.messagesId){
        setMessagesList(data.messagesId)
      }
    }
  }, [objectId, messages]);

  return (
    <section className="relative mt-1 w-full h-[78vh] bg-black bg-opacity-40 flex flex-col rounded-lg shadow-lg p-4">
      {displayMessagesList && (
        <div 
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto"
        >
          <ul className="space-y-4 p-4 h-[44vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {messagesList.map((item) => {
              const alignmentClass = item.sentBy === userName ? "ml-auto" : "mr-auto";
              const bubbleColorClass = item.sentBy === userName ? "bg-green-500" : "bg-gray-700";
              return (
                <li 
                  key={item._id} 
                  className={`flex ${item.sentBy === userName ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`${bubbleColorClass} p-3 rounded-lg max-w-xs lg:max-w-md shadow-md`}>
                    <p className="text-white break-words">{item.message}</p>
                  </div>
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>
        </div>
      )}
      <div className="mt-auto">
        <SendMessage displayMessagesList={displayMessagesList} presentConversation={presentConversation} />
      </div>
    </section>
  );
};

export default MessagesContainer;
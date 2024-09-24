import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../sockets";
import Header from "../BoardTools/Header";

const MessagesInGame = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = useSelector(state => state.user.username)
  useEffect(() => {
    socket.on("messageFromServer", (messageFromServer) => {
      console.log("trigerd")
      console.log("Message from server: " + messageFromServer);
      setMessages((prevMessages) => [...prevMessages, messageFromServer]);
    });
    return () => {
      socket.off("sendMessageToclient");
    };
  }, []);

  function handleMessage() {
    if (message.trim()) { 
      socket.emit("sendMessage",username + ": " + message);
      setMessage(""); 
    }
  }

  function onKeyDown(event){
    if(event.key === 'Enter'){
      handleMessage()
    }
  }

  return (
    <div className="h-60 w-full bg-gray-800 rounded-lg shadow-md mt-2">
      <Header title="Messages" />
      <ul
        id="messageBox"
        className="h-28 mx-4 text-white overflow-auto scrollbar-custom"
      >
        {messages.map((mes, index) => (
          <li key={index} className="mb-1 text-sm">{mes}</li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-2 px-4">
        <input
          className="bg-gray-700 w-3/4 px-3 py-1 text-white text-sm border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
          type="text"
          placeholder="Type your message..."
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={handleMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesInGame;

// import React, { useEffect, useState } from "react";
// import { socket } from "../../sockets";
// import Header from "../BoardTools/Header";
// const MessagesInGame = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   useEffect(() => {
//     socket.on("sendMessageToclient", (messageFromServer) => {
//       console.log("trigerd.")
//       console.log("message from server : " + messageFromServer)
//       setMessages((prevMessages) => [...prevMessages, messageFromServer]);
//       console.log(messages)
//     });

//     return ()=>{
//       socket.off("sendMessageToClient")
//     }
//   }, []);
//   function handleMessage() {
//     socket.emit("sendMessage", message);
//     setMessage("");
//   }
//   return (
//     <div className="h-40 w-full ">
//       <Header title="Messages" />
//       <ul
//         id="messageBox"
//         className="h-36 mx-4 text-white overflow-auto scrollbar-custom"
//       >
//         {messages.map((mes) => {
//           return <li>{mes}</li>;
//         })}
//       </ul>
//       <div className="flex justify-between my-3">
//         <input
//           className="bg-black bg-opacity-80 w-56 mx-2 px-1 text-white text-sm border-none outline-none"
//           type="text"
//           onChange={(event) => {
//             setMessage(event.target.value);
//           }}
//           value={message}
//         />
//         <button
//           onClick={handleMessage}
//           className="bg-green-500 px-2 mx-2  rounded-md text-sm"
//         >
//           send message
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessagesInGame;





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
    <div className="h-40 w-full ">
      <Header title="Messages" />
      <ul
        id="messageBox"
        className="h-36 mx-4 text-white overflow-auto scrollbar-custom"
      >
        {messages.map((mes, index) => (
          <li key={index}>{mes}</li>
        ))}
      </ul>
      <div className="flex justify-between my-3">
        <input
          className="bg-black bg-opacity-80 w-56 mx-2 px-1 text-white text-sm border-none outline-none"
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={handleMessage}
          className="bg-green-500 px-2 mx-2 rounded-md text-sm"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default MessagesInGame;

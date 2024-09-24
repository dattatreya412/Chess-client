import React, { useEffect, useState } from "react";
import { findUserNamesForMessages, sendMessage as sendMessageAction, fetchMessagesList } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

const SendMessage = ({defaultUsername = ""}) => {
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState(defaultUsername);
  const sentBy = useSelector((state) => state.user.username);
  const userId = useSelector((state)=>state.user._id)
  const usernames = useSelector((state) => state.user.userNamesForMessages);
  const messagesList = useSelector((state)=> state.user.messagesList)
  console.log(JSON.stringify(messagesList))
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchMessagesList(userId))
  },[dispatch])

  function handleSendMessage(event) {
    event.preventDefault();
    if (message.trim()) {
      dispatch(
        sendMessageAction({
          sentBy,
          sentTo,
          message,
        })
      );
      setMessage("");
    } else {
      console.log("Message is not valid");
    }
  }

  function handleSearch(event) {
    const searchText = event.target.value;
    setSentTo(searchText);
    dispatch(findUserNamesForMessages(searchText));
  }

  function selectName(username) {
    setSentTo(username);
    dispatch(findUserNamesForMessages(""));
  }

  return (
    <section className="absolute bottom-0 left-0 right-0 w-full bg-gray-800 p-4 rounded-t-lg shadow-lg">
      <div className="flex items-center mb-4">
        <p className="text-white mr-2">To:</p>
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border border-gray-600 p-2 outline-none text-black bg-gray-200 focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
          value={sentTo}
        />
      </div>
      {usernames.length > 0 && sentTo && (
        <div className="relative">
          <ul className="absolute z-10 w-full bg-white bg-opacity-90 rounded-md shadow-md max-h-40 overflow-y-auto">
            {usernames.map((data, index) => (
              <li
                onClick={() => selectName(data.username)}
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-gray-800">{data.username}</p>
                <span
                  className={`w-3 h-3 rounded-full ${
                    data.isLive ? "bg-green-500" : "bg-red-600"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full block h-20 p-3 rounded-md border border-gray-600 bg-gray-700 text-white resize-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default SendMessage;

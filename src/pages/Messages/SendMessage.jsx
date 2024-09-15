import React, { useEffect, useState } from "react";
import { findUserNamesForMessages, sendMessage as sendMessageAction, fetchMessagesList } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState("");
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
    <section className="w-full h-[40vh]">
      <div className="flex">
        <p>To:</p>
        <input
          type="text"
          placeholder="Search"
          className="w-28 rounded-sm border border-gray-300 p-1 outline-none text-black"
          onChange={handleSearch}
          value={sentTo}
        />
      </div>
      {usernames.length > 0 && sentTo && (
        <div className="relative">
          <ul className="max-w-max w-fit p-2 bg-white bg-opacity-60 ml-12 mt-12 rounded-sm">
            {usernames.map((data, index) => (
              <li
                onClick={() => selectName(data.username)}
                key={index}
                className="flex flex-row items-center justify-center h-full w-full gap-2 cursor-pointer"
              >
                <p>{data.username}</p>
                <p
                  className={`w-2 h-2 rounded-full ${
                    data.isLive ? "bg-green-500" : "bg-red-600"
                  }`}
                ></p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Send a message?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-11/12 block h-[25vh]"
        />
        <button
          type="submit"
          className="bg-green-400 px-2 py-1 m-1 text-white"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default SendMessage;

import React, { useState, useEffect } from "react";
import { useSelector} from 'react-redux'
import MessageDetails from "./MessageDetails";
import { socket } from '../../sockets';
import { useDispatch } from 'react-redux';
import { addMessages } from '../../store/messagesSlice'

const MessagesList = ({ displayMessages, setObjectId  }) => {
  const [messagesData, setMessagesData] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    function fetchMessagesList() {
      if (userId) {
        socket.emit("getMessageList", { userId });
      }
    }

    socket.on("check", () => {
      fetchMessagesList();
    });

    socket.on("messageListReceived", (response) => {
      if (response.success) {
        setMessagesData(response.list);
        dispatch(addMessages(response.list));
      } else {
        console.log("Failed to fetch message list:", response.message);
      }
    });

    socket.on("messageListError", (error) => {
      console.error("Error fetching message list:", error.message);
    });

    // Initial fetch
    fetchMessagesList();

    return () => {
      socket.off("check");
      socket.off("messageListReceived");
      socket.off("messageListError");
    };
  }, [userId]);

  return (
    <section className="w-full mt-1 bg-gray-800 bg-opacity-90 h-[70vh] p-4 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {messagesData.messagesList  && messagesData.messagesList.map((item) => (
          <MessageDetails key={item._id} item={item} displayMessages={displayMessages} setObjectId={setObjectId} 
           />
        ))}
      </ul>
    </section>
  );
};

export default MessagesList;

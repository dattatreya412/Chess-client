import React, { useState, useEffect } from "react";
import {fetchMessages} from  '../../store/messagesSlice'
import {useDispatch, useSelector} from 'react-redux'
import MessageDetails from "./MessageDetails";

const MessagesList = ({displayMessages}) => {
  const dispatch = useDispatch();
  const messagesData = useSelector((state) => state.messages.items);
  const userId = useSelector((state) => state.user._id);
  console.log(JSON.stringify(messagesData.messagesList))
  useEffect(() => {
    dispatch(fetchMessages(userId));
  }, [dispatch, userId]);

  return (
    <section className="w-full mt-1 bg-gray-800 bg-opacity-90 h-[70vh] p-4 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {messagesData.messagesList  && messagesData.messagesList.map((item) => (
          <MessageDetails key={item._id} item={item} displayMessages={displayMessages} />
        ))}
      </ul>
    </section>
  );
};

export default MessagesList;

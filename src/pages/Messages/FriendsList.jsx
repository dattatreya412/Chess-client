import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FriendDetails from "./FriendDetails";

const FriendsList = () => {
  const messagesList = useSelector((state)=> state.user.messagesList)
  console.log( JSON.stringify(messagesList))

  if(messagesList){
    console.log( JSON.stringify(messagesList))
  return (
    <section className="w-64 bg-black bg-opacity-40 h-[82vh] p-2">
      <ul>   
      {messagesList &&
        messagesList.map(async (element) => {
          // try {
          //   const { data } = await axios.get(
          //     `http://localhost:4000/message/${element.messagesId}`
          //   )
          //    return <li> <FriendDetails data = {data}/> </li>
          // } catch (err) {
          //   console.log(err);
          // }
        })}
      </ul>
    </section>
  );
};
}


export default FriendsList;

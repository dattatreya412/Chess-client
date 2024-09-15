import React, { useEffect } from "react";
import ChessBoardLive from "../components/BoardTools/ChessBoardLive";
import { socket } from "../sockets";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export const Live = () => {
  const time = useSelector((state) => state.userPrefarence.time) * 60;
  const name = useSelector((state) => state.user.username);
  const logo = useSelector((state) => state.userPrefarence.userProfileImg);
  const playerId = useSelector(state => state.user._id)
  // console.log(JSON.stringify(playerId))
  console.log("trigerd Live component.");
  const location = useLocation();
  const { isSpectator = false, id = -1 } = location.state || {}; 
  console.log("isSpectator: " + isSpectator + " id: " + id)
  useEffect(() => {
    if(!isSpectator){
      socket.emit("joinRoom",  {time, playerId});
    socket.on('roomId',(roomId)=>{
      console.log(roomId)
    })
    }else{
      console.log("emited spectator..id: " + id)
      socket.emit("joinSpectator", {roomId : id})
    }
  }, [time, playerId]);
  return ( 
    <section className=" w-full h-full  ">
      <ChessBoardLive time={time} name={name} logo={logo} isSpectator={isSpectator} />
    </section>
  );
};




import React, { useEffect, useState } from "react";
import ChessBoardLive from "../components/BoardTools/ChessBoardLive";
import { socket } from "../sockets";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export const Live = () => {
  const location = useLocation();
  const { selectedTime, isSpectator = false, id = -1 } = location.state || {};
  const [gameTime, setGameTime] = useState(null);
  console.log("selectedTime: " + selectedTime + " isSpectator: " + isSpectator)
  const storeTime = useSelector((state) => state.userPrefarence.time);
  const name = useSelector((state) => state.user.username);
  const logo = useSelector((state) => state.userPrefarence.userProfileImg);
  const playerId = useSelector(state => state.user._id);

  useEffect(() => {
    if (selectedTime) {
      setGameTime(parseInt(selectedTime) * 60);
    } else {
      setGameTime(storeTime * 60);
    }
  }, [selectedTime, storeTime]);

  useEffect(() => {
    if (!isSpectator && gameTime !== null) {
      socket.emit("joinRoom", { time: gameTime, playerId });
      socket.on('roomId', (roomId) => {
        console.log(roomId);
      });
    } else if (isSpectator) {
      console.log("emitted spectator..id: " + id);
      socket.emit("joinSpectator", { roomId: id });
    }
  }, [gameTime, playerId, isSpectator, id]);

  return ( 
    <section className="w-full h-full">
      <ChessBoardLive time={gameTime} name={name} logo={logo} isSpectator={isSpectator} />
    </section>
  );
};




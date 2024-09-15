import React from "react";
import { Chessboard } from "react-chessboard";
import MainContainer from "../components/Containers/MainContainer";
import PlayerBar from "../components/BoardTools/PlayerBar";
import unknown from "../assets/unkonwn.jpg";
import { useSelector } from "react-redux";

const Play = () => {
  const userName = useSelector((state) => state.user.username);
  return (
    <section className="flex justify-between  h-screen w-full mx-16 my-5 ">
      <div className="h-5/6 w-1/2">
        <PlayerBar playerLogo={unknown} playerName={"oponent"} />
        <Chessboard />
        <PlayerBar playerLogo={unknown} playerName={userName} />
      </div>
      <MainContainer />
    </section>
  );
};

export default Play;

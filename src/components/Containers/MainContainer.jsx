import React from "react";
import MiniContainer from "./MiniContainer";
import Unkown from "../../assets/unkonwn.jpg";
import newgame from "../../assets/homelogo/newgame.png";
import archive from "../../assets/archive.png";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const username = useSelector((state) => state.userPrefarence.userName);
  return (
    <section className="h-[92vh] w-1/2 bg-black mx-10 my-0 flex flex-col items-center gap-2 rounded-md bg-opacity-80">
      <div className="flex flex-col items-center justify-center w-full h-44 text-white bg-black bg-opacity-20">
        <strong className="text-3xl">Play Chess</strong>
        <img className="h-1/2 w-20" src={newgame} />
      </div>
      <div className="flex flex-col items-center gap-5 h-full w-full overflow-y-auto py-5 hidden-scrollbar">
        <MiniContainer
          img={Unkown}
          title="Play Online"
          description="Play vs a person of similar skill"
        />
        <MiniContainer
          img={Unkown}
          title="Computer"
          description="Challenge a bot from Easy to Master"
        />
        <MiniContainer
          img={Unkown}
          title="Play a Friend"
          description="Invite a friend to a game of chess"
        />
        <MiniContainer
          img={Unkown}
          title="Tournaments"
          description="Join an Arena where anyone can win"
        />
        <MiniContainer
          img={Unkown}
          title="Chess Variants"
          description="Find fun new ways to play chess"
        />
        <div className="flex items-center">
          <img src={archive} className="w-10" />
          <p className="text-white">Archive</p>
        </div>
      </div>
    </section>
  );
};

export default MainContainer;

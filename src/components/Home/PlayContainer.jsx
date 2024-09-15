import React from "react";
import MiniContainer from "./MiniContainer";
import play from "../../assets/homelogo/play.png";
import newGame from "../../assets/homelogo/newgame.png";
import computer from "../../assets/homelogo/computer.png";
import friend from "../../assets/homelogo/playwithfriend.png";
import BoardHeader from "./BoardHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PlayContainer = () => {
  const userName = useSelector((state) => state.user.username);
  const preferdTime = useSelector((state) => state.userPrefarence.time);
  return (
    <section id="playContainer" className="h-1/2 w-64 p-4 rounded-lg">
      <div className="flex flex-col justify-evenly gap-1 h-full">
        <BoardHeader title={"Play"} img={computer}>
          <h2 className="text-2xl font-bold mb-4">95</h2>
        </BoardHeader>
        <Link to={`/${userName}/play/game/live`}>
          <MiniContainer img={play} title={`Play ${preferdTime} min`} />
        </Link>
        <Link to={`/${userName}/play/game`}>
          <MiniContainer img={newGame} title={"New Game"} />
        </Link>
        <Link to={`/${userName}/play/game/vscomputer`}>
          <MiniContainer img={computer} title={"vs Computer"} />
        </Link>
        <Link to={`/${userName}/social`}>
          <MiniContainer img={friend} title={"Play a Friend"} />
        </Link>
      </div>
    </section>
  );
};

export default PlayContainer;

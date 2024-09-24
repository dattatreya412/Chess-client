import React from "react";

import TopNavBar from "../components/Home/TopNavBar";
import PlayContainer from "../components/Home/PlayContainer";
import BoardDescription from "../components/Home/BoardDescription";
import board from "../assets/homelogo/board.png";
import computer from "../assets/homelogo/computer.png";
import BoardHeader from "../components/Home/BoardHeader";
import puzzles from "../assets/homelogo/puzzles.png";
import Notes from "../components/Home/Notes";
import LiveStream from "../components/Home/LiveStream";
import { useSelector } from "react-redux";
 
const Home = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <section
      id="home"
      className="h-screen  mx-auto my-5 overflow-y-scroll hidden-scrollbar "
    >
      <TopNavBar />
      <div className="flex lg:flex-row lg:justify-between w-full h-8/12 my-10 flex-col">
        <PlayContainer />

        <BoardDescription title={"Solve Puzzle"} img={board}
        link={`${username}/puzzles/rated-puzzles`}>
          <BoardHeader title={"Puzzles"} img={puzzles}>
            <h2 className="text-2xl font-bold mb-3">1506</h2>
          </BoardHeader>
        </BoardDescription>

        <BoardDescription
          title={"PlayBot"}
          img={board}
          link={`${username}/play/game/vscomputer`}
        >
          <BoardHeader title={"vs Computer"} img={computer}>
            <p className="text-sm">Challenge a bot from Easy to Master.</p>
          </BoardHeader>
        </BoardDescription>

        <BoardDescription title={"Review"} img={board}
        link="/game-analysis">
          <BoardHeader title={"Game Review"} img={computer}>
            <p className="text-sm">Learn from your Mistakes.</p>
          </BoardHeader>
        </BoardDescription>
      </div>
      <LiveStream ytLink={"holded"} />
      <Notes />
    </section>
  );
};

export default Home;

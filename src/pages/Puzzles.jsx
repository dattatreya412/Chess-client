import React from "react";
import { Chessboard } from "react-chessboard";
import PuzzleNavigator from "../components/puzzles/PuzzleNavigator";

const Puzzles = () => {
  return (
    <section className="flex justify-between h-screen w-full  my-5 ">
      <div className="m-0 flex items-center w-2/3">
        <Chessboard id="chessboard" />
      </div>
      <PuzzleNavigator />
    </section>
  );
};

export default Puzzles;

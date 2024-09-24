import React from "react";
import { Chessboard } from "react-chessboard";
import PuzzleNavigator from "../components/puzzles/PuzzleNavigator";

const Puzzles = () => {
  return (
    <section className="flex justify-between h-screen w-full">
      <div className="flex items-center justify-center w-2/3 p-4">
        <div className="w-full max-w-[600px]">
          <Chessboard id="chessboard" />
        </div>
      </div>
      <PuzzleNavigator />
    </section>
  );
};

export default Puzzles;

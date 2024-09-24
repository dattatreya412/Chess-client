import React, { useEffect, useState } from "react";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";

const CustomPuzzles = () => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const dispatch = useDispatch();

  // Get puzzles data from the Redux store
  const puzzles = useSelector((state) => state.user.puzzles);

  // Fetch rated puzzles when component mounts
  useEffect(() => {
    if (!puzzles || puzzles.length === 0) {
      dispatch(fetchRatedPuzzles());
    }
  }, [dispatch, puzzles]);

  // Update current puzzle when puzzles data or index changes
  useEffect(() => {
    if (puzzles && puzzles.puzzles && puzzles.puzzles[0]?.puzzles) {
      const allPuzzles = puzzles.puzzles[0].puzzles;
      if (puzzleIndex < allPuzzles.length) {
        setCurrentPuzzle(allPuzzles[puzzleIndex]);
      }
    }
  }, [puzzles, puzzleIndex]);

  function next(status) {
    console.log(`Puzzle ${puzzleIndex + 1} completed with status: ${status}`);
    setPuzzleIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (puzzles && puzzles.puzzles && puzzles.puzzles[0]?.puzzles) {
        const allPuzzles = puzzles.puzzles[0].puzzles;
        if (nextIndex >= allPuzzles.length) {
          console.log("All puzzles completed!");
          return prevIndex; // Stay on the last puzzle
        }
      }
      return nextIndex;
    });
  }

  if (!puzzles || puzzles.length === 0) {
    return <div>Loading puzzles...</div>;
  }

  if (!currentPuzzle) {
    return <div>No more puzzles available.</div>;
  }

  return (
    <div className="w-96">
      <PuzzleBoardSolver
        rating={currentPuzzle.rating}
        fen={currentPuzzle.gameboardPosition}
        correctMoves={currentPuzzle.correctMoves}
        next={next}
      />
      <div>Puzzle {puzzleIndex + 1} of {puzzles.puzzles[0]?.puzzles.length || 0}</div>
    </div>
  );
};

export default CustomPuzzles;

















































































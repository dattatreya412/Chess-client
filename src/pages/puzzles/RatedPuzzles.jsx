import React, { useEffect, useState } from "react";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import PuzzleMeter from "../../components/puzzles/PuzzleMeter";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";
import notifySound from "../../assets/audio/notify.mp3"
const RatedPuzzles = () => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState(null);
  const [puzzleRating, setPuzzleRating] = useState(1500);
  const [puzzleMeter, setPuzzleMeter] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentTurn, setCurrentTurn] = useState("");
  const dispatch = useDispatch();

  // Get puzzles data from the Redux store
  const puzzles = useSelector((state) => state.user.puzzles);

  // Fetch puzzles when component mounts
  useEffect(() => {
    if (puzzles.length === 0) {
      dispatch(fetchRatedPuzzles());
    }
  }, [dispatch, puzzles.length]);

  useEffect(() => {
    if (puzzles.puzzles && puzzles.puzzles[0]?.puzzles) {
      const currentPuzzle = puzzles.puzzles[0].puzzles[puzzleIndex];
      setPuzzle(currentPuzzle);
      setCurrentTurn(currentPuzzle.turn === "white" ? "White to play" : "Black to play");
    }
  }, [puzzles, puzzleIndex]);

  function playNotifySound() {
    return new Promise((resolve) => {
      const audio = new Audio(notifySound);
      audio.play();
      audio.onended = resolve;
    });
  }

  function updateRating(status, rating) {
    setPuzzleRating((prevRating) => {
      let change = Math.round(rating * 0.01);
      let newRating = status === 'correct' ? prevRating + change : Math.max(0, prevRating - change);
      console.log(`${status} - Old rating: ${prevRating}, New rating: ${newRating}`);
      return newRating;
    });
  }

  async function next(status, rating) {
    await playNotifySound();
    setPuzzleMeter(prevMeter => [...prevMeter, status]);
    updateRating(status, rating);
    setPuzzleIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      console.log(`Moving to puzzle index: ${nextIndex}`);
      return nextIndex;
    });
    setShowInstructions(false);
  }

  return (
    <div className="flex justify-center items-start gap-8 p-8 bg-gray-100 min-h-screen">
      {showInstructions ? (
        <div className="w-2/3 max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Chess Puzzle Instructions</h2>
          <ul className="list-disc pl-5">
            <li>Solve the puzzle by making the correct moves</li>
            <li>Your rating will increase for correct solutions</li>
            <li>Incorrect moves will decrease your rating</li>
            <li>Try to solve as many puzzles as you can to improve your skills</li>
          </ul>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowInstructions(false)}
          >
            Start Solving Puzzles
          </button>
        </div>
      ) : (
        <>
          <div className="w-1/2 max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Chess Puzzle</h2>
            {puzzle && (
              <>
                <div className="text-lg font-semibold mb-2">{currentTurn}</div>
                <PuzzleBoardSolver
                  rating={puzzle.rating}
                  fen={puzzle.gameboardPosition}
                  correctMoves={puzzle.correctMoves}
                  next={next}
                  turn={puzzle.turn}
                />
              </>
            )}
          </div>
          <div className="w-1/3 max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Puzzle Stats</h2>
              <div className="text-lg font-semibold mb-2">Current Puzzle Rating: {puzzleRating}</div>
              <PuzzleMeter puzzleMeter={puzzleMeter} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RatedPuzzles;

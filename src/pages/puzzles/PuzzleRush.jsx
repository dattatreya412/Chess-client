import React, { useEffect, useState } from "react";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";
import  PuzzleMeter  from "../../components/puzzles/PuzzleMeter";

const PuzzleRush = () => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState(null);
  const [wrongMoves, setWrongMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [puzzleMeter, setPuzzleMeter] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentTurn, setCurrentTurn] = useState("");
  const dispatch = useDispatch();

  // Get puzzles data from the Redux store
  const puzzles = useSelector((state) => state.user.puzzles);

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

  function next(status) {
    setPuzzleMeter(prevMeter => [...prevMeter, status]);
    if (status === 'wrong') {
      setPuzzleIndex(prev => prev + 1)
      setWrongMoves(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setGameOver(true);
        }
        return newCount;
      });
    } else {
      setPuzzleIndex(prev => prev + 1);
    }
    setShowInstructions(false);
  }

  if (gameOver) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl">You solved {puzzleIndex - wrongMoves} puzzles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start gap-8 p-8 bg-gray-100 min-h-screen">
      {showInstructions ? (
        <div className="w-2/3 max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Puzzle Rush Instructions</h2>
          <ul className="list-disc pl-5">
            <li>Solve as many puzzles as you can</li>
            <li>You have 3 lives (wrong moves)</li>
            <li>The game ends when you lose all lives</li>
            <li>Try to solve puzzles quickly and accurately</li>
          </ul>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowInstructions(false)}
          >
            Start Puzzle Rush
          </button>
        </div>
      ) : (
        <>
          <div className="w-1/2 max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Puzzle Rush</h2>
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
              <div className="text-lg font-semibold mb-2">Puzzles Solved: {puzzleIndex}</div>
              <div className="text-lg font-semibold mb-2">Lives Remaining: {3 - wrongMoves}</div>
              <PuzzleMeter puzzleMeter={puzzleMeter} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PuzzleRush;

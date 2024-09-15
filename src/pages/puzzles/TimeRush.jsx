import React, { useEffect, useState } from "react";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";
import PuzzleTimer from "../../components/puzzles/PuzzleTimer";

const TimeRush = () => {
  const [countPuzzles, setCountPuzzles] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);
  const dispatch = useDispatch();
  const [boardEnabled, setBoardEnabled] = useState(false)
  //lets say
  const [puzzleRating, setPuzzleRating] = useState(1500)
  const puzzles = useSelector((state) => state.user.puzzles);
  const [start, setStart] = useState(false)
  const [displayScore, setDisplayScore] = useState(false)
  

  useEffect(() => {
    if (puzzles.length === 0) {
      dispatch(fetchRatedPuzzles());
    }
  }, [dispatch]);



  function handleTimer(){
    setCountPuzzles(0)
    setBoardEnabled(true)
    setDisplayScore(false)
    if(puzzles.puzzles){
      setBoardEnabled(true)
      setStart(true)
      console.log(puzzles.puzzles)
      next('init', '0') 
    }
  }
  const timeout = ()=>{
    setBoardEnabled(false)
    setStart(false)
    setDisplayScore(true)
    console.log(countPuzzles)
  }

  function next(status, rating){
    let index = countPuzzles + 1
    setCountPuzzles(index)
    if (puzzles.puzzles) {
      console.log("index :"  + index)
      if(countPuzzles > puzzles.puzzles[0].puzzles.length - 1) return 
      console.log("index :"  + index)
      setPuzzle(puzzles.puzzles[0].puzzles[index]);
  }
}
console.log(boardEnabled + " " + puzzles)
  return (
    <div className="w-96">
      {(boardEnabled && puzzle) && (
        <PuzzleBoardSolver
          rating={puzzle.rating}
          fen={puzzle.gameboardPosition}
          correctMoves={puzzle.correctMoves}
          setCountPuzzles={setCountPuzzles}
          next = {next}
        />
      )}
      {!boardEnabled && <button onClick={handleTimer} className="bg-green-500 px-2 py-1">Start</button>}
      {start && <PuzzleTimer timeout = {timeout} />}
      {displayScore && <p>{countPuzzles}</p>}
    </div>
  );
};


export default TimeRush 
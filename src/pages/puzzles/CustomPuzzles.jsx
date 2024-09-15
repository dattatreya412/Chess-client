import React, { useEffect, useState } from "react";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";

const RatedPuzzles = () => {
  const [countPuzzles, setCountPuzzles] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);
  const dispatch = useDispatch();

  // Get puzzles data from the Redux store
  const puzzles = useSelector((state) => state.user.puzzles);
  // console.log(puzzles)

  // Fetch puzzles when component mounts
  useEffect(() => {
    if (puzzles.length === 0) {
      dispatch(fetchRatedPuzzles());
    }
  }, [dispatch]);




  function next(status, rating){
    console.log("in next")
    setCountPuzzles(pre => pre + 1)
    console.log("index :"  + countPuzzles)
    if (puzzles.puzzles) {
      if(countPuzzles > puzzles.puzzles[0].puzzles.length - 1) return 
      // console.log(puzzles.puzzles[0].puzzles)
      setPuzzle(puzzles.puzzles[0].puzzles[countPuzzles]);
    // let rating = puzzles.puzzles[0].puzzles[countPuzzles].rating
  }
    // setPuzzle(puzzles.puzzles[0])
  } 
  useEffect(()=>{
    next('init',0)
    setCountPuzzles(-1)
  },[])
  
  useEffect(()=>{
    next('init')
  },[puzzles])
    console.log(puzzle)
  return (
    <div className="w-96">
      {/* Render the puzzle solver only if a puzzle is available */}
      {puzzle && (
        <PuzzleBoardSolver
          rating={puzzle.rating}
          fen={puzzle.gameboardPosition}
          correctMoves={puzzle.correctMoves}
          setCountPuzzles={setCountPuzzles}
          next = {next}
        />
      )}
    </div>
  );
};

export default RatedPuzzles;



























































































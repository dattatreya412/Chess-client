import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatedPuzzles } from "../../store/userSlice";

const RatedPuzzles = () => {
  const [countPuzzles, setCountPuzzles] = useState(-1);
  const [puzzle, setPuzzle] = useState(null);
  const dispatch = useDispatch();
  //lets say
  const [puzzleRating, setPuzzleRating] = useState(1500)

  // Get puzzles data from the Redux store
  const puzzles = useSelector((state) => state.user.puzzles);
  // console.log(puzzles)

  // Fetch puzzles when component mounts
  useEffect(() => {
    if (puzzles.length === 0) {
      dispatch(fetchRatedPuzzles());
    }
  }, [dispatch]);

  // Update the current puzzle whenever countPuzzles changes or puzzles change
  // useEffect(()=>{
  //   console.log("in useEffect")
  //   if (puzzles.puzzles) {
  //     setPuzzle(puzzles.puzzles[0].puzzles);
  //   }
  // },[puzzles])

  function updateRating(status, rating){
    console.log(rating)
    if(status === 'correct'){
      setPuzzleRating((prevRating)=>{
        let currentRating = Math.round(rating * 0.01 + prevRating)
        console.log(currentRating)
        return currentRating
      })
    }else if(status === 'wrong'){
      console.log('wrong trigered')
      setPuzzleRating((prevRating)=>{
        let currentRating = Math.round(prevRating - rating * 0.01)
        console.log(currentRating)
        if(currentRating < 0) return 0
        return currentRating
      })
    }
  }

  function next(status, rating){
    setCountPuzzles(pre => pre + 1)
    console.log("index :"  + countPuzzles)
    if (puzzles.puzzles) {
      updateRating(status, rating)
      if(countPuzzles > puzzles.puzzles[0].puzzles.length - 1) return 
      // console.log(puzzles.puzzles[0].puzzles)
      setPuzzle(puzzles.puzzles[0].puzzles[countPuzzles]);
    // let rating = puzzles.puzzles[0].puzzles[countPuzzles].rating
  }
    // setPuzzle(puzzles.puzzles[0])
  }
  
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






























































































// import React, { useEffect, useState } from "react";
// import { Chess } from "chess.js";
// import PuzzleBoardSolver from "../../components/puzzles/puzzleBoardSolver";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchRatedPuzzles } from "../../store/userSlice";

// const RatedPuzzles = () => {
//   const [countPuzzles, setCountPuzzles] = useState(-1);
//   const [puzzle, setPuzzle] = useState(null);
//   const dispatch = useDispatch();

//   // Get puzzles data from the Redux store
//   const puzzles = useSelector((state) => state.user.puzzles);
//   // console.log(puzzles)

//   // Fetch puzzles when component mounts
//   useEffect(() => {
//     if (puzzles.length === 0) {
//       dispatch(fetchRatedPuzzles());
//     }
//   }, [dispatch]);

//   // Update the current puzzle whenever countPuzzles changes or puzzles change
//   // useEffect(()=>{
//   //   console.log("in useEffect")
//   //   if (puzzles.puzzles) {
//   //     setPuzzle(puzzles.puzzles[0].puzzles);
//   //   }
//   // },[puzzles])

//   function next(){
//     setCountPuzzles(pre => pre + 1)
//     console.log("index :"  + countPuzzles)
//     if (puzzles.puzzles) {
//       // console.log(puzzles.puzzles[0].puzzles)
//       setPuzzle(puzzles.puzzles[0].puzzles[countPuzzles]);
//     }
//    function updatePuzzleRating(status){
     
//    }
//     // setPuzzle(puzzles.puzzles[0])
//   }
  
//   useEffect(()=>{
//     next()
//   },[puzzles])
//     console.log(puzzle)
//   return (
//     <div className="w-96">
//       {/* Render the puzzle solver only if a puzzle is available */}
//       {puzzle && (
//         <PuzzleBoardSolver
//           rating={puzzle.rating}
//           fen={puzzle.gameboardPosition}
//           correctMoves={puzzle.correctMoves}
//           setCountPuzzles={setCountPuzzles}
//           next = {next}
//         />
//       )}
//     </div>
//   );
// };

// export default RatedPuzzles;

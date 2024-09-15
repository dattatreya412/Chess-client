import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { handleMove } from "../../BoardToolBox/handlePuzzle";

const PuzzleBoardSolver = ({ rating, fen, correctMoves, setCountPuzzles, next }) => {
  const [game,setGame] = useState(null);
  const [validMoves,setValidMoves] = useState(correctMoves);
  const [boardFen, setBoardFen] = useState(fen);
  const [presentMoveCount, setPresentMoveCount] = useState(0);
  const [turn] = useState(game && game.turn() === "b" ? "black" : "white") 
  useEffect(() => {
    const chessGame = new Chess(fen);
    setGame(chessGame);
    setBoardFen(fen)
    setValidMoves(correctMoves)
    setPresentMoveCount(0)
    // console.log(JSON.stringify(correctMoves))
    console.log("trigerd")
  }, [next]);

// console.log("render" + boardFen)
  return (
    <div>
      <h1>{rating}</h1>
      <Chessboard
        position={boardFen}
        boardOrientation={turn}
        onPieceDrop={(sourceSquare, targetSquare)=>{
          if (game) {
            handleMove(
              game,
              { from: sourceSquare, to: targetSquare, promotion: "q" },
              validMoves,
              setBoardFen,
              setPresentMoveCount,
              presentMoveCount,
              next,
              rating
            );
        } 
        }}
      />
    </div>
  );
};

export default PuzzleBoardSolver

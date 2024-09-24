import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { handleMove } from "../../BoardToolBox/handlePuzzle";

const PuzzleBoardSolver = ({ rating, fen, correctMoves, next, turn }) => {
  const [game, setGame] = useState(null);
  const [validMoves, setValidMoves] = useState(correctMoves);
  const [boardFen, setBoardFen] = useState(fen);
  const [presentMoveCount, setPresentMoveCount] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);

  useEffect(() => {
    const chessGame = new Chess(fen);
    setGame(chessGame);
    setBoardFen(fen);
    setValidMoves(correctMoves);
    setPresentMoveCount(0);
    setSelectedSquare(null);
    console.log("triggered");
  }, [next]);

  const handleSquareClick = (square) => {
    if (selectedSquare === null) {
      setSelectedSquare(square);
    } else {
      if (game) {
        handleMove(
          game,
          { from: selectedSquare, to: square, promotion: "q" },
          validMoves,
          setBoardFen,
          setPresentMoveCount,
          presentMoveCount,
          next,
          rating
        );
      }
      setSelectedSquare(null);
    }
  };

  return (
    <div>
      <h1>{rating}</h1>
      <Chessboard
        position={boardFen}
        boardOrientation={turn}
        onPieceDrop={(sourceSquare, targetSquare) => {
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
        onSquareClick={handleSquareClick}
        customSquareStyles={{
          [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        }}
      />
    </div>
  );
};

export default PuzzleBoardSolver;

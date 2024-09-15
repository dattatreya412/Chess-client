import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { handleMove } from "../BoardToolBox/handlePuzzle"; // Adjust the import path as needed

const ChessBoardComponent = () => {
  const [game, setGame] = useState(null);
  const [boardFen, setBoardFen] = useState(null);
  const [status, setStatus] = useState(true);
  const [validMoves, setValidMoves] = useState([]);
  const [presentMoveCount, setPresentMoveCount] = useState(0);
  const [turn, setTurn] = useState("w");

  useEffect(() => {
    const fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1";
    const chessGame = new Chess(fen);
    setGame(chessGame);
    setBoardFen(fen);
    setTurn("b");
    const movesArray = [
      // { from: 'a2', to: 'a4' },
      { from: "a7", to: "a5" },
      // { from: 'h2', to: 'h4' },
    ];
    setValidMoves(movesArray);
  }, []);

  return (
    <div>
      <Chessboard
        position={boardFen}
        boardOrientation={turn === "b" ? "black" : "white"}
        onPieceDrop={(sourceSquare, targetSquare) => {
          if (game) {
            handleMove(
              game,
              { from: sourceSquare, to: targetSquare, promotion: "q" },
              validMoves,
              setBoardFen,
              setPresentMoveCount,
              setStatus,
              presentMoveCount
            );
          }
        }}
      />
      {!status && <p>Invalid move. Try again!</p>}
    </div>
  );
};

export default ChessBoardComponent;

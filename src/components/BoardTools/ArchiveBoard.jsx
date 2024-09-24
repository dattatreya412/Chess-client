import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const ArchiveBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const location = useLocation();
  const moves = location.state?.moves || [];

  useEffect(() => {
    setGame(new Chess());
    setCurrentMoveIndex(-1);
  }, [moves]);

  const moveForward = () => {
    if (currentMoveIndex < moves.length - 1) {
      const nextMove = moves[currentMoveIndex + 1];
      const newGame = new Chess(game.fen());
      newGame.move({
        from: nextMove.from,
        to: nextMove.to,
        promotion: nextMove.promotion,
      });
      setGame(newGame);
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const moveBackward = () => {
    if (currentMoveIndex >= 0) {
      const newGame = new Chess();
      for (let i = 0; i <= currentMoveIndex - 1; i++) {
        newGame.move({
          from: moves[i].from,
          to: moves[i].to,
          promotion: moves[i].promotion,
        });
      }
      setGame(newGame);
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '400px', height: '400px' }}>
        <Chessboard position={game.fen()} />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={moveBackward}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          disabled={currentMoveIndex < 0}
        >
          <FaChevronLeft className="mr-2" /> Back
        </button>
        <button
          onClick={moveForward}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          disabled={currentMoveIndex >= moves.length - 1}
        >
          Forward <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ArchiveBoard;

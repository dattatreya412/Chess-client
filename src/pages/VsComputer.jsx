import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { FaChessKing, FaChessQueen } from 'react-icons/fa';

const VsComputer = ({ difficulty, color }) => {
  const [game, setGame] = useState(new Chess());
  const [engineReady, setEngineReady] = useState(false);
  const engineRef = useRef(null);
  const [boardOrientation, setBoardOrientation] = useState(color);
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    engineRef.current = new Worker('/stockfish.js');
    engineRef.current.onmessage = (event) => {
      console.log(event.data);
      if (event.data === 'uciok') {
        setEngineReady(true);
      }
    };
    engineRef.current.postMessage('uci');
    engineRef.current.postMessage('isready');

    return () => {
      if (engineRef.current) {
        engineRef.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    if (engineReady && color === 'black') {
      makeComputerMove();
    }
  }, [engineReady, color]);

  const findBestMove = (fen) => {
    return new Promise((resolve) => {
      engineRef.current.postMessage(`position fen ${fen}`);
      engineRef.current.postMessage(`go depth ${difficulty}`);
      engineRef.current.onmessage = (event) => {
        const msg = event.data;
        if (msg.startsWith('bestmove')) {
          resolve(msg.split(' ')[1]);
        }
      };
    });
  };

  const makeComputerMove = async () => {
    if (engineReady && !game.isGameOver()) {
      const bestMove = await findBestMove(game.fen());
      game.move(bestMove);
      setGame(new Chess(game.fen()));
      checkGameStatus();
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    try{const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to queen for simplicity
    });

    if (move === null) return false;
    setGame(new Chess(game.fen()));
    
    checkGameStatus();
    
    // Make computer move after player's move
    if (!game.isGameOver()) {
      setTimeout(makeComputerMove, 300);
    }
    
    return true;}
    catch(error){
      console.log(error);
    }
  };

  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus('Checkmate!');
    } else if (game.isDraw()) {
      setGameStatus('Draw!');
    } else if (game.isStalemate()) {
      setGameStatus('Stalemate!');
    } else if (game.isThreefoldRepetition()) {
      setGameStatus('Draw by repetition!');
    } else if (game.isInsufficientMaterial()) {
      setGameStatus('Draw by insufficient material!');
    } else {
      setGameStatus('');
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setGameStatus('');
    if (color === 'black') {
      setTimeout(makeComputerMove, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Playing as:</span>
            {color === 'white' ? (
              <FaChessKing className="text-gray-800" size={24} />
            ) : (
              <FaChessQueen className="text-gray-800" size={24} />
            )}
          </div>
          <div>Difficulty: {difficulty}</div>
        </div>
        <Chessboard 
          position={game.fen()} 
          onPieceDrop={onDrop} 
          boardOrientation={boardOrientation}
        />
        {!engineReady && (
          <p className="mt-4 text-center text-lg font-semibold text-gray-700">
            Engine is loading...
          </p>
        )}
        {gameStatus && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-blue-600">{gameStatus}</p>
            <button 
              onClick={resetGame}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VsComputer;
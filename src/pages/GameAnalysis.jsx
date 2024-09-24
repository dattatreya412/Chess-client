import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const GameAnalysis = () => {
  const [game, setGame] = useState(new Chess());
  const [engineReady, setEngineReady] = useState(false);
  const [moves, setMoves] = useState([]);
  const [suggestedMoves, setSuggestedMoves] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [fenInput, setFenInput] = useState('');
  const [arrows, setArrows] = useState([]);
  const engineRef = useRef(null);
  const [boardOrientation, setBoardOrientation] = useState('white');

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

  const findBestMove = (fen, depth = 10) => {
    return new Promise((resolve) => {
      engineRef.current.postMessage(`position fen ${fen}`);
      engineRef.current.postMessage(`go depth ${depth}`);
      engineRef.current.onmessage = (event) => {
        const msg = event.data;
        if (msg.startsWith('bestmove')) {
          resolve(msg.split(' ')[1]);
        }
      };
    });
  };

  const analyzePosition = async () => {
    if (engineReady && !game.isGameOver()) {
      const suggestedMoves = [];
      const newArrows = [];
      let tempGame = new Chess(game.fen());

      for (let i = 0; i < 3; i++) {
        const bestMove = await findBestMove(tempGame.fen());
        try {
          const move = tempGame.move(bestMove);
          if (move) {
            suggestedMoves.push(move.san);
            newArrows.push([move.from, move.to]);
          }
        } catch (error) {
          console.error('Error in suggested move:', error);
          break;
        }
      }

      setSuggestedMoves(suggestedMoves);
      setArrows(newArrows);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });

      if (move === null) {
        throw new Error('Invalid move');
      }

      const newGame = new Chess(game.fen());
      setGame(newGame);
      setMoves([...moves, move.san]);
      setErrorMessage('');

      // Analyze position after player's move
      setTimeout(analyzePosition, 300);

      return true;
    } catch (error) {
      console.error('Error making move:', error);
      setErrorMessage('Invalid move. Please try again.');
      return false;
    }
  };

  const handleFenSubmit = () => {
    try {
      const newGame = new Chess(fenInput);
      setGame(newGame);
      setMoves([]);
      setSuggestedMoves([]);
      setArrows([]);
      setErrorMessage('');
    } catch (error) {
      console.error('Error setting FEN:', error);
      setErrorMessage('Invalid FEN. Please try again.');
    }
  };

  const toggleBoardOrientation = () => {
    setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white');
  };

  if (!engineReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-black bg-opacity-60">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Engine Loading</h1>
          <p className="text-xl text-white">Please wait while the chess engine initializes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-0">
      <h1 className="text-3xl font-bold mb-6 text-center">Game Analysis</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Chessboard 
            position={game.fen()} 
            onPieceDrop={onDrop} 
            customArrows={arrows}
            boardOrientation={boardOrientation}
          />
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={toggleBoardOrientation}
              className="w-1/4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Flip Board
            </button>
            <div className="w-3/4 flex ml-4">
              <input
                type="text"
                value={fenInput}
                onChange={(e) => setFenInput(e.target.value)}
                placeholder="Enter FEN"
                className="flex-grow p-2 border border-gray-300 rounded-l"
              />
              <button
                onClick={handleFenSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 transition-colors"
              >
                Set Position
              </button>
            </div>
          </div>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Moves Made</h2>
            <ul className="list-disc list-inside">
              {moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Suggested Next 3 Moves</h2>
            <ul className="list-disc list-inside">
              {suggestedMoves.map((move, index) => (
                <li className="inline" key={index}>{move + (index<2 ? ' -> ' : '')}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAnalysis;

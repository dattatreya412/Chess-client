import React, { useState } from 'react';
import { FaChessKing, FaChessQueen } from 'react-icons/fa';
import VsComputer from '../../pages/VsComputer';

const ComputerMenu = () => {
  const [difficulty, setDifficulty] = useState('');
  const [color, setColor] = useState('');
    const [displayBoard, setDisplayBoard] = useState(false)
  const difficulties = [
    { name: 'Easy', depth: 5 },
    { name: 'Medium', depth: 10 },
    { name: 'Hard', depth: 15 },
    { name: 'Insane', depth: 20 },
  ];

  const handleStartGame = () => {
    setDisplayBoard(true)
  };

  return (
    <>
    {
        displayBoard ? <VsComputer difficulty={difficulty} color={color} /> :
        <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-lg max-w-md w-full bg-gray-800 bg-opacity-90">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Play Against Computer</h2>
        
        <div className="mb-6">
          <h3 className="text-xl text-white mb-2 text-center">Select Difficulty:</h3>
          <div className="grid grid-cols-2 gap-4">
            {difficulties.map((level) => (
              <button
                key={level.name}
                className={`p-3 rounded-lg transition-colors duration-300 ${
                  difficulty === level.depth
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setDifficulty(level.depth)}
              >
                {level.name} - Depth {level.depth}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-white mb-2 text-center">Choose Your Color:</h3>
          <div className="flex justify-around">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="color"
                value="white"
                checked={color === 'white'}
                onChange={() => setColor('white')}
                className="hidden"
              />
              <div className={`p-3 rounded-lg flex items-center ${
                color === 'white' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}>
                <FaChessKing className="text-white mr-2" size={24} />
                <span className="text-white">White</span>
              </div>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="color"
                value="black"
                checked={color === 'black'}
                onChange={() => setColor('black')}
                className="hidden"
              />
              <div className={`p-3 rounded-lg flex items-center ${
                color === 'black' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}>
                <FaChessQueen className="text-gray-900 mr-2" size={24} />
                <span className="text-white">Black</span>
              </div>
            </label>
          </div>
        </div>

        <button
          className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-300 ${
            difficulty && color
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          onClick={handleStartGame}
          disabled={!difficulty || !color}
        >
          Start Game
        </button>
      </div>
    </div>
    }
    </>
    
  );
};

export default ComputerMenu;

import React from 'react'

const PuzzleMeter = ({ puzzleMeter }) => {
  const getColor = (status) => {
    if (status === 'correct') return 'bg-green-500';
    if (status === 'wrong') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Puzzle Progress</h3>
      <div className="grid grid-cols-5 gap-2">
        {puzzleMeter.map((status, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${getColor(status)}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PuzzleMeter
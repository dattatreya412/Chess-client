import React from "react";

const PlayerBar = ({
  playerLogo,
  playerName,
  displayTimer = false,
  timer = "",
  className = "",
}) => {
  return (
    <div className={`flex justify-between items-center h-14 w-full bg-gray-800 bg-opacity-80 rounded-lg shadow-md px-4 text-white ${className}`}>
      <div className="flex items-center space-x-3">
        <img className="h-10 w-10 rounded-full object-cover" src={playerLogo} alt={`${playerName}'s logo`} />
        <p className="font-semibold text-lg">{playerName}</p>
      </div>
      {displayTimer && (
        <div className="bg-gray-700 px-3 py-1 rounded-md">
          <p className="font-mono text-lg">{timer}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerBar;

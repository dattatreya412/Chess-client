import React from "react";

const PlayerBar = ({
  playerLogo,
  playerName,
  displayTimer = false,
  timer = "",
}) => {
  return (
    <div className="flex flex-row justify-between items-center h-10 w-full bg-black bg-opacity-50 rounded-sm my-1 pr-4 text-white">
      <div className="flex items-center h-full">
        <img className="h-10 px-4 py-2" src={playerLogo} />
        <p>{playerName}</p>
      </div>
      <div>
        <p>{timer}</p>
      </div>
    </div>
  );
};

export default PlayerBar;

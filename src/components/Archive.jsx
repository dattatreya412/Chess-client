import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Archive = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleGameClick = (game) => {
    navigate(`/archive/${game._id}`, { state: { moves: game.moves } });
  };
  if (!user) {
    const state = location.state;
    if (state && state.user) {
      user = state.user;
    }
  }
  return (
    <div className="profile-games overflow-y-auto max-h-96">
      <h2 className="text-2xl font-semibold mb-2">Played Games</h2>
      <ul className="space-y-2">
        {user.playedGames.map((game) => (
          <li key={game._id}>
            <button 
              className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleGameClick(game)}
            >
              {game.whitePlayerId} vs {game.blackPlayerId} 
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Archive;

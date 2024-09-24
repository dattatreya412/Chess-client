import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChessKing, FaChessQueen, FaEye } from 'react-icons/fa'

const MatchDetails = ({ game }) => {
  const [whitePlayerName, setWhitePlayerName] = useState("");
  const [blackPlayerName, setBlackPlayerName] = useState("");
  const navigate = useNavigate();
  const username = useSelector(state => state.user.username)

  useEffect(() => {
    async function fetchPlayerNames() {
      const [whiteData, blackData] = await Promise.all([
        axios.get(`http://localhost:4000/user/getusername/${game.whitePlayerId}`),
        axios.get(`http://localhost:4000/user/getusername/${game.blackPlayerId}`)
      ]);
      setWhitePlayerName(whiteData.data.username);
      setBlackPlayerName(blackData.data.username);
    }

    fetchPlayerNames();
  }, [game.whitePlayerId, game.blackPlayerId]);

  const joinSpectator = () => {
    navigate(`/${username}/play/game/live`, { state: { isSpectator: true, id: game.spectatorId } });
  };

  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4 mb-4 transition-all duration-300 hover:bg-gray-700'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <FaChessKing className='text-white mr-2' />
          <p className='text-white font-semibold'>{whitePlayerName}</p>
        </div>
        <p className='text-gray-400'>VS</p>
        <div className='flex items-center'>
          <p className='text-white font-semibold'>{blackPlayerName}</p>
          <FaChessQueen className='text-black ml-2' />
        </div>
      </div>
      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center"
        onClick={joinSpectator}
      >
        <FaEye className="mr-2" />
        Spectate Game
      </button>
    </div>
  );
}

export default MatchDetails;

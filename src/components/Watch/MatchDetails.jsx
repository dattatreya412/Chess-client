import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  // For navigation
import { useSelector } from 'react-redux'

const MatchDetails = ({ game }) => {
  const [whitePlayerName, setWhitePlayerName] = useState("");
  const [blackPlayerName, setBlackPlayerName] = useState("");
  const navigate = useNavigate();  // React Router hook for navigations
  const username = useSelector(state => state.user.username)

  useEffect(() => {
    async function getWhitePlayerName() {
      const { data } = await axios.get(`http://localhost:4000/user/getusername/${game.whitePlayerId}`);
      setWhitePlayerName(data.username);
    }

    async function getBlackPlayerName() {
      const { data } = await axios.get(`http://localhost:4000/user/getusername/${game.blackPlayerId}`);
      setBlackPlayerName(data.username);
    }

    getWhitePlayerName();
    getBlackPlayerName();
  }, [game.whitePlayerId, game.blackPlayerId]);


  const joinSpectator = () => {
    navigate(`/${username}/play/game/live`, { state: { isSpectator: true, id : game.spectatorId } });
  };

  return (
    <li className='flex flex-row items-center justify-between bg-black bg-opacity-50 text-white h-7 w-64'>
      <p className='px-1 w-20'>{whitePlayerName}</p>
      <p className='flex justify-center w-fit'>VS</p>
      <p className='px-1 w-20 text-right'>{blackPlayerName}</p> 
      <button 
        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
        onClick={joinSpectator}
      >
        Join as Spectator
      </button>
    </li>
  );
}

export default MatchDetails;

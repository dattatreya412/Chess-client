import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { useSelector } from 'react-redux'
import PlayerBar from '../components/BoardTools/PlayerBar'
import unknown from "../assets/unkonwn.jpg";
import { useNavigate } from 'react-router-dom'

const NewGame = () => {
  const player = useSelector(state => state.user.username)
  const [selectedTime, setSelectedTime] = useState(null)
  const navigate = useNavigate()
  const timeControls = [
    { name: 'Bullet', time: '1 min' },
    { name: 'Blitz', time: '3 min' },
    { name: 'Rapid', time: '10 min' },
    { name: 'Classical', time: '30 min' }
  ]

  const handleTimeSelection = (time) => {
    setSelectedTime(time)
  }

  const handleJoinGame = () => {
    if (selectedTime) {
      navigate(`/${player}/play/game/live`, { state: { selectedTime } })
    }
  }

  return (
    <section className="flex justify-between h-screen w-full p-8">
      <div className="w-1/2 flex flex-col justify-between">
        <PlayerBar playerLogo={unknown} playerName="opponent" />
        <Chessboard />
        <PlayerBar playerLogo={unknown} playerName={player} />
      </div>
      <div className="w-1/2 ml-8 flex flex-col items-center gap-4 h-full overflow-y-auto py-4 hidden-scrollbar bg-gray-900 bg-opacity-95 rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center w-full h-36 text-white bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg shadow-md">
          <strong className="text-3xl font-bold mb-1">Select Time Control</strong>
          <p className="text-base text-gray-300">Choose your game pace</p>
        </div>
        <div className="flex flex-col items-center gap-3 w-full px-6">
          {timeControls.map((control, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center w-full h-20 
                ${selectedTime === control.time ? 'bg-blue-600 border-2 border-white' : 'bg-gray-800'} 
                text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-md`}
              onClick={() => handleTimeSelection(control.time)}
            >
              <span className="text-xl font-bold">{control.name}</span>
              <span className="text-sm text-gray-300">{control.time}</span>
            </button>
          ))}
          <button 
            className="flex items-center justify-center w-full h-14 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 mt-4 text-lg font-bold shadow-lg"
            onClick={handleJoinGame}
          >
            Join Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewGame
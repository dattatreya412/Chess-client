
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaGamepad } from 'react-icons/fa'

import { fetchLiveGames } from '../store/userSlice'
import MatchDetails from '../components/Watch/MatchDetails'

const Watch = () => {
  const liveGames = useSelector(state => state.user.liveGames)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLiveGames())
  }, [dispatch])

  return (
    <section className="w-full h-full overflow-y-auto hidden-scrollbar bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <FaGamepad className="mr-4 text-blue-500" />
        Watch Live Games
      </h1>
      {liveGames && liveGames.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-xl text-gray-400">No live games available at the moment.</p>
          <p className="mt-2 text-gray-500">Check back later for exciting matches!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveGames.map((game, index) => (
            <MatchDetails key={index} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Watch
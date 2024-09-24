import React from 'react'
import { Link } from 'react-router-dom'
import MiniContainer from '../Containers/MiniContainer'
import Unknown from '../../assets/unkonwn.jpg'
import newgame from '../../assets/homelogo/newgame.png'
import archive from '../../assets/archive.png'
import { useSelector } from 'react-redux'

const PuzzleNavigator = () => {
  const username = useSelector(state => state.user.username)
  const baseRoute = `/${username}/puzzles`

  return (
    <section className='h-[92vh] w-2/5 bg-gray-900 mx-5 my-0 flex flex-col items-center gap-4 rounded-lg shadow-lg'>
      <div className='flex flex-col items-center justify-center w-full h-48 text-white bg-gradient-to-b from-gray-800 to-gray-700 rounded-t-lg shadow-md'>
        <h1 className='text-4xl font-bold mb-4 text-center tracking-wide'>Chess Puzzles</h1>
        <img className='h-28 w-auto transition-transform duration-300 hover:scale-110' src={newgame} alt="Chess Puzzles" /> 
      </div>
      <div className='flex flex-col items-center gap-6 h-full w-full overflow-y-auto py-6 px-6 hidden-scrollbar'>
        <MiniContainer 
          img={Unknown}
          title="Puzzles"
          description="Train with more than 500,000 puzzles"
          navigate={`${baseRoute}/rated-puzzles`}
        />
        <MiniContainer 
          img={Unknown}
          title="Puzzle Rush"
          description="Race against the clock, 3 strikes and you're out"
          navigate={`${baseRoute}/puzzle-rush`}
        />
        <MiniContainer 
          img={Unknown}
          title="Puzzle Battle"
          description="Rush against another player to win"
          navigate={`${baseRoute}/puzzle-battle`}
        />
        <MiniContainer 
          img={Unknown}
          title="Daily Puzzle"
          description="Can you solve today's puzzle?"
          navigate={`${baseRoute}/daily-puzzle`}
        />
        <MiniContainer 
          img={Unknown}
          title="Custom Puzzles"
          description="Create and solve custom puzzles"
          navigate={`${baseRoute}/custom-puzzles`}
        />
        <MiniContainer 
          img={Unknown}
          title="Time Rush"
          description="Solve Puzzles under a minute."
          navigate={`${baseRoute}/time-rush`}
        />
        <Link to={`${baseRoute}/stats`} className='flex items-center bg-gray-800 rounded-full py-2 px-6 transition-colors duration-300 hover:bg-gray-700 w-full justify-center'>
          <img src={archive} className='w-6 h-6 mr-3' alt="Stats" />
          <p className='text-white font-semibold text-lg'>Stats</p>
        </Link>
      </div> 
    </section>
  )
}

export default PuzzleNavigator

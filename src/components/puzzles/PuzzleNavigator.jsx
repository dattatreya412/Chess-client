import React from 'react'
import MiniContainer from '../Containers/MiniContainer'
import Unkown from '../../assets/unkonwn.jpg'
import newgame from '../../assets/homelogo/newgame.png'
import archive from '../../assets/archive.png'
import { useSelector } from 'react-redux'

const PuzzleNavigator = () => {
  const username = useSelector(state=>state.user.username)
  const defaultRoute = `/${username}/puzzles/`
  console.log(username)
  return (
    <section className='h-[92vh] w-1/2 bg-black mx-10 my-0 flex flex-col items-center gap-2 rounded-md bg-opacity-80'>
      <div className='flex flex-col items-center justify-center w-full h-44 text-white bg-black bg-opacity-20'>
        <strong className='text-3xl'>Chess Puzzles</strong>
        <img className='h-1/2 w-20' src={newgame}  /> 
      </div>
      <div className='flex flex-col items-center gap-5 h-full w-full overflow-y-auto py-5 hidden-scrollbar'>
        <MiniContainer 
          img={Unkown}
          title="Puzzles"
          description="Train with more than 500,000 puzzles"
          navigate={defaultRoute+"rated-puzzles"}
        />
        <MiniContainer 
          img={Unkown}
          title="Puzzle Rush"
          description="Race against the clock, 3 strikes and you're out"
          navigate={defaultRoute + "puzzle-rush"}
        />
        <MiniContainer 
          img={Unkown}
          title="Puzzle Battle"
          description="Rush against another player to win"
          navigate={defaultRoute + "puzzle-battle"}
        />
        <MiniContainer 
          img={Unkown}
          title="Daily Puzzle"
          description="can you solve today's puzzle?"
          navigate={defaultRoute + "daily-puzzle"}
        />
        <MiniContainer 
          img={Unkown}
          title="Time Rush"
          description="Solve Puzzles under a minute."
          navigate={`/${username}/puzzles/custom-puzzles`}
        />
        <MiniContainer 
          img={Unkown}
          title="Time Rush"
          description="Solve Puzzles under a minute."
          navigate={defaultRoute + "time-rush"}
        />
        <div className='flex items-center'>
        <img src={archive} className='w-10' />
        <p className='text-white'>Stats</p>
      </div>
      </div> 
    </section>
  )
}

export default PuzzleNavigator

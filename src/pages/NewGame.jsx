import React from 'react'
import {Chessboard} from 'react-chessboard'
import MainContainer from '../components/Containers/MainContainer'
import PlayerBar from '../components/BoardTools/PlayerBar'
import unknown from '../assets/unkonwn.jpg'

const NewGame = () => {
  return (
    <section className='flex justify-between  h-screen w-full mx-16 my-5 '>
      Game Component
      {/* <div className='h-5/12 w-5/12'>
      <PlayerBar playerLogo={unknown} playerName={"oponent"}/>
       <Chessboard />
       <PlayerBar playerLogo={unknown} playerName={"dattatreya_412"} />
      </div>
       <MainContainer /> */}
    </section>
  )
}

export default NewGame
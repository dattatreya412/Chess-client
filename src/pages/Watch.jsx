
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {fetchLiveGames} from '../store/userSlice'
import MatchDetails from '../components/Watch/MatchDetails'

const Watch = () => {
  const liveGames = useSelector(state => state.user.liveGames)
  const dispatch  = useDispatch()

  useEffect(()=>{
    dispatch(fetchLiveGames())
  },[dispatch]) 
  return (
    <section>
      <h1>Watch</h1>
      {
        liveGames && 
        liveGames.length === 0 ?
        <p>no running games right now.</p> :
        liveGames.map((game, index)=>{
          return <MatchDetails key={index} game={game} />
        })
      }
    </section>
  )
}

export default Watch
import React from 'react'
import { useSelector } from 'react-redux'
const SearchResuts = () => {
    const usernames = useSelector(state=>state.user.userNames)
  return (
    <ul className='max-w-max w-fit p-2 absolute bg-black bg-opacity-60 ml-12 mt-12 rounded-sm'>
        {
            usernames.map((data,index)=>{
                return <li key={index} className='flex flex-row items-center justify-center h-fit w-fit gap-2'>
                    <p>{data.username}</p>
                    <p className= {`w-2 h-2 rounded-full ${data.isLive ? 'bg-green-500' :'bg-red-600' }`}></p>
                </li>
            })
        }
    </ul>
  )
}

export default SearchResuts
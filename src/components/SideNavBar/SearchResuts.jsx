import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SearchResults = () => {
    const navigate = useNavigate()
    const usernames = useSelector(state => state.user.userNames)

    function handleProfile(username) {
        navigate(`/other-profile/${username}`, { state: { username } })
    }

    return (
        <ul className='max-w-xs w-full ml-10 absolute bg-gray-800 bg-opacity-95 mt-2 rounded-md shadow-lg overflow-hidden'>
            {usernames.map((data, index) => (
                <li key={index} onClick={() => handleProfile(data.username)} className='flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors duration-150 ease-in-out cursor-pointer'>
                    <p className='text-white text-sm font-medium truncate'>{data.username}</p>
                    <span className={`w-3 h-3 rounded-full ${data.isLive ? 'bg-green-500' : 'bg-red-500'} ml-2`}></span>
                </li>
            ))}
        </ul>
    )
}

export default SearchResults
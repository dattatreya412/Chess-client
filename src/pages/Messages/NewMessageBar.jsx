import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { BiMessageAltAdd } from 'react-icons/bi';

const NewMessageBar = ({setDisplayMessagesList}) => {
  return (
    <button onClick={() => setDisplayMessagesList(false)} className='flex mt-1 justify-between items-center h-12 w-full bg-gray-800 px-6 py-2 rounded-lg shadow-md'>
        <div className='flex flex-row gap-2 items-center'>
            <BiMessageAltAdd size={24} color='white'/>
            <p className='text-white text-lg font-semibold'>New Message</p>
        </div>
        <div>
            <FiSearch size={24} color='white'/>
        </div>
    </button>
  )
}

export default NewMessageBar
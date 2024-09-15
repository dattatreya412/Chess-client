import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { BiMessageAltAdd } from 'react-icons/bi';

const NewMessageBar = () => {
  return (
    <section className='flex justify-between items-center h-7 w-64 bg-black bg-opacity-30 px-4'>
        <div className='flex flex-row gap-1 items-center'>
            <BiMessageAltAdd size={20} color='white'/>
            <p className='text-white'>New Message</p>
        </div>
        <div>
            <FiSearch size={20} color='white'/>
        </div>
    </section>
  )
}

export default NewMessageBar
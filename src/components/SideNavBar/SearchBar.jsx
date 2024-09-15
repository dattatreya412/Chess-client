import React from 'react'
import SearchResuts from './SearchResuts'
import {findUserNames} from '../../store/userSlice'
import {useDispatch} from 'react-redux'

const SearchBar = () => {
    const dispatch = useDispatch()
    function handleSearch(event){
        const searchText = event.target.value
        console.log("searchText : " + searchText)
        dispatch(findUserNames(searchText))
    }
  return (
    <div className='bg-yellow-700 relative'>
        <div className='absolute'>
            <input
                type="text"
                placeholder="Search"
                className="w-28 rounded-sm border border-gray-300 p-1 outline-none text-black"
                onChange={handleSearch}
            />
        </div>
        
          <SearchResuts/>
    </div>
  )
}

export default SearchBar
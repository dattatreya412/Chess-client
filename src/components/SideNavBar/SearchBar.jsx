import React from 'react'
import SearchResuts from './SearchResuts'
import { findUserNames } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
    const dispatch = useDispatch()
    function handleSearch(event) {
        const searchText = event.target.value
        console.log("searchText : " + searchText)
        dispatch(findUserNames(searchText))
    }
    return (
        <div className='relative w-full max-w-xs mx-auto'>
            <div className='relative'>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white shadow-sm"
                    onChange={handleSearch}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <SearchResuts />
        </div>
    )
}

export default SearchBar
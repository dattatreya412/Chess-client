import React from 'react'

const NotesList = ({notes, handleDeleteNote}) => {
  return (
    <ul className="max-h-fit space-y-4">
          {notes &&
            [...notes].reverse().map((element, index) => (
              <li
                key={index}
                className="h-fit min-h-16 bg-black bg-opacity-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-between items-center p-5">
                  <p className="text-sm md:text-base break-words">{element}</p>
                  <button 
                  onClick={()=>handleDeleteNote(notes.length - 1 - index)}
                  className="bg-red-600 rounded-full p-2 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
        </ul>
  )
}

export default NotesList
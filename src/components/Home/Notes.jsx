import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, fetchNotes } from "../../store/userSlice";

const Notes = () => {
  const [note, setNote] = useState("");
  const [noteArrays, setNotesArray] = useState([])
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.value);
  const color = theme === "dark" ? "bg-black" : "bg-white";
  // console.log("is note rendering");
  const notesId = useSelector((state) => state.user.playerNotes);
  const notes = useSelector((state) => state.user.notes);
  const status = useSelector((state) => state.user.status);
  // console.log("in notes")
  const handleNote = () => {
    if (note.trim()) {
      dispatch(addNote({ notesId, note }));
      setNote("");
    }
  };

  function onKeyDown(event){
    if(event.key === 'Enter'){
      handleNote()
    }
  }

  useEffect(() => {
    if (notesId) {
      dispatch(fetchNotes(notesId));
    }
  }, [dispatch]);

  return (
    <div className={`text-white bg-opacity-50 p-5 w-full my-16 ${color}`}>
      <h1 className="text-xl">Notes</h1>
      <hr />
      <div className="flex justify-between m-5">
        <input
          type="text"
          value={note}
          className="bg-black bg-opacity-50 w-11/12 border-none outline-none"
          placeholder="Write a note..."
          onKeyDown={onKeyDown}
          onChange={(event) => setNote(event.target.value)}
        />
        <button
          onClick={handleNote}
          disabled={note.trim().length === 0}
          className="bg-green-600 rounded-md p-1 m-1 px-2"
        >
          Post
        </button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <ul className="max-h-fit">
          {notes &&
            [...notes].reverse().map((element, index) => (
              <li
                key={index}
                className="h-fit min-h-16 bg-black bg-opacity-50 my-5"
              >
                <p className="p-5">{element}</p>
              </li>
            ))}
        </ul>
      )}
      {status === "failed" && <p>Error loading notes</p>}
    </div>
  );
};

export default Notes;

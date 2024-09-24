import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, fetchNotes, deleteNote } from "../../store/userSlice";
import NotesList from "./NotesList";

const Notes = () => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value);
  const color = theme === "dark" ? "bg-black" : "bg-white";
  const notesId = useSelector((state) => state.user.playerNotes);
  const notes = useSelector((state) => state.user.notes);
  const status = useSelector((state) => state.user.status);
  const handleNote = () => {
    if (note.trim()) {
      dispatch(addNote({ notesId, note })).then(() => {
        dispatch(fetchNotes(notesId));
      });
      setNote("");
    }
  };
  function handleDeleteNote(index){
    dispatch(deleteNote({ notesId, notesIndex: index })).then(() => {
      dispatch(fetchNotes(notesId));
    });
  }
    function onKeyDown(event){
    if(event.key === 'Enter'){
      handleNote()
    }
  }

  useEffect(() => {
    if (notesId) {
      dispatch(fetchNotes(notesId));
    }
  }, [dispatch, notesId]);
 
  return (
    <div className={`text-white bg-opacity-50 p-5 w-full my-16 ${color}`}>
      <h1 className="text-xl">Notes</h1>
      <hr />
      <div className="flex justify-between m-5">
        <input
          type="text"
          value={note}
          className="bg-black bg-opacity-50 w-11/12 border-none outline-none p-2 rounded-md transition-all duration-300 text-white placeholder-gray-400"
          placeholder="Write a note..."
          onKeyDown={onKeyDown}
          onChange={(event) => setNote(event.target.value)}
        />
        <button
          onClick={handleNote}
          disabled={note.trim().length === 0}
          className="bg-green-600 rounded-md p-1 m-1 px-2 hover:bg-green-700 transition-colors duration-300"
        >
          Post
        </button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <NotesList notes={notes} handleDeleteNote={handleDeleteNote} />
      )}
      {status === "failed" && <p>Error loading notes</p>}
    </div>
  );
};

export default Notes;

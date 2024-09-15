import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendReport } from "../../store/userSlice";

const ReportBugs = () => {
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  async function submitReport(event) {
    event.preventDefault(); 
    if (message.trim()) {
      dispatch(sendReport({ message, userId }));
      setMessage(""); 
    }
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      submitReport(event);
    }
  }

  return (
    <section>
      <h1>Report a bug here..!</h1>
      <form onSubmit={submitReport}>
        {" "}
        {/* Add onSubmit to the form */}
        <input
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          onKeyDown={onKeyDown}
          className="outline-none"
        />
        <button type="submit" className="bg-red-600 px-2 py-1 rounded-sm m-2">
          {" "}
          {/* Add type="submit" */}
          Report
        </button>
      </form>
    </section>
  );
};

export default ReportBugs;

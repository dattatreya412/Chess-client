import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendReport } from "../../store/userSlice";

const ReportBugs = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  async function submitReport(event) {
    event.preventDefault();
    if (message.trim()) {
      dispatch(sendReport({ message, userId }));
      setMessage("");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }

  function onKeyDown(event) {
    if (event.key === "Enter" && event.ctrlKey) {
      submitReport(event);
    }
  }

  return (
    <section className="relative max-w-2xl mx-auto mt-8 p-6 bg-black bg-opacity-80 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Report a Bug</h1>
      <form onSubmit={submitReport} className="space-y-4">
        <div>
          <label htmlFor="bugReport" className="block text-sm font-medium text-gray-200 mb-2">
            Describe the bug you encountered:
          </label>
          <textarea
            id="bugReport"
            rows="4"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            onKeyDown={onKeyDown}
            className="w-full px-3 py-2 text-white bg-black bg-opacity-20 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Please provide details about the bug..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-100 transition duration-300"
        >
          Submit Report
        </button>
      </form>
      {showPopup && (
        <div className="absolute top-0 left-0 right-0 mt-4 mx-auto w-64 p-4 bg-green-500 bg-opacity-80 text-white text-center rounded-lg shadow-lg">
          Report successfully sent!
        </div>
      )}
      <p className="mt-4 text-sm text-gray-300">
        Your feedback helps us improve the game experience for everyone. Thank you for taking the time to report bugs!
      </p>
    </section>
  );
};

export default ReportBugs;

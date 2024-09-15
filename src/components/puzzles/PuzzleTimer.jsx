import React, { useState, useEffect } from 'react';
import formatSeconds from '../../BoardToolBox/formatSeonds'; // Ensure correct import

const PuzzleTimer = ({ timeout }) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval); // Clear interval
          console.log("timeout called");
          timeout(); // Call timeout function
          return 0; // Optionally set timer to 0
        }
        return prevTimer - 1; // Decrease timer
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount

  }, [timeout]); // Add timeout to dependencies if needed

  return (
    <div>{formatSeconds(timer)}</div> // Use formatSeconds if needed
  );
};

export default PuzzleTimer;

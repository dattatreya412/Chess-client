import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { handleMove } from "../../BoardToolBox/handleLesson";
import { Chess } from "chess.js";
import notifySound from "../../assets/audio/notify.mp3";

const LessonDisplayBoard = () => {
  const location = useLocation();
  const { lesson } = location.state;
  const [info, setInfo] = useState({
    white: null,
    black: null
  });
  const [game, setGame] = useState(null);
  const [validMoves, setValidMoves] = useState(lesson.lessonGuide);
  const [boardFen, setBoardFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [presentMoveCount, setPresentMoveCount] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const chessGame = new Chess(boardFen);
    setGame(chessGame);
    setBoardFen(boardFen);
    setValidMoves(lesson.lessonGuide);
    setPresentMoveCount(0);
    setSelectedSquare(null);
    console.log("triggered");
  }, [lesson]);

  function next(status) {
    console.log("next");
    if (status === "correct") {
      const audio = new Audio(notifySound);
      audio.play();
      setShowPopup(true);
    }
  }

  const handleSquareClick = (square) => {
    if (selectedSquare === null) {
      setSelectedSquare(square);
    } else {
      if (game) {
        handleMove(
          game,
          { from: selectedSquare, to: square, promotion: "q" },
          validMoves,
          setBoardFen,
          setPresentMoveCount,
          presentMoveCount,
          next,
          setInfo
        );
      }
      setSelectedSquare(null);
    }
  };

  return (
    <div>
      <h1 className="bg-black h-fit w-fit text-2xl text-white">{info.white}</h1>
      <h1 className="bg-black h-fit w-fit text-2xl text-white">{info.black}</h1>
      <div className="w-1/2 h-1/2">
        <Chessboard
          position={boardFen}
          boardOrientation={"white"}
          onPieceDrop={(sourceSquare, targetSquare) => {
            if (game) {
              handleMove(
                game,
                { from: sourceSquare, to: targetSquare, promotion: "q" },
                validMoves,
                setBoardFen,
                setPresentMoveCount,
                presentMoveCount,
                next,
                setInfo
              );
            }
          }}
          onSquareClick={handleSquareClick}
          customSquareStyles={{
            [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          }}
        />
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p>You have successfully completed the lesson.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDisplayBoard;

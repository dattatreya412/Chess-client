import React, { useCallback, useEffect, useState } from "react";
import { socket } from "../../sockets";
import { Chessboard } from "react-chessboard";
import PlayerBar from "./PlayerBar";
import DisplayMoves from "./DisplayMoves";
import MessagesInGame from "./MessagesInGame";

import formatSeconds from "../../BoardToolBox/formatSeonds";
import onDrop from "../../BoardToolBox/onDrop";

// audio import 
import notifySound from '../../assets/audio/notify.mp3'
import peaceMoveSound from '../../assets/audio/move-self.mp3'
import peaceCaptureSound from '../../assets/audio/capture.mp3'

const Board = ({ time, name, logo, isSpectator=false }) => {
  const [PlayerRole, setPlayerRole] = useState("w");
  const [isPeaceDragable, setIsPeaeDragable] = useState(false)
  const [isInvalidMove, setIsInvalidMove] = useState(false);
  const [invalidMove, setInvalidMove] = useState();
  const [gamePosition, setGamePosition] = useState("start");
  const [moves, setMoves] = useState([]);
  const [greeting, setGreetings] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [whiteTimer, setWhiteTimer] = useState(time);
  const [blackTimer, setBlackTimer] = useState(time);
  const [intervalIdWhite, setIntervalIdWhite] = useState(null);
  const [intervalIdBlack, setIntervalIdBlack] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const playNotifySound = () => {
    return new Promise((resolve) => {
      const audio = new Audio(notifySound);
      audio.play();
      audio.onended = resolve;
    });
  };
  const playPeaceMoveSound = () => {
    return new Promise((resolve) => {
      const audio = new Audio(peaceMoveSound);
      audio.play();
      audio.onended = resolve;
    });
  };
  const playPeaceCaptureSound = () => {
    return new Promise((resolve) => {
      const audio = new Audio(peaceCaptureSound);
      audio.play();
      audio.onended = resolve;
    });
  };
  useEffect(() => {
    setWhiteTimer(time);
    setBlackTimer(time);
  }, [time]);

  console.log("Time prop:", time);
  console.log("White timer:", whiteTimer);
  console.log("Black timer:", blackTimer);

  const startWhiteTimer = useCallback(() => {
    if (intervalIdWhite) return; 
    const id = setInterval(() => {
      setWhiteTimer((prevSeconds) => {
        if (prevSeconds === 1) {
          socket.emit("timeout", "w");
          clearInterval(id);
        }
        return prevSeconds - 1;
      });
    }, 1000);
    setIntervalIdWhite(id);
  }, [intervalIdWhite]);

  const pauseWhiteTimer = useCallback(() => {
    if (intervalIdWhite) {
      clearInterval(intervalIdWhite);
      setIntervalIdWhite(null);
    }
  }, [intervalIdWhite]);

  const startBlackTimer = useCallback(() => {
    if (intervalIdBlack) return;
    const id = setInterval(() => {
      setBlackTimer((prevSeconds) => {
        if (prevSeconds === 1) {
          socket.emit("timeout", "b");
          clearInterval(id);
        }
        return prevSeconds - 1;
      });
    }, 1000);
    setIntervalIdBlack(id);
  }, [intervalIdBlack]);

  const pauseBlackTimer = useCallback(() => {
    if (intervalIdBlack) {
      clearInterval(intervalIdBlack);
      setIntervalIdBlack(null);
    }
  }, [intervalIdBlack]);

  useEffect(() => {
    socket.on("startGame", async (roomid) => {
      console.log("Game started")
      console.log(roomid)
      await playNotifySound();
      setIsGameStarted(true);
      setIsPeaeDragable(true && !isSpectator)
      setTimeout(() => {
        setIsGameStarted(false);
        startWhiteTimer();
      }, 2000);
    });

    return () => {
      socket.off("startGame");
    };
  }, [startWhiteTimer]);

  useEffect(() => {
    socket.on("gameOver", async (winner) => {
      await playNotifySound();
      setIsPeaeDragable(false)
      pauseWhiteTimer();
      pauseBlackTimer();
      socket.emit('gameCompleted')
      if (PlayerRole === winner) {
        setGreetings("You Won The Game.");
      } else {
        const opponent = PlayerRole === "w" ? "black" : "white";
        setGreetings(`${opponent} won the game.`);
      }
    });
    socket.on("timeoutPlayer", async (looser) => {
      await playNotifySound();
      let winner = looser === "w" ? "black" : "white";
      setGreetings(`${winner} won the game in time.`);
    });

    socket.on("playerRole", (type) => {
      setPlayerRole(type);
    });

    socket.on("move", async (move) => {
      setMoves((prevMoves) => [...prevMoves, move]);
      if (move.captured) {
        await playPeaceCaptureSound();
        console.log("Captured piece:", move.captured);
      } else {
        await playPeaceMoveSound();
        console.log("Move piece:", move.san);
      }
    });

    socket.on("boardState", (boardState) => {
      setGamePosition(boardState);
    });

    socket.on("invalidMove", async (move) => {
      await playNotifySound();
      setIsInvalidMove(true);
      setInvalidMove(move);
      setTimeout(() => {
        setIsInvalidMove(false);
      }, 3000);
    });

    return () => {
      socket.off("gameOver");
      socket.off("playerRole");
      socket.off("move");
      socket.off("boardState");
      socket.off("invalidMove");
    };
  }, [PlayerRole, pauseWhiteTimer, pauseBlackTimer]);

  useEffect(() => {
    socket.on("switchTimerInClient", (currentPlayer) => {
      if (currentPlayer === "w") {
        startWhiteTimer();
        pauseBlackTimer();
      } else {
        startBlackTimer();
        pauseWhiteTimer();
      }
    });

    return () => {
      socket.off("switchTimerInClient");
    };
  }, [
    PlayerRole,
    pauseBlackTimer,
    pauseWhiteTimer,
    startBlackTimer,
    startWhiteTimer,
  ]);

  const handleSquareClick = (square) => {
    if (selectedSquare === null) {
      setSelectedSquare(square);
    } else {
      onDrop(selectedSquare, square);
      setSelectedSquare(null);
    }
  };

  return (
    <div
      id="chessBoard"
      className="flex flex-col justify-evenly lg:flex-row h-[83vh] w-full "
    >
      <div id="board" className="sm:w-10/12 w-full h-fit shadow-lg rounded-lg p-4">
        {greeting && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">
              {greeting}
            </h1>
          </div>
        )}

        {isInvalidMove && (
          <div className="absolute top-4 right-4 z-50">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg animate-slide-in-right">
              <p className="font-bold">Invalid Move</p>
              <p>The move to {invalidMove.to} is not allowed.</p>
            </div>
          </div>
        )}
        {isGameStarted && (
          <div className="absolute top-4 right-4 z-50">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-lg animate-slide-in-right">
              <p className="font-bold">Game Started!</p>
              <p>Good luck and have fun!</p>
            </div>
          </div>
        )}
        {!isSpectator && <PlayerBar
          playerName={"opponent"}
          playerLogo={logo}
          displayTimer="true"
          timer={formatSeconds(PlayerRole === "b" ? whiteTimer : blackTimer)}
        />}
        <div className="my-2">
          <Chessboard
            boardOrientation={PlayerRole === "w" ? "white" : "black"}
            arePiecesDraggable={isPeaceDragable}
            allowDragOutsideBoard={false}
            onPieceDrop={onDrop}
            onSquareClick={handleSquareClick}
            position={gamePosition}
            customSquareStyles={{
              [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            }}
          />
        </div>
        {!isSpectator && <PlayerBar
          playerName={name}
          playerLogo={logo}
          displayTimer="true"
          timer={formatSeconds(PlayerRole === "w" ? whiteTimer : blackTimer)}
        />}
      </div>
      {!isSpectator && <div className="sm:w-10/12 w-full h-full shadow-lg rounded-lg p-4 bg-black bg-opacity-60">
        <DisplayMoves moves={moves} />
        <MessagesInGame />
      </div>}
    </div>
  );
};

export default Board;

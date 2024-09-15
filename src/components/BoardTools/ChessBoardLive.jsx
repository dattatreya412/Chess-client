import React, { useCallback, useEffect, useState } from "react";
import { socket } from "../../sockets";
import { Chessboard } from "react-chessboard";
import PlayerBar from "./PlayerBar";
import DisplayMoves from "./DisplayMoves";
import MessagesInGame from "./MessagesInGame";

import formatSeconds from "../../BoardToolBox/formatSeonds";
import onDrop from "../../BoardToolBox/onDrop";


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
    }, 1000); // Update every 1 second
    setIntervalIdWhite(id);
  }, [intervalIdWhite]);

  const pauseWhiteTimer = useCallback(() => {
    if (intervalIdWhite) {
      clearInterval(intervalIdWhite);
      setIntervalIdWhite(null);
    }
  }, [intervalIdWhite]);

  const startBlackTimer = useCallback(() => {
    if (intervalIdBlack) return; // Prevent starting multiple intervals
    const id = setInterval(() => {
      setBlackTimer((prevSeconds) => {
        if (prevSeconds === 1) {
          socket.emit("timeout", "b");
          clearInterval(id);
        }
        return prevSeconds - 1;
      });
    }, 1000); // Update every 1 second
    setIntervalIdBlack(id);
  }, [intervalIdBlack]);

  const pauseBlackTimer = useCallback(() => {
    if (intervalIdBlack) {
      clearInterval(intervalIdBlack);
      setIntervalIdBlack(null);
    }
  }, [intervalIdBlack]);

  useEffect(() => {
    socket.on("startGame", (roomid) => {
      console.log("Game started")
      console.log(roomid)
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
    socket.on("gameOver", (winner) => {
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
    socket.on("timeoutPlayer", (looser) => {
      let winner = looser === "w" ? "black" : "white";
      setGreetings(`${winner} won the game in time.`);
    });

    socket.on("playerRole", (type) => {
      setPlayerRole(type);
    });

    // socket.on("spectatorRole", () => {
    //   setSpectatorMode(true);
    // });

    socket.on("move", (move) => {
      setMoves((prevMoves) => [...prevMoves, move]);
    });

    socket.on("boardState", (boardState) => {
      setGamePosition(boardState);
    });

    socket.on("invalidMove", (move) => {
      setIsInvalidMove(true);
      setInvalidMove(move);
      setTimeout(() => {
        setIsInvalidMove(false);
      }, 3000);
    });

    return () => {
      socket.off("gameOver");
      socket.off("playerRole");
      // socket.off("spectatorRole");
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
  return (
    <div
      id="chessBoard"
      className="flex flex-col justify-evenly lg:flex-row h-[83vh] w-full"
    >
      <div id="board" className=" w-5/12 h-full">
        <h1>{greeting}</h1>

        {isInvalidMove && (
          <h1 className="h-2/3 flex justify-center items-center w-1/3 text-black text-2xl absolute z-10">
            Invalid Move {invalidMove.to}
          </h1>
        )}
        {isGameStarted && (
          <h1 className="h-2/3 flex justify-center items-center w-1/3 text-black text-2xl absolute z-10">
            Game Started...!
          </h1>
        )}
        {!isSpectator && <PlayerBar
          playerName={"oponent"}
          playerLogo={logo}
          displayTimer="true"
          timer={formatSeconds(PlayerRole === "b" ? whiteTimer : blackTimer)}
        />}
        <Chessboard
          boardOrientation={PlayerRole === "w" ? "white" : "black"}
          arePiecesDraggable={isPeaceDragable}
          allowDragOutsideBoard={false}
          onPieceDrop={onDrop}
          position={gamePosition}
        />
        {!isSpectator &&<PlayerBar
          playerName={name}
          playerLogo={logo}
          displayTimer="true"
          timer={formatSeconds(PlayerRole === "w" ? whiteTimer : blackTimer)}
        />}
      </div>
      {!isSpectator &&<div className="bg-black bg-opacity-60 h-full w-1/3">
        <DisplayMoves moves={moves} />
        <MessagesInGame />
      </div>}
    </div>
  );
};



export default Board;


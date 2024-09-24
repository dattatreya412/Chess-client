import React from "react";
import { Chessboard } from "react-chessboard";
import MainContainer from "../components/Containers/MainContainer";
import PlayerBar from "../components/BoardTools/PlayerBar";
import unknown from "../assets/unkonwn.jpg";
import { useSelector } from "react-redux";
import { applyBoardTheme } from "../BoardToolBox/boardThemeSelector";
import { applyIconTheme } from "../BoardToolBox/iconThemeSelector";

const Play = () => {
  const userName = useSelector((state) => state.user.username);
  const chessboardTheme = useSelector((state) => state.user.boardTheme);
  const chessboardIcon = useSelector((state) => state.user.iconTheme);

  const boardTheme = applyBoardTheme(chessboardTheme);
  const iconTheme = applyIconTheme(chessboardIcon);

  return (
    <section className="flex justify-between  h-screen w-full mx-16 my-5 ">
      <div className="h-5/6 w-1/2">
        <PlayerBar playerLogo={unknown} playerName={"oponent"} />
        <Chessboard 
          customBoardStyle={boardTheme.boardStyle}
          customLightSquareStyle={boardTheme.lightSquareStyle}
          customDarkSquareStyle={boardTheme.darkSquareStyle}
          customBorderStyle={boardTheme.borderStyle}
          customPieces={iconTheme.pieces}
        />
        <PlayerBar playerLogo={unknown} playerName={userName} />
      </div>
      <MainContainer />
    </section>
  );
};

export default Play;

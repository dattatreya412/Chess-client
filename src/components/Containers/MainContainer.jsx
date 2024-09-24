import React from "react";
import MiniContainer from "./MiniContainer";
import Unkown from "../../assets/unkonwn.jpg";
import newgame from "../../assets/homelogo/newgame.png";
import archive from "../../assets/archive.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainContainer = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleArchiveClick = () => {
    navigate(`/${username}/archive`, { state: { user } });
  };

  return (
    <section className="h-[92vh] w-1/2 bg-gray-900 mx-10 my-0 flex flex-col items-center gap-4 rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full h-48 text-white bg-gradient-to-b from-gray-800 to-gray-700 rounded-t-lg shadow-md">
        <strong className="text-4xl font-bold mb-4">Play Chess</strong>
        <img className="h-28 w-auto transition-transform duration-300 hover:scale-110" src={newgame} alt="Play Chess" />
      </div>
      <div className="flex flex-col items-center gap-6 h-full w-full overflow-y-auto py-6 px-6 hidden-scrollbar">
        <MiniContainer
          img={Unkown}
          title="Play Online"
          description="Play vs a person of similar skill"
          navigate={`/${username}/play/game/live`}
        />
        <MiniContainer
          img={Unkown}
          title="Computer"
          description="Challenge a bot from Easy to Master"
          navigate={`/${username}/play/game/vscomputer`}
        />
        <MiniContainer
          img={Unkown}
          title="Play a Friend"
          description="Invite a friend to a game of chess"
          navigate={`/${username}/social`}
        />
        
        <div 
          className="flex items-center bg-gray-800 rounded-full py-2 px-6 transition-colors duration-300 hover:bg-gray-700 w-full justify-center cursor-pointer"
          onClick={handleArchiveClick}
        >
          <img src={archive} className="w-6 h-6 mr-3" alt="Archive" />
          <p className="text-white font-semibold text-lg">Archive</p>
        </div>
      </div>
    </section>
  );
};

export default MainContainer;

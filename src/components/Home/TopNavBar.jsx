import React from "react";
import MiniNavBar from "./MiniNavBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNavBar = () => {
  const userName = useSelector((state) => state.user.username);
  const profileImg = useSelector(
    (state) => state.userPrefarence.userProfileImg
  );
  return (
    <section id="topNavBar" className="flex justify-between items-center h-16 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md px-4 shadow-md">
      <div className="flex items-center gap-4 text-white">
        <Link to={`profile/${userName}`} className="w-10 h-10 bg-gray-400 rounded-full overflow-hidden border-2 border-white">
          <img src={profileImg} alt={userName} className="w-full h-full object-cover" />
        </Link>
        <p className="font-semibold text-xl">{userName}</p>
      </div>
      <MiniNavBar />
    </section>
  );
};

export default TopNavBar;

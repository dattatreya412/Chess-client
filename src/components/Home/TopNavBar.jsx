import React from "react";
import MiniNavBar from "./MiniNavBar";
import { useSelector } from "react-redux";

const TopNavBar = () => {
  const userName = useSelector((state) => state.user.username);
  const profileImg = useSelector(
    (state) => state.userPrefarence.userProfileImg
  );
  return (
    <section id="topNavBar" className="flex justify-between h-16">
      <div className="flex items-center gap-3 text-white font-semibold text-xl">
        <div className="w-7 h-7 bg-gray-400 rounded-sm ">
          <img src={profileImg} alt="" />
        </div>
        <p>{userName}</p>
      </div>
      <MiniNavBar />
    </section>
  );
};

export default TopNavBar;

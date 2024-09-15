import React from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import img1 from "../../assets/mininav/m1.png";
import img2 from "../../assets/mininav/m2.png";
import img3 from "../../assets/mininav/m3.png";
import img4 from "../../assets/mininav/m4.png";

const MiniNavBar = () => {
  const username = useSelector(state => state.user.username)
  return (
    <div className="flex gap-3 items-center">
      <Link to={`${username}/social`}><img className="w-7 h-7" src={img1} /></Link>
      <Link to={`${username}/play/game`}><img className="w-7 h-7" src={img2} /></Link>
      <Link to={`${username}/messages`}><img className="w-7 h-7" src={img3} /></Link>
      <Link to={`${username}/setting`}><img className="w-7 h-7" src={img4} /></Link>
      
    </div>
  );
};

export default MiniNavBar;

import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { FaUsers, FaGamepad, FaEnvelope, FaCog } from 'react-icons/fa';

const MiniNavBar = () => {
  const username = useSelector(state => state.user.username)
  return (
    <div className="flex gap-3 items-center">
      <Link to={`${username}/social`}>
        <FaUsers className="w-7 h-7 transition-transform duration-200 hover:scale-110 text-white" />
      </Link>
      <Link to={`${username}/play/game`}>
        <FaGamepad className="w-7 h-7 transition-transform duration-200 hover:scale-110 text-white" />
      </Link>
      <Link to={`${username}/messages`}>
        <FaEnvelope className="w-7 h-7 transition-transform duration-200 hover:scale-110 text-white" />
      </Link>
      <Link to={`${username}/setting`}>
        <FaCog className="w-7 h-7 transition-transform duration-200 hover:scale-110 text-white" />
      </Link>
    </div>
  );
};

export default MiniNavBar;

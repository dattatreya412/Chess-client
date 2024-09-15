import React from "react";
import { Link } from "react-router-dom";

const MiniContainer = ({ img, title, description, navigate }) => {
  return (
    <Link
      to={navigate}
      className="flex items-center gap-5  bg-black bg-opacity-80 w-2/3 min-h-24 px-10 rounded-md hover:bg-opacity-50"
    >
      <img className="h-10" src={img} />
      <div
        className="text-white text-left
      "
      >
        <strong className="text-lg">{title}</strong>
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default MiniContainer;

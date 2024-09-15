import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const BoardDescription = ({ img, title, children, link = "/" }) => {
  const theme = useSelector((state) => state.theme.value);
  const color = theme === "dark" ? "bg-black" : "bg-white";
  return (
    <Link to={link} className="h-1/2 w-64 text-white p-4 rounded-lg ">
      <div className="mb-2">{children}</div>
      {/* removed color here */}
      <div
        className={
          "h-5/6  bg-opacity-70 rounded-md p-2 hover:bg-opacity-60 " + color
        }
      >
        <img className="w-full h-5/6 " src={img} alt={title} />
        <div className="h-1/6 flex items-center justify-center">
          <strong className="text-center py-1">{title}</strong>
        </div>
      </div>
    </Link>
  );
};

export default BoardDescription;

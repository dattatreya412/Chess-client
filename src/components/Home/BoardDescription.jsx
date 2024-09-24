import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BoardDescription = ({ img, title, children, link = "/" }) => {
  const theme = useSelector((state) => state.theme.value);
  const color = theme === "dark" ? "bg-black" : "bg-white";
  return (
    <Link 
      to={link} 
      className="h-1/2 w-64 text-white p-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-102"
    >
      <div className="mb-2">{children}</div>
      <div
        className={`h-5/6 ${color} bg-opacity-70 rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-opacity-60 hover:shadow-lg`}
      >
        <div className="w-full h-5/6 overflow-hidden p-2 transition-all duration-300 ease-in-out group">
          <img 
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105" 
            src={img} 
            alt={title} 
          />
        </div>
        <div className="h-1/6 flex items-center justify-center">
          <strong className="text-center py-1 transition-colors duration-300 ease-in-out hover:text-yellow-300">{title}</strong>
        </div>
      </div>
    </Link>
  );
};

export default BoardDescription;

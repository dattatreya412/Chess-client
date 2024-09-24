import React from "react";
import { Link } from "react-router-dom";

const MiniContainer = ({ img, title, description, navigate }) => {
  return (
    <Link
      to={navigate}
      className="flex items-center gap-5 bg-gray-800 w-full min-h-24 px-6 py-4 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
    >
      <img className="h-12 w-12 object-cover rounded-full" src={img} alt={title} />
      <div className="flex-1 text-white">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

export default MiniContainer;

import React from "react";
import { Link } from "react-router-dom";

const MiniSideNav = ({
  img,
  title = "",
  children,
  isTiteleDisabled,
  navigate,
}) => {
  return (
    <Link
      to={navigate}
      id="miniSideNav"
      className="flex items-center w-full py-1.5 px-2 my-1 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-800 hover:shadow-sm"
    >
      <div className="w-6 h-6 mr-1.5 flex-shrink-0">
        <img src={img} alt={`${title} icon`} className="w-full h-full object-contain" />
      </div>
      {!isTiteleDisabled && (
        title ? (
          <p className="font-semibold text-white truncate">{title}</p>
        ) : (
          <div className="text-white">{children}</div>
        )
      )}
    </Link>
  );
};

export default MiniSideNav;

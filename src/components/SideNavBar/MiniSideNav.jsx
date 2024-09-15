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
      className="flex gap-2 items-center w-full my-3 hover:bg-black hover:bg-opacity-80"
    >
      <div className="w-7">
        <img src={img} alt={`${title} + logo`} />
      </div>
      {!isTiteleDisabled &&
        (title ? <p className="font-semibold ">{title}</p> : children)}
    </Link>
  );
};

export default MiniSideNav;

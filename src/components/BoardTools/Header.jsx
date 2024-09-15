import React from "react";

const Header = ({ title }) => {
  return (
    <>
      <div className="h-20 bg-black bg-opacity-40 text-white text-2xl flex justify-center items-center w-full">
        <strong>{title}</strong>
      </div>
    </>
  );
};

export default Header;

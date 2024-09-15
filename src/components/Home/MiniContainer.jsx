import React from "react";
import { useSelector } from "react-redux";

const MiniContainer = ({ img, title }) => {
  const theme = useSelector((state) => state.theme.value);
  const color = theme === "dark" ? "bg-black" : "bg-white";
  return (
    <button
      id="miniContainer"
      className={
        "w-full flex items-center gap-4 text-white font-semibold   px-4 py-2  bg-opacity-70 shadow-xl h-fit hover:bg-opacity-50 " +
        color
      }
    >
      <img className="w-9" src={img} />
      <p>{title}</p>
    </button>
  );
};

export default MiniContainer;

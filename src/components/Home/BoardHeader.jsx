import React from "react";

const BoardHeader = ({ img, title, children }) => {
  return (
    <section
      id="boardHeader"
      className="flex gap-4 font-semibold text-white text-lg px-2 transition-all duration-300 ease-in-out hover:shadow-md rounded-lg cursor-pointer"
    >
      <img className="w-14 transition-transform duration-300 ease-in-out hover:scale-110" src={img} alt={title} />
      <div className="transition-all duration-300 ease-in-out hover:translate-x-1">
        <p className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">{title}</p>
        {children}
      </div>
    </section>
  );
};

export default BoardHeader;

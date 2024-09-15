import React from "react";

const BoardHeader = ({ img, title, children }) => {
  return (
    <section
      id="boardHeader"
      className="flex gap-4 font-semibold text-white text-lg px-2"
    >
      <img className="w-14" src={img} />
      <div>
        <p>{title}</p>
        {children}
      </div>
    </section>
  );
};

export default BoardHeader;

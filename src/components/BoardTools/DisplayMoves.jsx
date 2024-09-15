import React from "react";
import Header from "../BoardTools/Header";

const DisplayMoves = ({ moves }) => {
  return (
    <section className="h-1/2 ">
      <Header title="Moves" />
      <ul className="text-white  h-1/2 px-2 py-4 overflow-auto scrollbar-custom">
        {moves.map((move, index) => {
          if (index % 2 === 0) {
            const whiteMove = move;
            const blackMove = moves[index + 1] || "";
            return (
              <li className="flex" key={index / 2 + 1}>
                <p className="w-5">{`${index / 2 + 1}. `}</p>
                <div className="flex gap-5">
                  <p className="w-12 ">{whiteMove}</p>
                  <p className="w-12 ">{blackMove}</p>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </section>
  );
};

export default DisplayMoves;

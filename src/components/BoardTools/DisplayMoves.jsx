import React from "react";
import Header from "../BoardTools/Header";

const DisplayMoves = ({ moves }) => {
  return (
    <section className="h-1/2 bg-gray-800 rounded-lg shadow-lg">
      <Header title="Moves" />
      <ul className="text-white h-1/2 px-4 py-6 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
        {moves.map((move, index) => {
          if (index % 2 === 0) {
            const whiteMove = move;
            const blackMove = moves[index + 1] || "";
            return (
              <li className="flex items-center mb-2 hover:bg-gray-700 rounded-md transition-colors duration-200" key={index / 2 + 1}>
                <p className="w-8 text-gray-400 font-semibold">{`${index / 2 + 1}.`}</p>
                <div className="flex gap-8">
                  <p className="w-16 text-blue-300">{whiteMove}</p>
                  <p className="w-16 text-red-300">{blackMove}</p>
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

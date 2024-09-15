import React from "react";

const NewsContainer = ({ news }) => {
  return (
    <section className="h-60 w-10/12 ">
      <ul className="h-full w-full ">
        {news.map((element, index) => {
          return (
            <li key={index} className="w-full h-full bg-black bg-opacity-80 flex items-center gap-10 my-5 px-10 rounded-md">
              <div className="w-40 h-40 bg-white bg-opacity-10 rounded-sm"></div>
              <div className="w-full h-40 rounded-sm">
                <h1 className="w-full h-14 my-1 bg-white bg-opacity-10 rounded-sm"></h1>
                <p className="w-full h-5 my-2 bg-white bg-opacity-10 rounded-sm"></p>
                <p className="w-full h-14 my-1 bg-white bg-opacity-10 rounded-sm"></p>
              </div>
            </li>
          ); 
        })}
      </ul>
    </section>
  );
};

export default NewsContainer;

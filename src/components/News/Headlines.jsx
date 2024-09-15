import React from "react";

const Headlines = ({ highlights }) => {
  console.log(JSON.stringify(highlights));
  const { img, description } = highlights;
  return (
    <section className="h-2/3 w-10/12">
      <div className="h-5/6 w-full bg-black bg-opacity-30 rounded-sm"></div>
      <p className="h-1/6 w-full bg-black bg-opacity-60 rounded-lg"></p>
    </section>
  );
};

export default Headlines;

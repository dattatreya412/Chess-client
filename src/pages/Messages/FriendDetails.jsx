import React from "react";

const FriendDetails = () => {
  return (
    <section className="flex flex-row justify-between items-center w-full h-12 text-white px-2">
      <div className="flex gap-2 items-center">
        <div className="h-9 w-9 bg-white"></div>
        <div>
          <h2>Name</h2>
          <small>description</small>
        </div>
      </div>
      <div>
        <p>time</p>
      </div>
    </section>
  );
};

export default FriendDetails;

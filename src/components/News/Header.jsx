import React from "react";

const Header = ({logo}) => {
  return (
    <section className="h-14 w-full flex gap-5">
      <div className="w-10 h-10 overflow-hidden">
        <img src={logo} alt="logo" className="w-full h-full object-cover scale-[1.4] hover:scale-[1.6] transition-transform duration-300" />
      </div>
      <h1 className="text-2xl text-white font-semibold">Chess Today</h1>
    </section>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/sidenavIcons/logo.png";
import play from "../../assets/sidenavIcons/play.png";
import pzzles from "../../assets/sidenavIcons/puzzels.png";
import news from "../../assets/sidenavIcons/news.png";
import social from "../../assets/sidenavIcons/social.png";
import premium from "../../assets/sidenavIcons/premium.png";
import learn from "../../assets/sidenavIcons/learn.png";
import MiniSideNav from "./MiniSideNav";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/themeSlice";
import { Link } from "react-router-dom";
import smallLogo from "../../assets/logosmall.png";
import SearchBar from "./SearchBar";

const SideNavBar = () => {
  const userName = useSelector((state) => state.user.username);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1200);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const theme = useSelector((state) => state.theme.value);
  const navBarWidth = isCollapsed ? "w-10" : "w-32";
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1200);
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, []);

  function handleTheme() {
    dispatch(toggle(theme));
  }
  function handleNavWidth() {
    setIsCollapsed((state) => !state);
    setIsSearchOpen(false);
  }
  function toggleSearch() {
    setIsSearchOpen((prev) => !prev);
  }

  return (
    <section
      id="sideNavBar"
      className={`fixed flex flex-col justify-between py-3 px-1 h-screen bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${navBarWidth}`}
    >
      <div className="text-white">
        <div className="mb-4 flex justify-center">
          <Link to={`/`}>
            {!isCollapsed ? <img src={logo} className="w-3/4" /> : <img className="w-6" src={smallLogo} />}
          </Link>
        </div>

        <MiniSideNav
          img={play}
          title="Play"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/play`}
        />

        <MiniSideNav
          img={pzzles}
          title="Puzzles"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/puzzles`}
        />

        <MiniSideNav
          img={learn}
          title="Learn"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/learn`}
        />

        <MiniSideNav
          img={play}
          title="Watch"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/watch`}
        />

        <MiniSideNav
          img={news}
          title="News"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/news`}
        />

        <MiniSideNav
          img={social}
          title="Social"
          isCollapsed={isCollapsed}
          navigate={`/${userName}/social`}
        />

        <MiniSideNav img={premium} isCollapsed={isCollapsed}>
          {!isCollapsed && (
            <p className="font-semibold text-blue-500 text-xs">Free Trial</p>
          )}
        </MiniSideNav>

        {isCollapsed ? (
          <div className="flex justify-center mt-2">
            <button onClick={toggleSearch} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        ) : (
          <SearchBar isCollapsed={false} />
        )}

        {isCollapsed && isSearchOpen && (
          <div ref={searchRef} className="absolute left-full ml-2 mt-2 w-64">
            <SearchBar isCollapsed={false} />
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 text-gray-400 bg-gray-800 p-1 rounded-lg">
        <button onClick={handleTheme} className="flex items-center space-x-2 text-xs hover:bg-gray-700 p-1 rounded">
          {theme === "dark" ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {!isCollapsed && <span>Light UI</span>}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              {!isCollapsed && <span>Dark UI</span>}
            </>
          )}
        </button>

        <button onClick={handleNavWidth} className="flex items-center space-x-2 text-xs hover:bg-gray-700 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          {!isCollapsed && <span>Collapse</span>}
        </button>

        <Link to={`/${userName}/setting`} className="flex items-center space-x-2 text-xs hover:bg-gray-700 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!isCollapsed && <span>Setting</span>}
        </Link>

        <Link to={`/${userName}/help`} className="flex items-center space-x-2 text-xs hover:bg-gray-700 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {!isCollapsed && <span>Help</span>}
        </Link>
      </div>
    </section>
  );
};

export default SideNavBar;

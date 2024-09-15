import React, { useState, useEffect } from "react";
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
  const [isTiteleDisabled, setIsTitleDisabled] = useState(
    window.innerWidth < 1200 ? true : false
  );

  const theme = useSelector((state) => state.theme.value);
  const navBarWidth = isTiteleDisabled ? " w-12" : " w-32";
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsTitleDisabled(window.innerWidth < 1200 ? true : false);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleTheme() {
    dispatch(toggle(theme));
  }
  function handleNavWidth() {
    setIsTitleDisabled((state) => !state);
  }
  return (
    <section
      id="sieNavBar"
      className={
        "check fixed flex flex-col justify-between py-5 px-2 h-screen bg-black bg-opacity-50" +
        navBarWidth
      }
    >
      <div className="text-white ">
        <div className="my-2">
          <Link to={`/`}>
            {!isTiteleDisabled && <img src={logo} />}
            {isTiteleDisabled && <img className="w-6" src={smallLogo} />}
          </Link>
        </div>

        <MiniSideNav
          img={play}
          title={"play"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/play`}
        />

        <MiniSideNav
          img={pzzles}
          title={"Puzzles"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/puzzles`}
        />

        <MiniSideNav
          img={learn}
          title={"Learn"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/learn`}
        />

        <MiniSideNav
          img={play}
          title={"Watch"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/watch`}
        />

        <MiniSideNav
          img={news}
          title={"News"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/news`}
        />

        <MiniSideNav
          img={social}
          title={"Social"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/social`}
        />

        <MiniSideNav img={premium}>
          {!isTiteleDisabled && (
            <p className="font-semibold text-blue-500">Free Trial</p>
          )}
        </MiniSideNav>

        {!isTiteleDisabled && (
          <SearchBar/>
        )}
      </div>
      <div className="flex flex-col text-gray-400">
        <button onClick={handleTheme}>
          <MiniSideNav
            img={play}
            title={theme === "dark" ? "Light Ui" : "Dark Ui"}
            isTiteleDisabled={isTiteleDisabled}
          />
        </button>

        <button onClick={handleNavWidth}>
          <MiniSideNav
            img={play}
            title={!isTiteleDisabled && "Collapse"}
            isTiteleDisabled={isTiteleDisabled}
          />
        </button>

        <MiniSideNav
          img={play}
          title={"Setting"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/setting`}
        />

        <MiniSideNav
          img={play}
          title={"Help"}
          isTiteleDisabled={isTiteleDisabled}
          navigate={`/${userName}/help`}
        />
      </div>
    </section>
  );
};

export default SideNavBar;

import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Play from "./pages/Play";
import Puzzles from "./pages/Puzzles";
import NewGame from "./pages/NewGame";
import { Live } from "./pages/Live";
import VsComputer from "./pages/VsComputer";
import Learn from "./pages/Learn";
import Watch from "./pages/Watch";
import News from "./pages/News";
import Social from "./pages/Social";
import Setting from "./pages/Settings";
import Help from "./pages/Help";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Protected from "./components/Authentication/Protected";

import CustomPuzzles from "./pages/puzzles/CustomPuzzles";
import DailyPuzzle from "./pages/puzzles/DailyPuzzle";
import PuzzleRush from "./pages/puzzles/PuzzleRush";
import RatedPuzzles from "./pages/puzzles/RatedPuzzles";
import TimeRush from "./pages/puzzles/TimeRush";
import PuzzleBattle from "./pages/puzzles/PuzzleBattle";

import UploadFile from "./UploadFile";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path : "upload-news",
        element:<UploadFile/>
      },
      {
        path: ":username/play",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Play />,
          },
          {
            path: "game",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <NewGame />,
              },
              {
                path: "live",
                element: <Live />,
              },
              {
                path: "vscomputer",
                element: <VsComputer />,
              },
            ],
          },
        ],
      },
      {
        path: ":username/puzzles",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Puzzles />,
          },
          {
            path: "custom-puzzles",
            element: <CustomPuzzles />,
          },
          {
            path: "daily-puzzle",
            element: <DailyPuzzle />,
          },
          {
            path: "puzzle-battle",
            element: <PuzzleBattle />,
          },
          {
            path: "puzzle-rush",
            element: <PuzzleRush />,
          },
          {
            path: "rated-puzzles",
            element: <RatedPuzzles />,
          },
          {
            path: "time-rush",
            element: <TimeRush />,
          },
        ],
      },
      {
        path: ":username/learn",
        element: <Learn />,
      },
      {
        path: ":username/news",
        element: <News />,
      },
      {
        path: ":username/watch",
        element: <Watch />,
      },
      {
        path: ":username/social",
        element: <Social />,
      },
      {
        path: ":username/setting",
        element: <Setting />,
      },
      {
        path: ":username/messages",
        element: <Messages />,
      },
      {
        path: ":username/help",
        element: <Help />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

const App = () => {
  const [token, setToken] = useState("");

  // Check for a saved token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return <RouterProvider router={myRouter} />;
};

export default App;

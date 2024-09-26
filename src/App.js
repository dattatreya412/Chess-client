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
import OtherProfile from "./pages/OtherProfile";
import Learn from "./pages/Learn";
import Watch from "./pages/Watch";
import News from "./pages/News";
import Social from "./pages/Social";
import Setting from "./pages/Settings";
import Help from "./pages/Help";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameAnalysis from "./pages/GameAnalysis";
import GeneratePuzzle from "./components/GeneratePuzzle";
import GenerateLesson from "./components/GenerateLesson";
import LessonDisplayBoard from "./components/Learn/LessonDisplayBoard";
import Profile from "./pages/Profile";
import ArchiveBoard from "./components/BoardTools/ArchiveBoard";
import Archive from "./components/Archive";

import Protected from "./components/Authentication/Protected";

import CustomPuzzles from "./pages/puzzles/CustomPuzzles";
import DailyPuzzle from "./pages/puzzles/DailyPuzzle";
import PuzzleRush from "./pages/puzzles/PuzzleRush";
import RatedPuzzles from "./pages/puzzles/RatedPuzzles";
import TimeRush from "./pages/puzzles/TimeRush";
import PuzzleBattle from "./pages/puzzles/PuzzleBattle";
import ComputerMenu from "./components/Computer/ComputerMenu";

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
        path : "profile/:username",
        element:<Profile/>
      },
      { 
        path : "other-profile/:username",
        element:<OtherProfile/>
      },
      {
        path: ":username/archive",
        element: <Archive />,
      },
      {
        path: "archive/:gameId",
        element: <ArchiveBoard />,
      },
      {
        path : "generate-puzzle",
        element:<GeneratePuzzle/>
      },
      {
        path : "generate-lesson",
        element:<GenerateLesson/>
      },
      {
        path : "upload-news",
        element:<UploadFile/>
      },
      {
        path: "game-analysis",
        element: <GameAnalysis />,
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
                element: <ComputerMenu />,
              },
            ],
          },
        ],
      },
      {
        path: ":username/puzzles",
        element: <Protected><Outlet /></Protected>,
        children: [
          {
            index: true,
            element: <Puzzles />,
          },
          {
            path: "rated-puzzles",
            element: <RatedPuzzles />,
          },
          {
            path: "puzzle-rush",
            element: <PuzzleRush />,
          },
          {
            path: "puzzle-battle",
            element: <PuzzleBattle />,
          },
          {
            path: "daily-puzzle",
            element: <DailyPuzzle />,
          },
          {
            path: "custom-puzzles",
            element: <CustomPuzzles />,
          },
          {
            path: "time-rush",
            element: <TimeRush />,
          },
        ],
      },
      {
        path: ":username/learn",
        element: <Protected><Outlet /></Protected>,
        children: [
          {
            index: true,
            element: <Learn />,
          },
          {
            path: ":lessonId",
            element: <LessonDisplayBoard />,
          },
        ],
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

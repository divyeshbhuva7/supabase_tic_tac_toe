import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
// Pages ----------------------------------------------------------------
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import JoinGame from "./components/JoinGame";
import GamePage from "./components/GamePage";
// -----------------------------------------------------------------------

function App() {
  const gameID = useRef();
  const userId = useRef();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/joingame" element={<JoinGame />} />
        <Route path="/game/:gameID" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;

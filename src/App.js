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

  const [tokenExpireTime, setTokenExpireTime] = useState(0);
  const [userName, setUserName] = useState(0);
  const [checkToken, setCheckToken] = useState(false);

  const Time = window.Date.now().toString();
  const currTime = Time.slice(0, 10);

  useEffect(() => {
    const signInCheck = JSON.parse(
      localStorage.getItem("sb-albmlgxrtsvwoaalwxpv-auth-token")
    );
    if (signInCheck !== null) {
      setTokenExpireTime(signInCheck.expires_at);
      // console.log(signInCheck);
      const usrName = signInCheck.user.email.split("@");
      setUserName(usrName[0]);
    }
  }, [window.location]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currTime={currTime}
              tokenExpireTime={tokenExpireTime}
              userName={userName}
            />
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/joingame" element={<JoinGame />} />
        <Route
          path="/game/:gameID"
          element={<GamePage userName={userName} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

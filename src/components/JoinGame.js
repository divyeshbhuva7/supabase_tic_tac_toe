import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import tictactoelogo from "../tictactoelogo.png";
import { Image, Paper, Text } from "@mantine/core";
import supabase from "../supabaseConfig";

function JoinGame({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [gameID, setGameID] = useState("");
  const [gameLink, setGameLink] = useState("");

  useEffect(() => {
    setGameID(uuidv4().slice(0, 8));
  }, []);

  useEffect(() => {
    if (gameID) {
      setGameLink(window.location.href.replace(`joingame`, `game/${gameID}`));
    }
  }, [gameID, location.pathname]);

  // create game --------------------------------------------------------------
  const copyLink = () => {
    if (gameLink) {
      navigator.clipboard.writeText(gameLink);
    }
  };

  const StartGame = () => {
    async function createGameData() {
      if (gameID !== "" && gameID !== undefined && userName) {
        const { data, error } = await supabase.from("game_data").insert({
          val0: "",
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
          val6: "",
          val7: "",
          val8: "",
          winner: null,
          gameid: gameID,
          current_player: "O",
          player1: userName,
        });

        if (data) {
          console.log(data);
        }
        if (error) {
          console.log(error);
        }

        navigate(`/game/${gameID}`);
      } else {
        return;
      }
    }
    createGameData();
  };

  return (
    <div className="gamemode-container page">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>

      <Paper className="signIn-Up-Box gamemode-box glassEffect">
        <div className="gamestart-container">
          <Text className="link">{gameLink}</Text>
          <div className="gamestart-btn">
            <button className="btn sharelink-btn" onClick={copyLink}>
              Copy link
            </button>
            <button className="btn startgame-btn" onClick={StartGame}>
              Create Game
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default JoinGame;

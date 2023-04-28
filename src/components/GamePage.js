import { Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import supabase from "../supabaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Square from "./Square";
import { Patterns } from "./WinPatterns";

export default function GamePage({ userName }) {
  const { width, height } = useViewportSize();
  const navigate = useNavigate();

  const location = useLocation();
  let locationArr = location.pathname.split("/");
  const gameID = locationArr[locationArr.length - 1];

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const [turn, setTurn] = useState("O");
  const [currPlayer, setCurrPlayer] = useState("O");

  const [gameData, setGameData] = useState({});
  const [winner, setWinner] = useState(null);
  const [disabledAfterWin, setDisabledAfterWin] = useState(false);

  //fetch data from supabase table ---------------------------------------------
  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await supabase
        .from("game_data")
        .select()
        .eq("gameid", gameID);

      if (error) {
        console.log(error);
      }
      if (data) {
        setGameData(data[0]);
        // setTurn(data[0].current_player);
        // setCurrPlayer(data[0].current_player);
      }
    };
    fetchGameData();
  }, []);

  //----------------------------------------------------------------------------
  const boxClick = (idx) => {
    if (winner === null && gameData[`val${idx}`] === "") {
      switch (idx) {
        case 0:
          setGameData({ ...gameData, val0: currPlayer });
          break;
        case 1:
          setGameData({ ...gameData, val1: currPlayer });
          break;
        case 2:
          setGameData({ ...gameData, val2: currPlayer });
          break;
        case 3:
          setGameData({ ...gameData, val3: currPlayer });
          break;
        case 4:
          setGameData({ ...gameData, val4: currPlayer });
          break;
        case 5:
          setGameData({ ...gameData, val5: currPlayer });
          break;
        case 6:
          setGameData({ ...gameData, val6: currPlayer });
          break;
        case 7:
          setGameData({ ...gameData, val7: currPlayer });
          break;
        case 8:
          setGameData({ ...gameData, val8: currPlayer });
          break;
        default:
          break;
      }
    }

    if (turn === currPlayer && gameData[`val${idx}`] === "") {
      setTurn(currPlayer === "O" ? "X" : "O");
    }
    currPlayer === "O" ? setCurrPlayer("X") : setCurrPlayer("O");
  };

  useEffect(() => {
    if (winner === null) {
      updateGameData();
    }
  }, [currPlayer, winner]);

  // update in database ----------------------------------------------------------
  async function updateGameData() {
    const { data, error } = await supabase
      .from("game_data")
      .update({
        ...gameData,
        val0: gameData.val0,
        val1: gameData.val1,
        val2: gameData.val2,
        val3: gameData.val3,
        val4: gameData.val4,
        val5: gameData.val5,
        val6: gameData.val6,
        val7: gameData.val7,
        val8: gameData.val8,
        winner: winner,
        current_player: currPlayer,
      })
      .eq("gameid", gameID)
      .select();
  }

  // winning case ----------------------------------------------------------------
  useEffect(() => {
    const checkWin = () => {
      for (let i = 0; i < Patterns.length; i++) {
        const [a, b, c] = Patterns[i];

        if (gameData[`val${a}`] && gameData[`val${b}`] && gameData[`val${c}`]) {
          if (
            gameData[`val${a}`] &&
            gameData[`val${a}`] === gameData[`val${b}`] &&
            gameData[`val${a}`] === gameData[`val${c}`]
          ) {
            setWinner(gameData[`val${a}`]);
          }
        }
      }
    };
    checkWin();
  }, [gameData]);

  useEffect(() => {
    if (winner === "X" || winner === "O") {
      setDisabledAfterWin(true);
    }
  }, [winner]);

  // realtime events -------------------------------------------------------------

  useEffect(() => {
    const receivingChannel = supabase
      .channel(`${gameID}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_data",
          filter: `gameid=eq.${gameID}`,
        },
        (payload) => {
          console.log("received changes...!", payload);
          setTurn(payload.new.current_player);
          setGameData(payload.new);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(receivingChannel);
  }, [supabase]);

  // reset game ----------------------------------------------------------------

  const handleReset = async () => {
    setWinner(null);
    setTurn("O");
    setCurrPlayer("O");
    setDisabledAfterWin(false);
    setGameData({
      ...gameData,
      val0: "",
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      val5: "",
      val6: "",
      val7: "",
      val8: "",
      winner: winner,
      current_player: "O",
    });
    const { data, error } = supabase
      .from("game_data")
      .update({
        ...gameData,
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
        current_player: "O",
      })
      .eq("gameid", gameID)
      .select();
  };

  // signout -------------------------------------------------------------------

  const userSignOut = async () => {
    console.log("user signing out....");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    navigate("/");
  };

  return (
    <div className="Game">
      <nav className="navbar">
        <h2>{userName || "Guest"}</h2>
        <div className="navbar-btns">
          <button className="btn nav-btn" onClick={handleReset}>
            RESTART
          </button>

          <button className="btn nav-btn" onClick={userSignOut}>
            SIGN OUT
          </button>
        </div>
      </nav>

      <div className="Gamepad">
        <div className="gamepage-body">
          <div className="player-turn-text">
            <Text>Current turn : {turn}</Text>
          </div>
          <div className="gameboard">
            <div className="board">
              {board.map((val, idx) => (
                <Square
                  key={idx}
                  disabled={disabledAfterWin}
                  val={gameData[`val${idx}`]}
                  chooseSquare={() => boxClick(idx)}
                />
              ))}
            </div>
            <div className="horizontal-border">
              <div></div>
              <div></div>
            </div>
            <div className="verticle-border">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        {winner === null ? null : (
          <p className="winner-announcement">"{winner}" wins the game...!!</p>
        )}
      </div>
      {winner === null ? null : <Confetti width={width} height={height} />}
    </div>
  );
}

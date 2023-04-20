import { Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import supabase from "../supabaseConfig";
import { useLocation } from "react-router-dom";

function Game() {
  const { width, height } = useViewportSize();
  const Boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const location = useLocation();
  let locationArr = location.pathname.split("/");

  const [currPlayer, setCurrPlayer] = useState("O");
  const [currGamewinner, setCurrGameWinner] = useState(null);

  const gameID = locationArr[locationArr.length - 1];
  const [gameData, setGameData] = useState({});

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
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  // realtime - listen to the channel ------------------------------------------
  useEffect(() => {
    const receivingChannel = supabase
      .channel("test")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_data",
        },
        (payload) => {
          console.log(payload.new);
          setGameData(payload.new);
        }
      )
      .subscribe();
  }, [gameData, currGamewinner]);
  //------------------------------------------------------------------------------------------
  const boxClick = (idx) => {
    if (currGamewinner === null && gameData[`val${idx}`] === null) {
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
    } else {
      return;
    }

    currPlayer === "O" ? setCurrPlayer("X") : setCurrPlayer("O");
  };

  // victory cases -------------------------------------------------
  function victory() {
    const possibleCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibleCases.length; i++) {
      const [a, b, c] = possibleCases[i];

      if (gameData[`val${a}`] && gameData[`val${b}`] && gameData[`val${c}`]) {
        if (
          gameData[`val${a}`] &&
          gameData[`val${a}`] === gameData[`val${b}`] &&
          gameData[`val${a}`] === gameData[`val${c}`]
        ) {
          setCurrGameWinner(gameData[`val${a}`]);
        }
      }
    }
  }

  useEffect(() => {
    if (currGamewinner) {
      updateGameData();
    }
  }, [currGamewinner]);

  useEffect(() => {
    if (gameData.id) {
      updateGameData();
    }
    victory();
  }, [gameData, currGamewinner]);

  async function updateGameData() {
    const { data, error } = await supabase
      .from("game_data")
      .update({
        val0: gameData.val0,
        val1: gameData.val1,
        val2: gameData.val2,
        val3: gameData.val3,
        val4: gameData.val4,
        val5: gameData.val5,
        val6: gameData.val6,
        val7: gameData.val7,
        val8: gameData.val8,
        winner: currGamewinner,
      })
      .eq("id", gameData.id)
      .select();
  }

  const handleReset = () => {
    setCurrGameWinner(null);
    setCurrPlayer("O");
    setGameData({
      ...gameData,
      val0: null,
      val1: null,
      val2: null,
      val3: null,
      val4: null,
      val5: null,
      val6: null,
      val7: null,
      val8: null,
      winner: null,
    });
  };
  const userSignOut = () => {
    // handleReset();
    console.log("user signing out....");
  };

  return (
    <div className="Game">
      <nav className="navbar">
        <h2>Tic-Tac-Toe</h2>
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
        <div>
          <div className="board">
            {Boxes.map((elem, idx) => (
              <button className={`box`} key={idx} onClick={() => boxClick(idx)}>
                <Text c="red">{gameData[`val${idx}`]}</Text>
              </button>
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
        {currGamewinner !== null ? (
          <p className="winner-announcement">
            "{currGamewinner}" wins the game...!!
          </p>
        ) : null}
      </div>
      {currGamewinner !== null ? (
        <Confetti width={width} height={height} />
      ) : null}
    </div>
  );
}

export default Game;

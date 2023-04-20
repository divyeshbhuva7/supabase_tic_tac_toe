import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import tictactoelogo from "../tictactoelogo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>
      <button className="btn play-btn" onClick={() => navigate("/signin")}>
        PLAY
      </button>
    </div>
  );
}

export default Home;

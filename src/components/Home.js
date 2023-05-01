import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import tictactoelogo from "../tictactoelogo.png";
import supabase from "../supabaseConfig";

function Home({ currTime, tokenExpireTime }) {
  const navigate = useNavigate();

  const handlePlay = async () => {
    if (currTime <= tokenExpireTime - 30) {
      navigate("/joingame");
    } else if (currTime >= tokenExpireTime) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
      navigate("signin");
    }
  };

  return (
    <div className="homepage">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>
      <button className="btn play-btn" onClick={handlePlay}>
        PLAY
      </button>
    </div>
  );
}

export default Home;

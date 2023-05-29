import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import tictactoelogo from "../tictactoelogo.png";
import supabase from "../supabaseConfig";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [tokenExpireTime, setTokenExpireTime] = useState(0);
  const [hasTkn, setHasTkn] = useState(false);

  const Time = window.Date.now().toString();
  const currTime = Time.slice(0, 10);

  useEffect(() => {
    const getTkn = JSON.parse(localStorage.getItem("token"));
    if (getTkn !== null) {
      setHasTkn(true);
      // const usrName = localStorage.getItem("username");
      const expireTime = localStorage.getItem("expiry");
      setTokenExpireTime(expireTime);
    }
  }, []);

  const handlePlay = async () => {
    if (currTime <= tokenExpireTime - 30 && hasTkn) {
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

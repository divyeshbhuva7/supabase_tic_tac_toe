import {
  Group,
  Image,
  Input,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import tictactoelogo from "../tictactoelogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseConfig";

export default function SignIn() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [visible, { toggle }] = useDisclosure(false);

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [err, setErr] = useState("");

  const [showErr, setShowErr] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const emailRegex =
      /^\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b$/.test(user.email);

    if (user.email === "") {
      setEmailErr("Please enter email.");
    } else if (emailRegex === false) {
      setEmailErr("Please enter a valid email");
    } else {
      setEmailErr("");
    }

    if (user.password === "" || user.password.length < 8) {
      setPasswordErr("Please enter password.");
      return;
    } else {
      setPasswordErr("");
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) {
        console.log(error.message);
        if (error.message === "Invalid login credentials") {
          setShowErr(true);
          setErr("Invalid email or password");
        }
      }
      if (data) {
        // console.log(data);
        if (data.session.access_token) {
          setUserId(data.user.id.slice(0, 8));
        } else {
          return;
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (userId !== "" && userId !== undefined) {
      navigate(`/${userId}/gamemode`);
    } else {
      return;
    }
  }, [userId]);

  return (
    <div className="page signInPage">
      <div>
        <Image className="home-bgImg" src={tictactoelogo} />
      </div>

      <Paper className="signIn-Up-Box glassEffect">
        <Text className="Headings signIn-heading" mb="sm">
          Sign IN
        </Text>

        <div>
          <TextInput
            label="Email"
            title="Email"
            placeholder="Your email"
            className="login-input"
            styles={() => ({
              label: {
                color: theme.colors.gray[2],
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[8],
                },
                backgroundColor: theme.colors.blue[1],
              },
            })}
            required
            mb="xs"
            error={emailErr}
            onFocus={() => setEmailErr("")}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <PasswordInput
            label="Password"
            className="login-input"
            withAsterisk
            placeholder="Your password"
            styles={(theme) => ({
              label: {
                color: theme.colors.gray[2],
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[8],
                },
                backgroundColor: theme.colors.blue[1],
              },
            })}
            error={passwordErr}
            onFocus={() => setPasswordErr("")}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>

        {showErr === true ? <Input.Error mt="xs">{err}</Input.Error> : null}

        <Group position="center" mt="md">
          <button className="btn signIn-Up-btn" onClick={loginUser}>
            SIGN IN
          </button>
        </Group>

        <Text className="signUp-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span> here
        </Text>
      </Paper>
    </div>
  );
}

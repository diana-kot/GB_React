import { useState } from "react";
import { Link } from "react-router-dom";
import { login, signUp } from "../../services/firebase";
import "./style.scss";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const Home = ({ isSignUp }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, pass);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await login(email, pass);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }

    setEmail("");
    setPass("");
  };

  return (
    <>
      <div className="home">
        <Box
          sx={{
            width: 400,
            padding: 5,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 1,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: 16,
            }}
          >
            <Typography variant="h4" gutterBottom component="div">
              {isSignUp ? "SignUp" : "Login"}
            </Typography>

            <Link to={`${isSignUp ? "/" : "/signup"}`}>
              {!isSignUp ? "SignUp" : "Login"}
            </Link>

            <form className="home__form" onSubmit={handleSubmit}>
              <TextField
                className="child__text-field"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                onChange={handleChangeEmail}
              />
              <TextField
                className="child__text-field"
                variant="outlined"
                label="Password"
                value={pass}
                type="password"
                onChange={handleChangePass}
              />
              <Button variant="outlined" type="submit">
                LOGIN
              </Button>
              {error && <span>{error}</span>}
            </form>
          </Box>
        </Box>
      </div>
    </>
  );
};

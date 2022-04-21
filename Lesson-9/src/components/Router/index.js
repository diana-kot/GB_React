import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

import { Chat } from "../Chat";
import { Home } from "../Home/Home";
import { ChatList } from "../ChatList/ChatList";
import Articles from "../Articles/Articles";
import Profile from "../Profile/Profile";

import { REPO_NAME } from "../../utils/repo";

import "../Router/style.scss";

import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { PublicRoute } from "../PublicRoute/PublicRoute";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

export const Router = () => {
  const [authed, setAuthed] = useState(false);

  const unauthorize = () => {
    setAuthed(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <BrowserRouter basename={`/${REPO_NAME}/`}> 
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <div className="container">
              <Toolbar>
                <div>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "white",
                    })}
                  >
                    <MenuItem>Home</MenuItem>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="/articles"
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "white",
                    })}
                  >
                    <MenuItem>News</MenuItem>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="/profile"
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "white",
                    })}
                  >
                    <MenuItem>Profile</MenuItem>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="/chats"
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "white",
                    })}
                  >
                    <MenuItem>Chats</MenuItem>
                  </NavLink>
                </div>
              </Toolbar>
            </div>
          </AppBar>
        </Box>

        <Routes>
          <Route path="/" element={<PublicRoute authed={authed} />}>
            <Route path="" element={<Home />} />
            <Route path="/signup" element={<Home isSignUp />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute authed={authed} />}>
            <Route path="" element={<Profile onLogout={unauthorize} />} />
          </Route>
          <Route path="/articles" element={<Articles />} />
          <Route path="chats" element={<ChatList />}>
            <Route path=":chatId" element={<Chat />} />
          </Route>
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

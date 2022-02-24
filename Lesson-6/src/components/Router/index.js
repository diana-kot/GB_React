import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import App from "../../App";
import { Chat } from "../Chat";
import {ChatList}   from "../ChatList/ChatList";
import Profile from '../Profile/Profile'
import "../Router/style.scss";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const Home = () => <h2>Home page</h2>;

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
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
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chats" element={<ChatList />}>
            <Route path=":chatId" element={<Chat />}></Route>
          </Route>
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

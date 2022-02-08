import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import App from "../../App";
import { Chat } from "../Chat";
import { ChatList } from "../ChatList/ChatList";
import Profile from "../Profile/index"
import "../Router/style.scss";

const Home = () => <h2>Home page</h2>;

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
      <div>
        <NavLink
          to="/"
          style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
        >
          Home
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
        >
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/chats"
          style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
        >
          Chats
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chats" element={<ChatList />}>
          <Route path=":chatId" element={<Chat />}></Route>
        </Route>
        <Route path="*" element={<h2>404</h2>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
};

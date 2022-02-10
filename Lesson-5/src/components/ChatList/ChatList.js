import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link, Outlet } from "react-router-dom";

import "../ChatList/style.scss";

import Chat1 from "../../img/multfilm_minion_14637.jpg";
import Chat2 from "../../img/multfilm_minion_16711.jpg";
import Chat3 from "../../img/multfilm_minion_17779.jpg";
import { MessageList } from "../MessageList";

const chats = [
  { id: "chat1", name: "Chat1", img: Chat1 },
  { id: "chat2", name: "Chat2", img: Chat2 },
  { id: "chat3", name: "Chat3", img: Chat3 },
];
// const [chatList, setChatList] = useState




export const ChatList = () => (
  <>
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {chats.map((chat) => (
        <ListItem className="chat_li" key={chat.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={chat.img} />
          </ListItemAvatar>
          <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
          <button className="chat__button">
            &times;
          </button>
        </ListItem>
      ))}
    </List>
    <Outlet />
  </>
);

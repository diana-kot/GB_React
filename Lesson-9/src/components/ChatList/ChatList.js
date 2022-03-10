import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";


import { Form } from "../FormItem/index";
import "./style.scss";
import {
  onValue,
  onChildRemoved,
  onChildAdded,
  set,
  remove,
} from "@firebase/database";

import {
  chatsRef,
  getChatsRefById,
  getMessagesRefByChatId,
} from "../../services/firebase";

import { getChatList } from "../../store/chat/chats";
import {
  addChat,
  deleteChat,
  initChatsTracking,
} from "../../store/chat/Action";

export const ChatList = () => {
  const chats = useSelector(getChatList);
  const chatId = useParams().chatId;
  const dispatch = useDispatch();


  const handleAddChat = (newChatName) => {
    const newId = `chat-${Date.now()}`;
    set(getChatsRefById(newId), { id: newId, name: newChatName });
    set(getMessagesRefByChatId(newId), { empty: true });
  };

  useEffect(() => {
    if (!chats) {
      return <Navigate to="/chats" replace />;
    }
  }, [chatId]);

  useEffect(() => {
    dispatch(initChatsTracking());
  }, []);

  return (
    <>
      <div>
        <List className="list">
          <div className="listItem">
            {chats.map((chat) => (
              <ListItem key={chat.id}>
                <Link to={`/chats/${chat.id}`} className="link">
                  {chat.name}
                </Link>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={chat.avatar} />
                </ListItemAvatar>
                <DeleteButton id={chat.id} />
              </ListItem>
            ))}
          </div>
        </List>
        <Form onSubmit={handleAddChat} />
      </div>
      <Outlet />
    </>
  );
};

import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { onValue, onChildRemoved, onChildAdded, set, remove } from "@firebase/database";
import {
  chatsRef,
  getChatsRefById,
  getMessageRefById,
  getMessagesRefByChatId,
  getMessageListRefByChatId
} from "../../services/firebase";

import { selectChats } from "../../store/selectors/chats";
import { addChat, deleteChat, initChatsTracking } from "../../store/actionCreators/chats";
import {initMessageTracking} from "../../store/actionCreators/messages";

export const ChatList = () => {
  const chats = useSelector(selectChats);
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();


  const handleAddChat = (newChatName) => {
    const newId = `chat${Date.now()}`;
    // dispatch(addChat(newId, newChatName));
    set(getChatsRefById(newId), {id: newId, name: newChatName} );
    // set(getMessagesRefByChatId(newId), {empty: true})
    
  };

  const handleDeleteChat = (id) => {
    // dispatch(deleteChat(id));
    // set(getChatsRefById(id), null)
    remove(getChatsRefById(id))
    // remove(getMessageListRefByChatId(id))
  };

  useEffect(() => {
    dispatch(initChatsTracking());
  }, []);

  // useEffect(() => dispatch(initMessageTracking()), []);

  return (
    <>
      <div>
        <List className="list">
          <ListItem className="listItem">
            {chats.map((chat) => (
              <ListItem key={chat.id}>
                <Link to={`/chats/${chat.id}`} className="link">
                  {chat.name}
                </Link>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={chat.avatar} />
                </ListItemAvatar>
                <IconButton
                  onClick={() => handleDeleteChat(chat.id)}
                  aria-label="delete"
                  className="deleteButton"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </ListItem>
        </List>
        <Form onSubmit={handleAddChat} />
      </div>
      <Outlet />
    </>
  );
};

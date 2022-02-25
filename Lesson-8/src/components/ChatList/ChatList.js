import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addChat, deleteChat } from "../../store/actionCreators/chats";
import { deleteChatMessages, addChatMessages} from "../../store/actionCreators/messages";
import { chatsSelector } from "../../store/selectors/chats";
import {Chats} from "../../present/Chats/Chats"

export const ChatList = () => {
 

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const chats = useSelector(chatsSelector);

  const { chatId } = useParams();
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addChat(`chat-${name}`, name));
    dispatch(addChatMessages(`chat-${name}`));
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteChatMessages(chatId));
    dispatch(deleteChat(chatId));
    navigate("/chats", { replace: true });
  };

  return (
    <Chats
    chats={chats}
    open={open}
    name={name}
    handleDelete={handleDelete}
    handleOpen={handleOpen}
    handleClose={handleClose}
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    />

  );
};
  
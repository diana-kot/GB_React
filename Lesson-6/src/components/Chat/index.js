import React, { useEffect, useState, useRef } from "react";
import { AUTHORS } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
// import s from "./Chat.module.css";
import { Form } from "../Form/index";
import Message from "../Message/index";
import { MessageList } from "../MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { messagesSelector } from "../../store/selectors/messages";
import {addMessage, deleteChatMessages,
} from "../../store/actionCreators/messages";
import { deleteChat } from "../../store/actionCreators/chats";
import Button from "@material-ui/core/Button/Button";
import "./style.scss";

export const Chat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEnd = useRef();


  const messageList = useSelector(messagesSelector);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();

    let timeout;
    if (
      messageList[chatId]?.[messageList[chatId]?.length - 1]?.author ===
      AUTHORS.ME
    ) {
      timeout = setTimeout(() => {
        dispatch(addMessage(chatId, { text: "Hi, I am a BOT", author: "BOT" }));
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [messageList]);

  const handleSubmit = (messageText) => {
    dispatch(
      addMessage(chatId, {
        text: messageText,
        author: "me",
        id: `msg-${Date.now()}`,
      })
    );
  };

  if (!messageList[chatId]) {
    return navigate("../chats", { replace: true });
  }

  // const handleDelete = () => {
  //   dispatch(deleteChatMessages(chatId));
  //   dispatch(deleteChat(chatId));
  //   navigate("/chats", { replace: true });
  // };
  if (!messageList[chatId]) {
    return <Navigate to="/chats" replace />;
  }
  return (
    <div>
      {/* <Button aria-label="delete" onClick={handleDelete}>
        delete chat
      </Button> */}

      <div className="app-content">
        <MessageList messages={messageList[chatId]} />
      </div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

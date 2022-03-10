import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "../Form/index";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { initMessageTracking } from "../../store/message/action";
import { getMessagesById } from "../../store/message/messagesSelector";
import { MessageList } from "../MessageList/index";

import "./style.scss";

import { set } from "@firebase/database";
import { getMessageRefById } from "../../services/firebase";

export const Chat = () => {
  const chatId = useParams().chatId;
  const dispatch = useDispatch();
  const getMessagesList = useMemo(() => getMessagesById(chatId), [chatId]);
  const messages = useSelector(getMessagesList);
  const messagesEnd = useRef();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit = (messageText) => {
    const newMsg = {
      text: messageText,
      author: "me",
      id: `msg${Date.now()}`,
    };
    set(getMessageRefById(chatId, newMsg.id), newMsg);
  };

  useEffect(() => {
    dispatch(initMessageTracking(chatId));
  }, [chatId]);

  if (!messages || !chatId) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <div>
      <div className="app-content">
        {messages && <MessageList messages={messages} />}
        <div ref={messagesEnd}></div>
      </div>
      <Form onSubmit={handleSubmit} chatId={chatId} />
    </div>
  );
};

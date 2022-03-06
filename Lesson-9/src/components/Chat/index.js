import React, { useEffect, useRef, useState } from "react";
import {  useParams } from "react-router-dom";
import { Form } from "../Form/index";
import { MessageList } from "../MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { messagesSelector } from "../../store/selectors/messages";
import { addMessageWithThunk} from "../../store/actionCreators/messages";
import "./style.scss";

import {
  onChildAdded,
  onChildRemoved,
  onValue,
  push,
  set,
} from "@firebase/database";
import {
  getMessageListRefByChatId,
  getMessageRefById,
  getMessagesRefByChatId,
} from "../../services/firebase";

export const Chat = () => {
  const dispatch = useDispatch();
  // const messageList = useSelector(messagesSelector);

  const [messages, setMessages] = useState([]);

  const { chatId } = useParams();
  const messagesEnd = useRef();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);



  const handleSubmit = (messageText) => {
    const newMsg = {
      text: messageText,
      author: "me",
      id: `msg-${Date.now()}`,
    }
    set(getMessageRefById(chatId, newMsg.id), newMsg);
  };

  useEffect(() => {
    const unsubscribe = onValue(getMessagesRefByChatId(chatId), (snapshot) => {
      if (!snapshot.val()?.empty) {
        setMessages(null);
      }
    });

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = onChildAdded(
      getMessageListRefByChatId(chatId),
      (snapshot) => {
        setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
      }
    );

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = onChildRemoved(
      getMessageListRefByChatId(chatId),
      (snapshot) => {
        setMessages((prevMessages) =>
          prevMessages.filter(({ id }) => id !== snapshot.val()?.id)
        );
      }
    );

    return unsubscribe;
  }, [chatId]);

  
  if (!messages) {
    return <Navigate to="/chats" replace />;
  }

  
    return (
      <div>
        <div className="app-content">
          <MessageList messages={messages} />
          <div ref={messagesEnd}></div>
        </div>
        <Form onSubmit={handleSubmit} />
      </div>
    );
  
};

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "../Form/index";
import { MessageList } from "../MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { messagesSelector } from "../../store/selectors/messages";
import { addMessageWithThunk } from "../../store/actionCreators/messages";
import { AUTHORS } from "../../utils/constants";
import "./style.scss";
import {initMessageTracking} from "../../store/actionCreators/messages";
import { getMessageListRefByChatId, getMessagesRefByChatId, getMessageRefById } from '../../services/firebase';

import {
  onChildAdded,
  onChildRemoved,
  onValue,
  push,
  set,
} from "@firebase/database";

export function Chat() {
  const { chatId } = useParams();

  // const messages = useSelector(selectMessages);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const messagesEnd = useRef();

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMsg = {
      text,
      author,
      id: `msg-${Date.now()}`,
    };
    // dispatch(addMessageWithThunk(chatId, newMsg));
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
        console.log(snapshot.val());
        setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
      }
    );

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = onChildRemoved(
      getMessageListRefByChatId(chatId),
      (snapshot) => {
        console.log(snapshot.val());
        setMessages((prevMessages) =>
          prevMessages.filter(({ id }) => id !== snapshot.val()?.id)
        );
      }
    );

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  if (!messages) {
    return <Navigate to="/chats" replace />;
  }

    return (
        <div>
        <div className="app-content">
          <MessageList messages={messages} />
        </div>
        <Form onSubmit={handleAddMessage} />
      </div>
      
    
  )
    
};

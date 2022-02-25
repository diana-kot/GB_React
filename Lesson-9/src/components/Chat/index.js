import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../Form/index";
import { MessageList } from "../MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { messagesSelector } from "../../store/selectors/messages";
import { addMessageWithThunk} from "../../store/actionCreators/messages";
import "./style.scss";

export const Chat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEnd = useRef();

  const messageList = useSelector(messagesSelector);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messageList]);

  const handleSubmit = (messageText) => {
    dispatch(
      addMessageWithThunk(chatId, {
        text: messageText,
        author: "me",
        id: `msg-${Date.now()}`,
      })
    );
  };

  if (!messageList[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  if (messageList[chatId]) {
    return (
      <div>
        <div className="app-content">
          <MessageList messages={messageList[chatId]} />
        </div>
        <Form onSubmit={handleSubmit} />
      </div>
    );
  } else {
    return (
      <>
        <div className="no-chat-message">
          Чата с этим пользователем ещё нет. Напишите сообщение, чтобы создать
          чат
        </div>

        <div>
          <div className="app-content">
            <MessageList messages={messageList[chatId]} />
          </div>
          <Form onSubmit={handleSubmit} />
        </div>
      </>
    );
  }
};

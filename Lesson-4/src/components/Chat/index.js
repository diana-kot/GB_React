import "../../App.css";
import { useState, useEffect, useRef } from "react";
import { AUTHORS } from "../../utils/constants";
import { Form } from "../Form";
import { MessageList } from "../MessageList";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { cyan, green } from "@mui/material/colors";
import { ChatList } from "../ChatList/ChatList";
import { Navigate, useParams } from "react-router-dom";

const chats = [{ id: "chat1" }];
const messages = {
  chat1: [],
};

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
  typography: {
    fontSize: 14,
  },
});

export function Chat() {
  const params = useParams();
  const { chatId } = params;

  const [messageList, setMessageList] = useState({
    chat1: [],
    chat2: [],
    chat3: [],
  });

  


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
    setMessageList((prevMessageList) => ({
      ...prevMessageList,
      [chatId]: [...prevMessageList[chatId], newMsg],
    }));
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();

    let timeout;
    if (
      messageList[chatId]?.[messageList[chatId]?.length - 1]?.author ===
      AUTHORS.ME
    ) {
      timeout = setTimeout(() => {
        sendMessage("Hi I am a BOT", AUTHORS.BOT);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [messageList]);

  useEffect(() => {
    console.log(messagesEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!messageList[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <ChatList /> */}

        <div>
          <div className="App-content">
            <MessageList messages={messageList[chatId]} />
          </div>
          <Form onSubmit={handleAddMessage} />
        </div>
      </div>
    </ThemeProvider>
  );
}

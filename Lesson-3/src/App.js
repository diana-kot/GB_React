import "./App.css";
import { AUTHORS } from "./utils/constants";
import { useState, useEffect, useRef } from "react";
import { Form } from "./components/Form";
import { MessageList } from "./components/MessageList";
import Header from "./components/Header/Header"
import ChartList from "./components/ChartList/ChartList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { cyan, green } from "@mui/material/colors";

import avatar from "./img/multfilm_minion_14637.jpg"
import Sergey from "./img/multfilm_minion_16711.jpg"
import Tanya from "./img/multfilm_minion_17779.jpg"


const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
  typography: {
    fontSize: 14,
  },
});


function App() {

  const [chats, setChat] = useState ([
      { id: 1, name: "Avatar", img: avatar},
      { id: 2, name: "Sergey", img: Sergey  },
      { id: 3, name: "Tanya", img: Tanya },
    ]);

  const [messageList, setMessageList] = useState([]);
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
    setMessageList((prevMessageList) => [...prevMessageList, newMsg]);
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();

    let timeout;
    if (messageList[messageList.length - 1]?.author === AUTHORS.ME) {
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

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <div className="App">
        <ChartList chats={chats} />
        <div className="App-content">
          <MessageList messages={messageList} />
          <div ref={messagesEnd} />
        </div>
        <Form onSubmit={handleAddMessage} />
      </div>
    </ThemeProvider>
  );
}

export default App;

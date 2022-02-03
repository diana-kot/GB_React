import "./App.css";
import  { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Message } from "./components/Message";


function App() {
  const [messageList, setMessageList] = useState([]);
 
  function handleAddMessage(text){
    setMessageList(messageList.concat([{
          text,
          author: "me"
      }]))
  };

  useEffect(() => {
    let timeout;
    const lastMessage = messageList[messageList.length - 1]
    if(lastMessage?.author === 'me') {
      setTimeout(()=>{
        setMessageList((prevMessageList) => [...prevMessageList, {text: "Hello I am a robot",  author: 'bot'} ])
      }, 1500)
    }
    return ()=> clearTimeout(timeout)
    
  }, [ messageList]);

  return (
    <div className="App">
      <header className="App-header">
        <Message messages={messageList}/>
        <Form onSubmit={handleAddMessage}/>
      </header>
    </div>
  );
}

export default App;

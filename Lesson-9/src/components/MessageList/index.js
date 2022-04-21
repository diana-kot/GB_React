import React from "react";
import { Message } from "../Message";
import "../MessageList/style.scss";


export const MessageList = ({ messages }) => {
 
  return messages.map((message) => (
    <div className="message-list"  >
      <Message  key={message.id} text={message.text} author={message.author} />
    </div>
  ));
};

import React from "react";
import {Message}  from "../Message";
import "../MessageList/style.scss";

export const MessageList = ({ messages }) => {
  return messages.map((message) => (
    <div className="message-list">
      <Message text={message.text} author={message.author} key={message.id} />
    </div>
  ));
};

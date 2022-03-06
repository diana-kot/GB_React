import React from "react";
import { useParams } from "react-router";
import { Message } from "../Message";
import "../MessageList/style.scss";
import { getMessageRefById, } from "../../services/firebase";
import {
  deleteMessage,
  editMessage,
  initMessageTracking
} from "../../store/actionCreators/messages";
import { remove, set, onValue } from "@firebase/database";
import { useDispatch } from "react-redux";

export const MessageList = ({ messages }) => {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    //dispatch(deleteMessage(chatId, id));
    remove(getMessageRefById(chatId, id));
  };

  const handleEdit = async (id, text) => {
    // dispatch(editMessage(chatId, id, "edited"));
    
  };

  return messages.map((message) => (
    <div className="message-list" key={message.id}>
      <Message text={message.text} author={message.author} />
      <button onClick={() => handleDelete(message.id)}>Delete</button>
      <button onClick={() => handleEdit(message.id)}>Edit</button>
    </div>
  ));
};

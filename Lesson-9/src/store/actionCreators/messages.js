import {
  getMessageListRefByChatId
} from './../../services/firebase';
import {
  onChildAdded,
} from "firebase/database";


import { AUTHORS } from "../../utils/constants";
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const EDIT_MESSAGE = "MESSAGES::EDIT_MESSAGE";

export const addMessage = (chatId, messageId, author, name, text) => ({
  type: ADD_MESSAGE,
  payload: { chatId,
    messageId,
    author,
    name,
    text, },
});

export const initMessageTracking = (chatId) => async (dispatch) => {
  await onChildAdded(getMessageListRefByChatId(chatId), (snapshot) => {
      dispatch(addMessage(chatId, snapshot.val().messageId, snapshot.val().author, snapshot.val().name, snapshot.val().text));
  });
};

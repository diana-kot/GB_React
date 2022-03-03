import {
  onChildAdded,
  onChildRemoved,
  onChildChanged,
} from "firebase/database";
import { getMessageListRefByChatId } from "../../services/firebase";

import { AUTHORS } from "../../utils/constants";
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const EDIT_MESSAGE = "MESSAGES::EDIT_MESSAGE";

export const addMessage = (chatId, newMessage) => ({
  type: ADD_MESSAGE,
  payload: { chatId, newMessage },
});

export const deleteMessage = (chatId, idToDelete) => ({
  type: DELETE_MESSAGE,
  payload: {
    chatId,
    idToDelete,
  },
});
export const editMessage = (chatId, idToEdit, newText) => ({
  type: EDIT_MESSAGE,
  payload: {
    chatId,
    idToEdit,
    newText,
  },
});

let timeout;

export const addMessageWithThunk =
  (chatId, newMessage) => (dispatch, getState) => {
    dispatch(addMessage(chatId, newMessage));
    if (newMessage.author !== AUTHORS.BOT) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const msgFromBot = {
          text: "Hi, I am a BOT",
          author: AUTHORS.BOT,
          id: `msg-${Date.now()}`,
        };
        dispatch(addMessage(chatId, msgFromBot));
      }, 1000);
    }
  };

export const initMessageTracking = (chatId) => (dispatch) => {
  onChildAdded(getMessageListRefByChatId(chatId), (snapshot) => {
    dispatch(addMessage(chatId, snapshot.val().newMessage));
  });

  onChildRemoved(getMessageListRefByChatId(chatId), (snapshot) => {
    dispatch(deleteMessage(chatId, snapshot.val().id));
  });

  onChildChanged(getMessageListRefByChatId(chatId), (snapshot) => {
    dispatch(
      editMessage(chatId, snapshot.val().idToEdit, snapshot.val().newText)
    );
  });
};

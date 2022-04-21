import {
  getMessageListRefByChatId
} from '../../services/firebase';
import {
  onChildAdded,
} from "firebase/database";


export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";


export const addMessage = (chatId, messageId, author,  text) => ({
  type: ADD_MESSAGE,
  payload: { chatId,
    messageId,
    author,
    text, },
});

export const initMessageTracking = (chatId) => async (dispatch) => {
  await onChildAdded(getMessageListRefByChatId(chatId), (snapshot) => {
      dispatch(addMessage(chatId, snapshot.val().id, snapshot.val().author, snapshot.val().text));
      // const { id, author, text,  } = snapshot.val();
      // dispatch(addMessage(chatId, id, author, text, ));
  });
};

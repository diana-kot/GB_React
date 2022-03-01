import { AUTHORS } from "../../utils/constants";
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";




export const addMessage = (chatId, newMessage) => ({
  type: ADD_MESSAGE,
  payload: {chatId, newMessage},
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

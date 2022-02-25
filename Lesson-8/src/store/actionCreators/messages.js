import { AUTHORS } from "../../utils/constants";
export const ADD_CHAT_MESSAGES = "MESSAGES::ADD_CHAT_MESSAGES";
export const DELETE_CHAT_MESSAGES = "MESSAGES::DELETE_CHAT_MESSAGES";
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE"

export const addChatMessages = (chatId) => ({
  type: ADD_CHAT_MESSAGES,
  id: chatId,
});

export const deleteChatMessages = (chatId) => ({
  type: DELETE_CHAT_MESSAGES,
  id: chatId,
});

export const addMessage = (chatId, newMessage) => ({
  type: ADD_MESSAGE,
  id: chatId,
  message: newMessage,
});

// export const deleteMessage = (chatId, idToDelete) => ({
//   type: DELETE_MESSAGE,
//   idchat: chatId,
//   delete: idToDelete,
// });



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

import { ADD_MESSAGE } from "./action";
import { DELETE_CHAT, ADD_CHAT } from "../chat/Action";

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      if (
        state[action.payload.chatId] &&
        state[action.payload.chatId].find(
          (el) => el.id === action.payload.messageId
        )
      ) {
        return state;
      }

      if (state[action.payload.chatId]?.length) {
        return {
          ...state,
          [action.payload.chatId]: [
            ...state[action.payload.chatId],
            {
              id: action.payload.messageId,
              author: action.payload.author,
              text: action.payload.text,
            },
          ],
        };
      } else {
        return {
          ...state,
          [action.payload.chatId]: [
            {
              id: action.payload.messageId,
              author: action.payload.author,
              text: action.payload.text,
            },
          ],
        };
      }
    }
    case ADD_CHAT: {
      return {
        ...state,
        [action.payload.id]: [],
      };
    }
    case DELETE_CHAT:
      const newMsg = { ...state };
      delete newMsg[action.payload];
      return newMsg;
    default:
      return state;
  }
};

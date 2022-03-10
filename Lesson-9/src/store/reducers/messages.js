import { ADD_MESSAGE } from "../actionCreators/messages";
import { DELETE_CHAT } from "../../store/actionCreators/chats";

const initialState = {};

export const messagesReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        [payload.chatId]: {
          ...state[payload.chatId],
          [payload.messageId]: {
            id: payload.messageId,
            text: payload.text,
            author: payload.author,
          },
        },
      };
    }
    default:
			return state;
  }
};

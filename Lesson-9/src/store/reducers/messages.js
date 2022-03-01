import { ADD_MESSAGE} from "../actionCreators/messages";
import { ADD_CHAT, DELETE_CHAT } from '../../store/actionCreators/chats';

const initialState = {
  messages: {
    chat1: [
      { text: "hello", author: "me", id: `chat1-msg1` },
      { text: "hello", author: "me", id: `chat1-msg2` },
    ],
    chat2: [{ text: "Hello, Nick!", author: "me", id: `chat2-msg1` }],
    chat3: [
      { text: "Hi", author: "me", id: `chat3-msg1` },
      { text: "What are you doin?", author: "me", id: `chat3-msg2` },
    ],
    chat4: [{ text: "Good morning", author: "me", id: `chat4-msg1` }],
    chat5: [{ text: "Good morning", author: "me", id: `chat4-msg1` }],
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_MESSAGE: {
        return { ...state, 
          [action.payload.chatId]: [
            ...state[action.payload.chatId], action.payload.newMessage,
          ],
        };
    }
    case ADD_CHAT: {
      return {
        ...state,
        [action.payload.id]: [],
      }
    }
    case DELETE_CHAT: {
      const newMsgs = {...state};
      delete newMsgs[action.payload];
      return newMsgs;
    }
    default:
      return state;
  }
};

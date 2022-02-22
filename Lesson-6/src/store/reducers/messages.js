import {ADD_CHAT_MESSAGES, ADD_MESSAGE, DELETE_CHAT_MESSAGES} from "../actionCreators/messages";

const initialState = {
  messages: {
    chat1: [
      { text: "hello", author: "me", id: `chat1-msg1` },
      { text: "hello", author: "me", id: `chat1-msg2` },
    ],
    chat2: [{ text: "Hello, Nick!", author: "me", id: `chat2-msg1` }],
    chat3: [
      { text: "Hi, sisters!", author: "me", id: `chat3-msg1` },
      { text: "What are you doin?", author: "me", id: `chat3-msg2` },
    ],
    chat4: [{ text: "Good morning", author: "me", id: `chat4-msg1` }],
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MESSAGES: {
      return {
        ...state,
        messages: { ...state.messages, [action.id]: [] },
      };
    }
    case DELETE_CHAT_MESSAGES: {
      delete state.messages[action.id];
      return {
        ...state,
        messages: { ...state.messages },
      };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.id]: [...state.messages[action.id], action.message],
        },
      };
    }
    default:
      return state;
  }
};

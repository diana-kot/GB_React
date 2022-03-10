import {ADD_CHAT, DELETE_CHAT} from "./Action";

const initialState = [];

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      return [...state, {id: action.payload.id, name: action.payload.name}];
    }
    case DELETE_CHAT: {
      return state.filter(({id}) => id !== action.payload);
    }
    default:
      return state;
  }
};


import { ADD_CHAT, DELETE_CHAT } from "../../store/actionCreators/chats";

const initialState = {};

export const chatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHAT: {
      return {
        ...state,
        [payload.id]: {
          name: payload.name,
          id: payload.id,
          messages: [],
        },
      };
    }
    case DELETE_CHAT: {
      const newStoreState = {...state};
			delete newStoreState[payload.id];
			return newStoreState;
    }
    default:
      return state;
  }
};

import {ADD_CHAT, DELETE_CHAT} from "../../store/actionCreators/chats";

const initialState = {
    chats: [
        {id: 'chat1', name: 'Friends'},
        {id: 'chat2', name: 'Fam'},
        {id: 'chat3', name: 'Besties'},
        {id: 'chat4', name: 'Nick'},
    ]
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, {id: action.id, name: action.name}]
            }
        }
        case DELETE_CHAT: {
            return {
                ...state,
                chats: state.chats.filter(chat => chat.id !== action.id)
            }
        }
        default:
            return state
    }
}

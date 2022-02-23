import {ADD_CHAT, DELETE_CHAT} from "../../store/actionCreators/chats";

const initialState = {
    chats: [
        {id: 'chat1', name: 'Alex', avatar: '/img/avatar/1.jpg'},
        {id: 'chat2', name: 'Nolan', avatar: '/img/avatar/2.jpg'},
        {id: 'chat3', name: 'Serega', avatar: '/img/avatar/3.jpg'},
        {id: 'chat4', name: 'Dima', avatar: '/img/avatar/4.jpg'},
        {id: 'chat5', name: 'Irina', avatar: '/img/avatar/5.jpg'},
    ]
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, {id: action.id, name: action.name,
                avatar: action.avatar}]
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

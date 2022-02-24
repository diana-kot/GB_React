export const ADD_CHAT = 'CHATS::ADD_CHAT'
export const DELETE_CHAT = 'CHATS::DELETE_CHAT'

export const addChat = (chatId, chatName) => ({
    type: ADD_CHAT,
    id: chatId,
    name: chatName,
})

export const deleteChat = (chatId) => ({
    type: DELETE_CHAT,
    id: chatId,
})
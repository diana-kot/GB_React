export const ADD_CHAT_MESSAGES = 'MESSAGES::ADD_CHAT_MESSAGES'
export const DELETE_CHAT_MESSAGES = 'MESSAGES::DELETE_CHAT_MESSAGES'
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE'

export const addChatMessages = (chatId) => ({
    type: ADD_CHAT_MESSAGES,
    id: chatId
})

export const deleteChatMessages = (chatId) => ({
    type: DELETE_CHAT_MESSAGES,
    id: chatId
})

export const addMessage = (chatId, newMessage) => ({
    type: ADD_MESSAGE,
    id: chatId,
    message: newMessage
})

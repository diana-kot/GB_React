export const getMessages = state => state.messages
export function getMessagesById(id) {
    return (state) => state.messages?.[id];
} 
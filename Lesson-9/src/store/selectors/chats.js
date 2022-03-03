export const selectChats = (state) => state.chats;
export const selectMessages = id => state => state.chats[id].messages;
import { combineReducers } from 'redux'

import  profileReducer  from './profileReducer'
import  {chatsReducer}  from './chatsReducer'
import {messagesReducer} from "./messages";


const rootReducer = combineReducers({
    profile: profileReducer, 
    chats: chatsReducer,
    messages: messagesReducer,

})

export default rootReducer
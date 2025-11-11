import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice.js"
import chatReducer from "./chatSlice";
import userChatIdReducer from './chatID.js';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        Activity: chatReducer,
        chatId:userChatIdReducer,
        
    }
})
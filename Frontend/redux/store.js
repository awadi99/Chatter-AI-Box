import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice.js"
import chatReducer from "./chatSlice";
import userChatIdReducer from './chatID.js';
import  checkonlineUserReducer  from './onlineUserSlice.js';
import soundReducer from './soundSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        Activity: chatReducer,
        chatId:userChatIdReducer,
        online:checkonlineUserReducer,
        sound:soundReducer,
    }
})
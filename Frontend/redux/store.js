import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./slice.js"

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})
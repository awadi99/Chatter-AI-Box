import { createSlice } from "@reduxjs/toolkit";


const  initialState = {
    userId:null
};
const userChatId=createSlice({
    name:"chatId",
    initialState,
    reducers:{
        getChatId:(state,action)=>{
        state.userId=action.payload;
        }
    },
});

export const {getChatId}=userChatId.actions;
export default userChatId.reducer; 
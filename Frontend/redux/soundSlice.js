import { createSlice } from "@reduxjs/toolkit";

const soundSlice =createSlice({
    name:"sound",
    initialState:{
        isSoundEnabled :true
    },
    reducers:{
        toggleSound:((state)=>{
            state.isSoundEnabled=!state.isSoundEnabled;
        })
    }
})

export const {toggleSound}=soundSlice.actions;
export default soundSlice.reducer;
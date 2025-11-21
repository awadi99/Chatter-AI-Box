import { createSlice } from '@reduxjs/toolkit';

export const onlineUserSlice = createSlice({
    name: "online",
    initialState: {
        onlineUsers: []
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const { setOnlineUsers } = onlineUserSlice.actions;
export default onlineUserSlice.reducer;

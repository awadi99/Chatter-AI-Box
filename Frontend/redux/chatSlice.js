import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    activity: null,
};

const userActivity = createSlice({
    name: "Activity",
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.activity = action.payload;
        }
    },
});

export const { setActive } = userActivity.actions;
export default userActivity.reducer;
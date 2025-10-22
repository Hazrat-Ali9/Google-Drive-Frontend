import { createSlice } from '@reduxjs/toolkit';
// User Slice
const userSlice = createSlice({
    name: 'user', // Name for your slice
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer


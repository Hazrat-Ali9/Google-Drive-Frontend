import { createSlice } from '@reduxjs/toolkit';

const reloadSlice = createSlice({
    name: 'reload', // Name for your slice
    initialState: {
        reloadFiles: null,
        reloadUser: null,
        reloadFolder: null,
    },
    reducers: {
        setReloadFiles: (state, action) => {
            state.reloadFiles = action.payload;
        },
        setReloadUser: (state, action) => {
            state.reloadUser = action.payload;
        }, 
        setReloaFolder: (state, action) => {
            state.reloadFolder = action.payload;
        },
    },
});
export const { setReloadFiles, setReloadUser,setReloaFolder } = reloadSlice.actions;
export default reloadSlice.reducer

// Reload Slice
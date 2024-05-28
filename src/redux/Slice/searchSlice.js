import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search', // Name for your slice
    initialState: {
        files: [],
        folders: [],
    },
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setFolders: (state, action) => {
            state.folders = action.payload;
        },
    },
});
export const { setFiles, setFolders } = searchSlice.actions;
export default searchSlice.reducer

// Seach Slice
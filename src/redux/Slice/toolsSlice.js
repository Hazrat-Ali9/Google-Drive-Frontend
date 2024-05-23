import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
    name: 'tools', // Name for your slice
    initialState: {
        showSidebar: false,
        selectedFile: null,
        showFileInfo: false
    },
    reducers: {
        setShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        setSelectedFile: (state, action) => {
            state.selectedFile = action.payload;
        },
        setShowFileInfo: (state, action) => {
            state.showFileInfo = action.payload;
        }
    },
});
export const {
    setShowSidebar,
    setSelectedFile,
    setShowFileInfo
} = toolSlice.actions;
export default toolSlice.reducer
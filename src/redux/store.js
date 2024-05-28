import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slice/userSlice';
import reloadSlice from './Slice/reloadSlice';
import toolsSlice from './Slice/toolsSlice';
import searchSlice from './Slice/searchSlice';


export const store = configureStore({
    reducer: {
        user: userSlice, // Add your slice reducer to the store
        reload: reloadSlice,
        tools: toolsSlice,
        search: searchSlice
    },
});

// Store JS

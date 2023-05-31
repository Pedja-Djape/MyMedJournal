import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        toggle(state) {
            state.isAuthenticated = !state.isAuthenticated;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null
    },
    reducers: {
        manageToken(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;


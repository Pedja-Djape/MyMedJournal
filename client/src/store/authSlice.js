import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null,
        email: null,
        id: null
    },
    reducers: {
        manageToken(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.id = action.payload.email;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;


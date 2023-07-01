import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null,
        email: null,
    },
    reducers: {
        manageToken(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.id = action.payload.id;
            return state;
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice;


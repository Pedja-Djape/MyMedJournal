import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { CONFIG } from "./persistConfig";
import { authReducer } from "./authSlice";



const persistedReducer = persistReducer(CONFIG, authReducer);

export const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: [thunk]
});

export const persistor = persistStore(store);




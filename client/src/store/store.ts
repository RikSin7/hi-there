import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import userReducer from "./user/user.slice";
import chatReducer from "./chat/chat.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
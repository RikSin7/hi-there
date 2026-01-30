import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import userReducer from "./user/user.slice";
import chatReducer from "./chat/chat.slice";

// Note: Redux Persist temporarily disabled due to installation issues
// To enable later: npm install redux-persist and uncomment persistence code

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Temporary: export a dummy persistor for compatibility
export const persistor = null;
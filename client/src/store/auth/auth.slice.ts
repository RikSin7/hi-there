import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";
import { loginThunk, logoutThunk } from "./auth.thunks";

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // signup
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
            });
    },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";
import { loginThunk, logoutThunk, signupThunk } from "./auth.thunks";
import { getToken, removeToken, setToken } from "../../utils/token";

const token = getToken();

const initialState: AuthState = {
    isAuthenticated: !!token,
    accessToken: token,
    buttonLoading: false,
    screenLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthStates(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.screenLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // login
            .addCase(loginThunk.pending, (state) => {
                state.buttonLoading = true;
                state.screenLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
                setToken(state.accessToken);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.error = action.payload as string;
            })

            // signup
            .addCase(signupThunk.pending, (state) => {
                state.buttonLoading = true;
                state.screenLoading = true;
                state.error = null;
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
                setToken(state.accessToken);

            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.error = action.payload as string;
            })

            // logout
            .addCase(logoutThunk.pending, (state) => {
                state.buttonLoading = true;
                state.screenLoading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.isAuthenticated = false;
                state.accessToken = null;
                removeToken();
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.buttonLoading = false;
                state.screenLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetAuthStates } = authSlice.actions;
export default authSlice.reducer;

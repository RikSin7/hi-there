import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthService } from "../../services";
import type { LoginPayload, AuthResponse, SignupPayload } from "./auth.types";

export const loginThunk = createAsyncThunk<
    AuthResponse, // return type
    LoginPayload, // argument type for payload
    { rejectValue: string }
>("/auth/login", async (credentials, { rejectWithValue }) => {
    try {
        return await AuthService.login(credentials);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(
                err?.response?.data?.message || "Login failed"
            );
        }
        return rejectWithValue("Login failed");
    }
});

export const signupThunk = createAsyncThunk<
    AuthResponse,
    SignupPayload,
    { rejectValue: string }
>("/auth/signup", async (credentials, { rejectWithValue }) => {
    try {
        return await AuthService.signup(credentials);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(
                err?.response?.data?.message || "Signup failed"
            );
        }
        return rejectWithValue("Signup failed");
    }
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
    try {
        return await AuthService.logout();
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return err?.response?.data?.message || "Logout failed";
        }
        return "Logout failed";
    }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    "/auth/login",
    async (
        credentials: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post("auth/login", credentials);
            return res.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(
                    err.response?.data?.message || "Login failed"
                );
            }
            return rejectWithValue("Login failed");
        }
    }
);

export const signupThunk = createAsyncThunk(
    "/auth/signup",
    async (
        credentials: {
            name: string;
            username: string;
            email: string;
            password: string;
            gender: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post("auth/signup", credentials);
            return res.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(
                    err.response?.data?.message || "Signup failed"
                );
            }
            return rejectWithValue("Signup failed");
        }
    }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
    await axios.post("/auth/logout");
});

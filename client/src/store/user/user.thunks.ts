import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfileThunk = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/user/me");
            return res.data;
        } catch {
            return rejectWithValue("Failed to fetch user");
        }
    }
);

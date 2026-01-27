import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services";
import type { User } from "./user.types";

export const fetchUserProfileThunk = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("user/fetchProfile", async (_, { rejectWithValue }) => {
    try {
        return await UserService.fetchMyProfile();
    } catch {
        return rejectWithValue("Failed to fetch user");
    }
});

export const fetchUsersThunk = createAsyncThunk(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            return await UserService.getUsers();
        } catch {
            return rejectWithValue("Failed to fetch users");
        }
    }
);

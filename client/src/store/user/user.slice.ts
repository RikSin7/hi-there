import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import { fetchProfileThunk, fetchUsersThunk } from "./user.thunks";

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
    users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state) {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch profile
            .addCase(fetchProfileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //fetch other users
            .addCase(fetchUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

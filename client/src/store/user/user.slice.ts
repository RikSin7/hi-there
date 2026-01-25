import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import { fetchUserProfileThunk } from "./user.thunks";

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
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
            .addCase(fetchUserProfileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

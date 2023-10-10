import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";

const initialState = {
  entries: [],
  loading: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await userAPI.fetchUsers();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = "succeeded";
      state.entries = payload;
    });
  },
});

export default userSlice.reducer;

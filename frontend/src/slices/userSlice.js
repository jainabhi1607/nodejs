import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "ecommerce/fetchUsers",
  async () => {
    const result = await axios.get("https://fakestoreapi.in/api/users");
    return result.data;
  }
);

export const getUserById = createAsyncThunk(
  "ecommerce/getUserById",
  async (id) => {
    // console.log("https://fakestoreapi.in/api/users/"+id)
    const result = await axios.get(
      "https://fakestoreapi.in/api/users/" + id
    );
    console.log(result.data);
    return result.data;
  }
);

export const userSl = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    userDetails: {},
    cart: [],
    wishlist: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      });
  },
});

export const userReducer = userSl.reducer; //exported to store

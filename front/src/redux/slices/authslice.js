
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const server="http://localhost:5000";
export const studentSignup = createAsyncThunk(
    "auth/studentSignup",
    async (formData, { rejectWithValue }) => {
    console.log("hre")
    console.log(formData)
      try {
        const response = await axios.post(`${server}/api/auth/student/signup`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Signup failed");
      }
    }
  );
  





const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAdmin: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAdmin = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(studentSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(studentSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(studentSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
     
  },
});
export default authslice.reducer;
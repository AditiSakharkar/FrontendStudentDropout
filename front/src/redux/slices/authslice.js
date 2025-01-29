
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const server="http://localhost:5000";
export const studentLogin = createAsyncThunk(
    "auth/studentLogin",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${server}/api/auth/student/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        return response.data; // return the user data and token
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
    }
  );

  export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${server}/api/auth/admin/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        return response.data; // return the admin data and token
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
    }
  );
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
    .addCase(studentLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAdmin = false; 
        state.error = null;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.admin.email;
        state.token = action.payload.token;
        state.isAdmin = true;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
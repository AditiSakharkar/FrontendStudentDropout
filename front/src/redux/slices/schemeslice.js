
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
const server="http://localhost:5000";

export const schemerelease = createAsyncThunk(
    "auth/release",
    async (formData, { rejectWithValue }) => {
    console.log("hre")
    console.log(formData)
      try {
        const response = await axios.post(`${server}/api/scheme/release`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Scheme creation failed");
      }
    }
  );

  export const getAllSchemes = createAsyncThunk(
    "scheme/getAll", 
    async (token, { rejectWithValue }) => {
      try {
        const token = useSelector((state) => state.auth.token);
       console.log("Token from Redux: ", token); // Check if token is correctly retrieved

        const response = await axios.get(`${server}/api/scheme/getallschemes`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true, // Include cookies if needed
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch schemes");
      }
    }
  );
  

const schemeslice = createSlice({
  name: "schemes",
  initialState: {
    user: null,
    token: null,
    isAdmin: false,
    loading: false,
    error: null,
  },
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
    .addCase(schemerelease.pending, (state) => {
            state.loading = true;
          })
          .addCase(schemerelease.fulfilled, (state, action) => {
            state.loading = false;
            state.schemes = action.payload;
            
            state.error = null;
          })
          .addCase(schemerelease.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getAllSchemes.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllSchemes.fulfilled, (state, action) => {
            state.loading = false;
            state.schemes = action.payload;
            console.log("here",action.payload)
            state.error = null;
          })
          .addCase(getAllSchemes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
});
export default schemeslice.reducer;
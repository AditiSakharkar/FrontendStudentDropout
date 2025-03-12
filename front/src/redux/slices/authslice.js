
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
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
  
  export const getAllSchemes = createAsyncThunk(
    "auth/getAll", 
    async (args ,{ rejectWithValue }) => {
      try {
       

        const response = await axios.get(`${server}/api/scheme/getallschemes`, {
          
          withCredentials: true, // Include cookies if needed
        });
        console.log(response.data.schemes[0])
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch schemes");
      }
    }
  );
  export const getschemenames = createAsyncThunk(
    "auth/getAllnames", 
    async (args ,{ rejectWithValue }) => {
      try {
       

        const response = await axios.get(`${server}/api/scheme/getschemenames`, {
          
          withCredentials: true, // Include cookies if needed
        });
        console.log(response.data.schemes[0])
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch schemes");
      }
    }
  );
  export const getparticular_schemenames = createAsyncThunk(
    "auth/getscheme_details", 
    async (schemeId ,{ rejectWithValue }) => {
      try {
       

        const response = await axios.post(`${server}/api/scheme/getparticulardetails`, {schemeId},{
          
          withCredentials: true, 
        });
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch scheme details");
      }
    }
  );  
  export const releasescheme = createAsyncThunk(
    "auth/release", 
    async (formData ,{ rejectWithValue }) => {
      console.log(formData)
      try {
       

        const response = await axios.post(`${server}/api/scheme/release`,formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies if needed
        });
        console.log(response)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to release scheme");
      }
    }
  );  
  export const studentapply = createAsyncThunk(
    "auth/studentapply",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${server}/api/scheme/apply`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        return response.data; // return the user data and token
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to apply");
      }
    }
  );
  export const getparticular_student_details = createAsyncThunk(
    "auth/getstudent_details", 
    async (studentId ,{ rejectWithValue }) => {
      try {
        console.log("before request")

        const response = await axios.get(`${server}/api/scheme/getparticular_studentdetails`, {
          params: { studentId }, // Pass studentId as a query param
          withCredentials: true, // Move withCredentials inside config
        });
        console.log("here",response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch student details");
      }
    }
  ); 
  export const approveorreject = createAsyncThunk(
    "auth/approveor_reject",
    async (formData, { rejectWithValue }) => {
      try {
        console.log("inapprovefrontend function")
        const response = await axios.post(`${server}/api/scheme/approveorrejct`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        return response.data; // return the user data and token
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update status");
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
        console.log(state.user,state.token)
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
        state.user = action.payload.user.email;
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
      .addCase(getAllSchemes.pending, (state) => {
                  state.loading = true;
                })
      .addCase(getAllSchemes.fulfilled, (state, action) => {
                  state.loading = false;
                  state.schemes = action.payload.schemes;
                   console.log(state.schemes)
                  state.error = null;
                })
                .addCase(getAllSchemes.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;
                })    
                .addCase(approveorreject.pending, (state) => {
                  state.loading = true;
                })
      .addCase(approveorreject.fulfilled, (state, action) => {
                  state.loading = false;
                  
                  state.error = null;
                })
                .addCase(approveorreject.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;
                })                   
      .addCase(getschemenames.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;
                })
                .addCase(getschemenames.pending, (state) => {
                  state.loading = true;
                })
      .addCase(getschemenames.fulfilled, (state, action) => {
                  state.loading = false;
                  state.schemesnames = action.payload.schemes;
                   console.log(state.schemesnames)
                  state.error = null;
                })
                .addCase(getparticular_schemenames.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;
                })
                .addCase(getparticular_schemenames.pending, (state) => {
                  state.loading = true;
                })
      .addCase(getparticular_schemenames.fulfilled, (state, action) => {
                  state.loading = false;
                  state.scheme_details = action.payload.schemedetails;
                   console.log(state.scheme_details)
                  state.error = null;
                })        
                .addCase(getparticular_student_details.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;
                })
                .addCase(getparticular_student_details.pending, (state) => {
                  state.loading = true;
                })
      .addCase(getparticular_student_details.fulfilled, (state, action) => {
                  state.loading = false;
                  state.student_details = action.payload.studentdetails;
                   console.log(state.student_details)
                  state.error = null;
                })    
      .addCase(releasescheme.pending, (state)=>{
        state.loading = true;
      })
      .addCase(releasescheme.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(releasescheme.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(studentapply.pending, (state)=>{
        state.loading = true;
      })
      .addCase(studentapply.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(studentapply.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});
export default authslice.reducer;
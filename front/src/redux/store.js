import { configureStore } from '@reduxjs/toolkit';
import authreducer from "./slices/authslice.js"



const store = configureStore({
  reducer: {
    auth: authreducer,
  },
  
});



export default store;
export const server="http://localhost:5000";

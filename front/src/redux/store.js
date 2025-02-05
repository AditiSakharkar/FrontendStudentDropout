import { configureStore } from '@reduxjs/toolkit';
import authreducer from "./slices/authslice.js"
import schemereducer from "./slices/schemeslice.js"



const store = configureStore({
  reducer: {
    auth: authreducer,
   // schemes:schemereducer
  },
  
});



export default store;
export const server="http://localhost:5000";

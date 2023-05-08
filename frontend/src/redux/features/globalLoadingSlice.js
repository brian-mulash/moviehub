import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
   name: "GlobalLoading",

   initialState: {
      globalLoading: false

   },
   reducers: {
      setGlobalLoding: (state, action) => {
         state.appState = action.payload
      },
   },

});

export const {
   setGlobalLoading
} = globalLoadingSlice.actions

export default globalLoadingSlice.reducer
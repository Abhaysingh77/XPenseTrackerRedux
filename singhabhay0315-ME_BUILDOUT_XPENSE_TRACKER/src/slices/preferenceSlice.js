import { createSlice } from "@reduxjs/toolkit";
const preferenceSlice = createSlice({
  name: "preferenceSliceReducer",
  initialState: {
    preference : 'All',
  },
  reducers: {
    changePreference: (state, action) => {
        state.preference = action.payload;
    },
  },
});

export const {changePreference} = preferenceSlice.actions;
export default preferenceSlice.reducer;

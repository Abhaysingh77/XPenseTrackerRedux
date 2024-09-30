import { createSlice } from "@reduxjs/toolkit";

const newTrackerSlice = createSlice({
  name: "newTrackerReducer",
  initialState: {
    trackerData: {
      name: "",
      monthlyBudget:"",
      category: {
        Food: "",
        Travel: "",
        Entertainment: "",
        Other:""
      },
    },
  },
  reducers: {
    addNewTracker: (state, action) => {
        state.trackerData = action.payload;
    },
  },
});

export const {addNewTracker} = newTrackerSlice.actions;
export default newTrackerSlice.reducer;

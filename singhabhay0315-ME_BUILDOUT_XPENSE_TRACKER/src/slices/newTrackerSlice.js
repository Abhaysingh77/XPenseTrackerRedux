import { createSlice } from "@reduxjs/toolkit";

const newTrackerSlice = createSlice({
  name: "newTrackerReducer",
  initialState: {
    trackerData: {
      name: "",
      monthlyBudget: "",
      category: {
        Food: "",
        Travel: "",
        Entertainment: "",
        Other: ""
      },
    },
  },
  reducers: {
    addNewTracker: (state, action) => {
      state.trackerData = action.payload;
    },
    addOtherCategoryData: (state, action) => {
      state.trackerData.category.Other = action.payload
    }
  },
});

export const { addNewTracker, addOtherCategoryData } = newTrackerSlice.actions;
export default newTrackerSlice.reducer;

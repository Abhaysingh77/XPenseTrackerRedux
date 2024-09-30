import { createSlice } from "@reduxjs/toolkit";

const newExpenseSlice = createSlice({
  name: "newExpenseReducer",
  initialState: {
    expenseData: [],
  },
  reducers: {
    addNewExpense: (state, action) => {
      state.expenseData.push(action.payload);
    },
    deleteExpense: (state, action) => {
      // Filter out the expense with the matching id
      state.expenseData = state.expenseData.filter(
        (expense) => expense.id !== action.payload
      );
    },
    
  },
});

export const { addNewExpense, deleteExpense } = newExpenseSlice.actions;
export default newExpenseSlice.reducer;

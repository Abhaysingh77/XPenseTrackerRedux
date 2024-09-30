// expenseSlice.test.js
import expenseReducer, {
  addNewExpense,
  deleteExpense,
} from "../slices/newExpenseSlice";

describe("expense slice reducers", () => {
  const initialState = {
    expenseData: [],
  };

  it("should handle addNewExpense", () => {
    const newExpense = {
      id: "1",
      name: "Groceries",
      amount: "100",
      category: "Food",
    };
    const action = addNewExpense(newExpense);
    const newState = expenseReducer(initialState, action);
    
    expect(newState.expenseData).toEqual([newExpense]);
  });

  it("should handle deleteExpense", () => {
    const initialStateWithExpense = {
      expenseData: [
        { id: "1", name: "Groceries", amount: "100", category: "Food" },
        { id: "2", name: "Taxi", amount: "50", category: "Travel" },
      ],
    };
    
    const action = deleteExpense("1");
    const newState = expenseReducer(initialStateWithExpense, action);
    
    expect(newState.expenseData).toEqual([
      { id: "2", name: "Taxi", amount: "50", category: "Travel" },
    ]);
  });

  it("should not change state when deleting a non-existing expense", () => {
    const initialStateWithExpense = {
      expenseData: [
        { id: "1", name: "Groceries", amount: "100", category: "Food" },
      ],
    };

    const action = deleteExpense("2"); // Trying to delete a non-existing expense
    const newState = expenseReducer(initialStateWithExpense, action);
    
    expect(newState.expenseData).toEqual(initialStateWithExpense.expenseData);
  });
});

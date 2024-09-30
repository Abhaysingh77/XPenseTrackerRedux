import newExpenseReducer, {
  addNewExpense,
  deleteExpense,
} from "../slices/newExpenseSlice";

describe("newExpense slice reducers", () => {
  const initialState = {
    expenseData: [],
  };

  it("should handle addNewExpense", () => {
    const action = addNewExpense({
      id: "1",
      name: "Groceries",
      amount: 50,
      category: "food",
    });
    const newState = newExpenseReducer(initialState, action);
    expect(newState.expenseData).toHaveLength(1);
    expect(newState.expenseData[0]).toEqual({
      id: "1",
      name: "Groceries",
      amount: 50,
      category: "food",
    });
  });

  it("should handle deleteExpense", () => {
    const prevState = {
      expenseData: [
        { id: "1", name: "Groceries", amount: 50, category: "food" },
        { id: "2", name: "Fuel", amount: 30, category: "travel" },
      ],
    };
    const action = deleteExpense("1");
    const newState = newExpenseReducer(prevState, action);
    expect(newState.expenseData).toHaveLength(1);
    expect(newState.expenseData[0].name).toEqual("Fuel");
    expect(newState.expenseData[0].id).toEqual("2");
  });

  it("should handle deleteExpense for non-existing id", () => {
    const prevState = {
      expenseData: [
        { id: "1", name: "Groceries", amount: 50, category: "food" },
        { id: "2", name: "Fuel", amount: 30, category: "travel" },
      ],
    };
    const action = deleteExpense("3"); // ID that doesn't exist
    const newState = newExpenseReducer(prevState, action);
    expect(newState.expenseData).toHaveLength(2); // Should remain the same
  });
});

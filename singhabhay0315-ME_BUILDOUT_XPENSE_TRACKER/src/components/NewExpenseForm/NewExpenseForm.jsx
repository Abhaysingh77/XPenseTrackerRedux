import React from "react";
import Style from "./NewExpenseForm.module.css";
import { useDispatch } from "react-redux";
import { addNewExpense } from "../../slices/newExpenseSlice";
import { useSnackbar } from "notistack";

function NewExpenseForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [newExpense, setNewExpense] = React.useState({
    id: "",
    name: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [id.split('-')[1]]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = window.confirm("Do you want to add new expense ?");
    if (flag) {
      const expenseWithId = {
        ...newExpense,
        id: newExpense.name,
      };
      console.log(expenseWithId);
      dispatch(addNewExpense(expenseWithId));
      setNewExpense({
        id: "",
        name: "",
        amount: "",
        category: "",
      });
      enqueueSnackbar("Expense added successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000, // Optional: to control how long the notification shows
        style: { zIndex: 9999 } // Ensures it's on top of other elements
      });
    }
  };
  return (
    <div className={Style.expense_form}>
      <div className={Style.formWrapper}>
        <h2 className="title">New Expense Form</h2>
        <form id="expense-form1" class={Style.expense_form1} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="expense-name">Expense Name:</label>
            <input
              type="text"
              id="expense-name"
              value={newExpense.name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="category-select" style={{ marginLeft: "1rem" }}>
              Select category:
            </label>
            <select
              id="select-category"
              value={newExpense.category}
              onChange={(e) => handleChange(e)}
            >
              <option value="">--select--</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="expense-amount">Expense Amount:</label>
            <input
              type="number"
              id="expense-amount"
              value={newExpense.amount}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewExpenseForm;

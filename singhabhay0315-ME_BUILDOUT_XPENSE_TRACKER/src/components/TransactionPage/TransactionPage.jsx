import React from "react";
import Style from "./TransactionPage.module.css";
import FilterComponent from "../FiltersComponents/FilterComponent";
import NewExpenseForm from "../NewExpenseForm/NewExpenseForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TransactionPage() {
  const trackerData = useSelector((state) => state.newTrackerSlice.trackerData);
  const expenses = useSelector((state) => state.newExpenseSlice.expenseData);
  console.log(trackerData);
  const navigate = useNavigate();

  // Calculate total expense across all categories
  const totalExpense = expenses.reduce((a, b) => a + parseInt(b.amount), 0);

  // Helper function to calculate total expenses by category
  const getTotalByCategory = (category) => {
    if (expenses.length > 0) {
      return expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + parseInt(expense.amount), 0);
    }
  };

  // Calculate expenses for each category
  const foodExpense = getTotalByCategory("Food") ?? 0;
  const travelExpense = getTotalByCategory("Travel") ?? 0;
  const entertainmentExpense = getTotalByCategory("Entertainment") ?? 0;
  const otherExpense = getTotalByCategory("Other") ?? 0;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h2>{trackerData.name}'s Monthly Expenditure</h2>
        <button id={Style.new_update} onClick={handleClick}>
          New/Update tracker
        </button>
      </div>

      <div className={Style.category}>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Limit Status</th>
              <th>Budget</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* All Categories */}
            <tr>
              <td>All</td>
              <td>
                {trackerData.monthlyBudget - totalExpense >= 0 ? (
                  <button className={Style.statusBtn}>within</button>
                ) : (
                  <button className={Style.statusBtnWarn}>exceed</button>
                )}
              </td>
              <td>{trackerData.monthlyBudget}</td>
              <td>{totalExpense}</td>
              <td>{trackerData.monthlyBudget - totalExpense}</td>
            </tr>

            {/* Food Category */}
            <tr>
              <td>Food</td>
              <td>
                {(trackerData.category.Food - foodExpense ?? 0) >= 0 ? (
                  <button className={Style.statusBtn}>within</button>
                ) : (
                  <button className={Style.statusBtnWarn}>exceed</button>
                )}
              </td>
              <td>{trackerData.category.Food}</td>
              <td>{foodExpense}</td>
              <td>{trackerData.category.Food - foodExpense}</td>
            </tr>

            {/* Travel Category */}
            <tr>
              <td>Travel</td>
              <td>
                {trackerData.category.Travel - travelExpense >= 0 ? (
                  <button className={Style.statusBtn}>within</button>
                ) : (
                  <button className={Style.statusBtnWarn}>exceed</button>
                )}
              </td>
              <td>{trackerData.category.Travel}</td>
              <td>{travelExpense}</td>
              <td>{trackerData.category.Travel - travelExpense}</td>
            </tr>

            {/* Entertainment Category */}
            <tr>
              <td>Entertainment</td>
              <td>
                {trackerData.category.Entertainment - entertainmentExpense >=
                0 ? (
                  <button className={Style.statusBtn}>within</button>
                ) : (
                  <button className={Style.statusBtnWarn}>exceed</button>
                )}
              </td>
              <td>{trackerData.category.Entertainment}</td>
              <td>{entertainmentExpense}</td>
              <td>
                {trackerData.category.Entertainment - entertainmentExpense}
              </td>
            </tr>

            {/* Other Category */}

            <tr>
              <td>Others</td>
              <td>
                {trackerData.category.Other - otherExpense >= 0 ? (
                  <button className={Style.statusBtn}>within</button>
                ) : (
                  <button className={Style.statusBtnWarn}>exceed</button>
                )}
              </td>
              <td>{parseInt(trackerData.monthlyBudget) - (parseInt(trackerData.category.Entertainment)+parseInt(trackerData.category.Travel)+parseInt(trackerData.category.Food))}</td>
              <td>{otherExpense}</td>
              <td>{parseInt(trackerData.monthlyBudget) - (parseInt(trackerData.category.Entertainment)+parseInt(trackerData.category.Travel)+parseInt(trackerData.category.Food)) - otherExpense}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* New expense Form */}
      <NewExpenseForm />
      {/* Filter component */}
      <FilterComponent />
    </div>
  );
}

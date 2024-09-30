import React, { useEffect } from "react";
import Style from "./FilterComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changePreference } from "../../slices/preferenceSlice";
import { deleteExpense } from "../../slices/newExpenseSlice";

function FilterComponent() {
  const expenses = useSelector((state) => state.newExpenseSlice.expenseData);
  const preference = useSelector((state) => state.preferenceSlice.preference);
  const [filteredData, setFilteredData] = React.useState(expenses);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleClick = (e) => {
    const { id } = e.target;
    dispatch(changePreference(id));
  };

  useEffect(() => {
    if (preference === "All") {
      setFilteredData(expenses);
    } else {
      setFilteredData(expenses.filter((data) => data.category === preference));
    }
  }, [expenses, preference]);

  return (
    <div className={Style.filtersWrapper}>
      <div className={Style.filterPills}>
        <h2>Filters:</h2>
        <button
          id="All"
          onClick={handleClick}
          className={preference === "All" ? Style.selected : ""}
        >
          All
        </button>
        <button
          id="Food"
          onClick={handleClick}
          className={preference === "Food" ? Style.selected : ""}
        >
          Food
        </button>
        <button
          id="Travel"
          onClick={handleClick}
          className={preference === "Travel" ? Style.selected : ""}
        >
          Travel
        </button>
        <button
          id="Entertainment"
          onClick={handleClick}
          className={preference === "Entertainment" ? Style.selected : ""}
        >
          Entertainment
        </button>
        <button
          id="Other"
          onClick={handleClick}
          className={preference === "Other" ? Style.selected : ""}
        >
          Others
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((dataObj, ind) => (
            <tr key={dataObj.id}>
              <td>{ind + 1}</td>
              <td>{dataObj.name}</td>
              <td>{dataObj.category}</td>
              <td>Rs {dataObj.amount}</td>
              <td>
                <button onClick={() => handleDelete(dataObj.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FilterComponent;

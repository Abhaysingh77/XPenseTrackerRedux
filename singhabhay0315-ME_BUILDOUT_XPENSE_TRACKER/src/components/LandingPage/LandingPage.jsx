import React from "react";
import { useNavigate } from "react-router-dom"; // Used for programmatic navigation
import Style from "./LandingPage.module.css"; // Custom CSS module for styling
import { useSnackbar } from "notistack"; // Snackbar notifications for success and warning messages
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for state management
import { addNewTracker } from "../../slices/newTrackerSlice"; // Redux action to add new tracker data

export default function ExpenseTrackerForm() {
  // Fetch existing tracker data from Redux store
  const newTracker = useSelector((state) => state.newTrackerSlice.trackerData);
  console.log(newTracker); // Log existing tracker data for debugging

  // Initialize form data state with tracker data from Redux or empty default
  const [formData, setFormData] = React.useState(newTracker);

  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation hook to redirect between pages
  const { enqueueSnackbar } = useSnackbar(); // Snackbar hook for notifications

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    console.log(formData); // Log form data for debugging

    // Calculate total of the category values
    let total = Object.values(formData.category).reduce((a, b) => a + b, 0);
    console.log(total, formData.monthlyBudget); // Log total and budget for debugging

    // Check if the monthly budget is valid and exceeds total category budget
    if (formData.monthlyBudget >= total && formData.monthlyBudget > 0) {
      // Dispatch form data to the Redux store
      dispatch(addNewTracker(formData));

      // Show success message using snackbar
      enqueueSnackbar("Success", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });

      // Navigate to the tracker page
      navigate("/tracker");
    } else {
      // Show warning if category total exceeds monthly budget
      enqueueSnackbar(
        "Total Categorical budget should not exceed monthly budget",
        {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  };

  // Handle input changes for form fields (name and budget)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data and convert numeric values where applicable
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(parseInt(value)) ? value : parseInt(value),
    }));
  };

  // Handle changes for category inputs (Food, Travel, Entertainment)
  const handleCategoryChange = (e) => {
    const { id, value } = e.target;
    console.log(value); // Log category input for debugging

    // Update category values within formData
    setFormData((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        [id]: parseInt(value),
      },
    }));
  };

  // Reset form and tracker data on restart
  const handleRestart = () => {
    let flag = window.confirm(
      "This will delete all your previous transaction?"
    );
    if (flag) {
      // Reset Redux state and local form state
      dispatch(
        addNewTracker({
          name: "",
          monthlyBudget: "",
          category: {
            Food: "",
            Travel: "",
            Entertainment: "",
          },
        })
      );
      setFormData({
        name: "",
        monthlyBudget: "",
        category: {
          Food: "",
          Travel: "",
          Entertainment: "",
        },
      });
    }
  };

  // JSX return with form and layout
  return (
    <div className={Style.container}>
      {/* Page welcome text */}
      <p className="welcome_text" style={{ fontSize: "1.5rem" }}>
        Welcome to your own Expense Tracker
      </p>
      <p className="instruction_text" style={{ fontSize: "1rem" }}>
        Please fill in the below form to start tracking
      </p>

      {/* Expense Tracker Form */}
      <form
        className={Style.expense_form}
        onSubmit={(e) => handleSubmit(e)}
        name="landing-page-form"
      >
        {/* Input for user name */}
        <div className={Style.form_group}>
          <label htmlFor="name">Enter your name:</label>
          <input
            name="name"
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        {/* Input for monthly budget */}
        <div className={Style.form_group}>
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input
            name="monthlyBudget"
            type="number"
            id="budget"
            value={formData.monthlyBudget}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        {/* Inputs for category budgets */}
        <div className={Style.form_group}>
          <p className="category-label">Fill your monthly categorical budget:</p>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Travel</th>
                <th>Entertainment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="number"
                    id="Food"
                    value={formData.category.Food}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id="Travel"
                    value={formData.category.Travel}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id="Entertainment"
                    value={formData.category.Entertainment}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conditional buttons based on whether tracker data exists */}
        {newTracker.name.length ? (
          <div className={Style.updateBtnGrp}>
            <button id="new-update" type="submit">Update tracker</button>
            <button id="clear" type="button" onClick={handleRestart}>
              Start new tracker
            </button>
            <button type="button" onClick={() => navigate("/tracker")}>
              Go back⬅️
            </button>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

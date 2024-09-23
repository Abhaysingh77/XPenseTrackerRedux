import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./LandingPage.module.css";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { addNewTracker } from "../../slices/newTrackerSlice";
export default function ExpenseTrackerForm() {
  const newTracker = useSelector((state) => state.newTrackerSlice.trackerData);
  console.log(newTracker);
  const [formData, setFormData] = React.useState(newTracker);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let total = Object.values(formData.category).reduce((a, b) => a + b, 0);
    console.log(total, formData.monthlyBudget);
    if (formData.monthlyBudget>=total && formData.monthlyBudget>0) {
      dispatch(addNewTracker(formData));
      enqueueSnackbar("Success", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/tracker");
    } else {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(parseInt(value)) ? value : parseInt(value),
    }));
  };

  const handleCategoryChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        [id]: parseInt(value),
      },
    }));
  };

  const handleRestart = () => {
    let flag = window.confirm(
      "This will delete all your previous transaction ?"
    );
    if (flag) {
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
  return (
    <div className={Style.container}>
      <p className="welcome_text" style={{ fontSize: "1.5rem" }}>
        Welcome to your own Expense Tracker
      </p>
      <p className="instruction_text" style={{ fontSize: "1rem" }}>
        Please fill in the below form to start tracking
      </p>

      <form className={Style.expense_form} onSubmit={(e) => handleSubmit(e)} name="landing-page-form">
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
        <div className={Style.form_group}>
          <p className="category-label">
            Fill your monthly categorical budget:
          </p>
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
                    id="food"
                    value={formData.category.Food}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    id="travel"
                    value={formData.category.Travel}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    id="entertainment"
                    value={formData.category.Entertainment}
                    onChange={(e) => handleCategoryChange(e)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {newTracker.name.length ? (
          <div className={Style.updateBtnGrp}>
            <button id="new-update" type="submit">Update tracker</button>
            <button id='clear' type="button" onClick={handleRestart}>
              Start new tracker
            </button>
            <button i type="button" onClick={() => navigate("/tracker")}>
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

import newTrackerReducer, {
  addNewTracker,
} from "../slices/newTrackerSlice";

describe("newTracker slice reducers", () => {
  const initialState = {
    trackerData: {
      name: "",
      monthlyBudget: "",
      category: {
        Food: "",
        Travel: "",
        Entertainment: "",
        Other: "",
      },
    },
  };

  it("should handle addNewTracker", () => {
    const action = addNewTracker({
      name: "Monthly Budget Tracker",
      monthlyBudget: 2000,
      category: {
        Food: 500,
        Travel: 300,
        Entertainment: 200,
        Other: 100,
      },
    });
    const newState = newTrackerReducer(initialState, action);
    expect(newState.trackerData).toEqual({
      name: "Monthly Budget Tracker",
      monthlyBudget: 2000,
      category: {
        Food: 500,
        Travel: 300,
        Entertainment: 200,
        Other: 100,
      },
    });
  });
});

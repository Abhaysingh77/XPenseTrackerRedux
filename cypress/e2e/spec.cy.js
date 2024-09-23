import store from "../../src/expenseStore";

describe("LandingPageForm Initial State Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8082/");
  });

  it("should display initial state correctly", () => {
    cy.window()
      .then((win) => {
        console.log(win.store); // Log the store to the console for debugging
        expect(win.store).to.exist; // Ensure the store exists
        return win.store.getState();
      })
      .then((state) => {
        expect(state.newTrackerSlice.trackerData.name).to.equal("");
        expect(state.newTrackerSlice.trackerData.monthlyBudget).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Food).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Travel).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Entertainment).to.equal("");
      });
  });

  it("should update the state and navigate on form submission", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { Food: 300, Travel: 200, Entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.Food);
    cy.get("input#travel").type(newCategoricalBudget.Travel);
    cy.get("input#entertainment").type(newCategoricalBudget.Entertainment);

    cy.get("form").submit();

    // Wait for navigation to complete and check if we're on the tracker page
    cy.url().should("include", "/tracker");

    // Log the state after submission for debugging
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        console.log(state); // Log the state for inspection
        expect(state.newTrackerSlice.trackerData.name).to.equal(newUserName);
        expect(state.newTrackerSlice.trackerData.monthlyBudget).to.equal(newMonthlyBudget);
        expect(state.newTrackerSlice.trackerData.category.Food).to.equal(newCategoricalBudget.Food);
        expect(state.newTrackerSlice.trackerData.category.Travel).to.equal(newCategoricalBudget.Travel);
        expect(state.newTrackerSlice.trackerData.category.Entertainment).to.equal(newCategoricalBudget.Entertainment);
        expect(state.newTrackerSlice.trackerData.category.Other).to.equal(
          newMonthlyBudget - (newCategoricalBudget.Food + newCategoricalBudget.Travel + newCategoricalBudget.Entertainment)
        );
      });
  });

  it("should reset transactions and form data", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { Food: 300, Travel: 200, Entertainment: 100 };

    // Fill in the form
    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);
    cy.get("input#food").type(newCategoricalBudget.Food);
    cy.get("input#travel").type(newCategoricalBudget.Travel);
    cy.get("input#entertainment").type(newCategoricalBudget.Entertainment);
    cy.get("form").submit();

    // Trigger reset
    cy.get("#new-update").click();
    cy.get("#clear").click();

    cy.on("window:confirm", () => true);

    cy.window()
      .its("store")
      .invoke("getState")
      .should((state) => {
        expect(state.newTrackerSlice.trackerData.name).to.equal("");
        expect(state.newTrackerSlice.trackerData.monthlyBudget).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Food).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Travel).to.equal("");
        expect(state.newTrackerSlice.trackerData.category.Entertainment).to.equal("");
      });

    cy.get("input#name").should("have.value", "");
    cy.get("input#budget").should("have.value", "");
    cy.get("input#food").should("have.value", "");
    cy.get("input#travel").should("have.value", "");
    cy.get("input#entertainment").should("have.value", "");
  });
});

describe("ExpenseForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8082/"); // Ensure this matches the landing page
  });

  it("should render the form", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { Food: 300, Travel: 200, Entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.Food);
    cy.get("input#travel").type(newCategoricalBudget.Travel);
    cy.get("input#entertainment").type(newCategoricalBudget.Entertainment);

    cy.get("form").submit();

    // Wait for navigation to the expense form
    cy.url().should("include", "/tracker");

    cy.window()
      .then((win) => {
        return win.store.getState();
      })
      .then((state) => {
        expect(state.newTrackerSlice.trackerData.name).to.equal(newUserName);
        expect(state.newTrackerSlice.trackerData.monthlyBudget).to.equal(newMonthlyBudget);
        expect(state.newTrackerSlice.trackerData.category.Food).to.equal(newCategoricalBudget.Food);
        expect(state.newTrackerSlice.trackerData.category.Travel).to.equal(newCategoricalBudget.Travel);
        expect(state.newTrackerSlice.trackerData.category.Entertainment).to.equal(newCategoricalBudget.Entertainment);
        expect(state.newTrackerSlice.trackerData.category.Other).to.equal(
          newMonthlyBudget - (newCategoricalBudget.Food + newCategoricalBudget.Travel + newCategoricalBudget.Entertainment)
        );
      });

    // Check for form existence
    cy.get(".expense_form").should("exist"); 
    cy.get("div.title").contains("New Expense Form");
    cy.get("label[for='expense-name']").contains("Expense Name:");
    cy.get("label[for='category-select']").contains("Select category:");
    cy.get("label[for='expense-amount']").contains("Expense Amount:");
    cy.get("button[type='submit']").contains("Submit");
  });

  it("should handle form submission and update state", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { Food: 300, Travel: 200, Entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.Food);
    cy.get("input#travel").type(newCategoricalBudget.Travel);
    cy.get("input#entertainment").type(newCategoricalBudget.Entertainment);

    cy.get("form").submit();

    cy.url().should("include", "/tracker");

    const newExpenseName = "Groceries";
    const newExpenseAmount = 100;
    const newExpenseCategory = "Food"; // Ensure category matches the case used in the input

    cy.get("input#expense-name").type(newExpenseName);
    cy.get("select#category-select").select(newExpenseCategory);
    cy.get("input#expense-amount").type(newExpenseAmount);

    cy.get("form").submit();

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        expect(state.expense.totalExpense).to.equal(newExpenseAmount);
        expect(state.expense.categoricalExpense.Food).to.equal(newExpenseAmount);

        expect(state.transactions.transactionList.length).to.equal(1);
        expect(state.transactions.transactionList[0]).to.deep.include({
          name: newExpenseName,
          amount: newExpenseAmount,
          category: newExpenseCategory,
        });
      });

    // Check that form inputs are cleared after submission
    cy.get("input#expense-name").should("have.value", "");
    cy.get("select#category-select").should("have.value", "");
    cy.get("input#expense-amount").should("have.value", "");
  });
});

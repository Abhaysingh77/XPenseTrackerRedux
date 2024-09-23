import { reducerMapping } from "./slices";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: reducerMapping,
});
console.log(store);
export default store;

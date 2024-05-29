// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";

console.log("Counter Reducer:", counterReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

console.log("Store:", store.getState());

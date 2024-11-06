// store.js
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../slices/quizSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;

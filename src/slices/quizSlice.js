// quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  correctAnswers: {},
  userAnswers: {},
  showReview: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCorrectAnswers: (state, action) => {
      state.correctAnswers = action.payload;
    },
    selectAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
    toggleReview: (state) => {
      state.showReview = !state.showReview;
    },
  },
});

export const { setQuestions, setCorrectAnswers, selectAnswer, toggleReview } =
  quizSlice.actions;
export default quizSlice.reducer;

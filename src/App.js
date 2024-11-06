import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Quiz from "./components/Quiz";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import CheckAnswers from "./components/CheckAnswers";
import Review from "./components/Review";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/review" element={<CheckAnswers />} />
          <Route path="/SubmitReview" element={<Review />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

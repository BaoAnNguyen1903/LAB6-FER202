import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  setCorrectAnswers,
  selectAnswer,
} from "../slices/quizSlice";
import CheckAnswers from "./CheckAnswers";
import Review from "./Review";

const Quiz = () => {
  const questions = useSelector((state) => state.quiz.questions);
  const selectedAnswers = useSelector((state) => state.quiz.userAnswers);
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showReview, setShowReview] = useState(false); // New state for review

  useEffect(() => {
    // Initialize questions and correct answers once when the component mounts
    dispatch(
      setQuestions([
        {
          id: 1,
          text: "Inside which HTML element do we put the JavaScript?",
          options: ["javascript", "scripting", "script", "js"],
        },
        {
          id: 2,
          text: "What is the correct syntax to refer to an external script called 'script.js'?",
          options: [
            "<script src='script.js'>",
            "<script href='script.js'>",
            "<script ref='script.js'>",
            "<script name='script.js'>",
          ],
        },
        {
          id: 3,
          text: "Which of the following is used to create a function in JavaScript?",
          options: [
            "function myFunction()",
            "def myFunction()",
            "create myFunction()",
            "fn myFunction()",
          ],
        },
        {
          id: 4,
          text: "How can you add a comment in JavaScript?",
          options: [
            "<!-- This is a comment -->",
            "// This is a comment",
            "' This is a comment",
            "# This is a comment",
          ],
        },
        {
          id: 5,
          text: "How do you round the number 7.25 to the nearest integer?",
          options: [
            "Math.rnd(7.25)",
            "Math.round(7.25)",
            "round(7.25)",
            "rnd(7.25)",
          ],
        },
        {
          id: 6,
          text: "Which event occurs when a user clicks on an HTML element?",
          options: ["onmouseover", "onchange", "onmouseclick", "onclick"],
        },
        {
          id: 7,
          text: "How do you declare a JavaScript variable?",
          options: [
            "var myVar;",
            "variable myVar;",
            "v myVar;",
            "declare myVar;",
          ],
        },
        {
          id: 8,
          text: "Which operator is used to assign a value to a variable?",
          options: ["*", "-", "=", "x"],
        },
        {
          id: 9,
          text: "What will the following code return: Boolean(10 > 9)?",
          options: ["true", "false", "NaN", "undefined"],
        },
        {
          id: 10,
          text: "How do you write 'Hello World' in an alert box?",
          options: [
            "msgBox('Hello World');",
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
          ],
        },
        {
          id: 11,
          text: "How does a WHILE loop start?",
          options: [
            "while (i <= 10; i++)",
            "while (i <= 10)",
            "while i = 1 to 10",
            "while (i++ <= 10)",
          ],
        },
        {
          id: 12,
          text: "How does a FOR loop start?",
          options: [
            "for (i = 0; i <= 5)",
            "for i = 1 to 5",
            "for (i <= 5; i++)",
            "for (i = 0; i <= 5; i++)",
          ],
        },
      ])
    );

    dispatch(
      setCorrectAnswers({
        1: "script",
        2: "<script src='script.js'>",
        3: "function myFunction()",
        4: "// This is a comment",
        5: "Math.round(7.25)",
        6: "onclick",
        7: "var myVar;",
        8: "=",
        9: "true",
        10: "alert('Hello World');",
        11: "while (i <= 10)",
        12: "for (i = 0; i <= 5; i++)",
      })
    );
  }, [dispatch]);

  const handleAnswerSelect = (answer) => {
    const questionId = questions[currentQuestionIndex]?.id;
    if (questionId) {
      dispatch(selectAnswer({ questionId, answer }));
    }
  };

  const navigateQuestion = (direction) => {
    if (direction === "next" && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    setShowReview(true); // Show the review component after submission
  };

  const resetQuiz = () => {
    setShowSummary(false);
    setShowReview(false);
    setCurrentQuestionIndex(0);
    // You might also want to reset selected answers in the redux store if needed
  };

  // Generate answers array for CheckAnswers component
  const answers = questions.map((question) => ({
    isAnswered: selectedAnswers[question.id] !== undefined,
  }));

  // Conditionally render the Review, CheckAnswers component, or the main quiz view
  if (showReview) {
    return <Review onRetakeQuiz={resetQuiz} />;
  }

  if (showSummary) {
    return <CheckAnswers answers={answers} onRetakeQuiz={resetQuiz} />;
  }

  // Main quiz view
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>JavaScript Quiz</h1>
      </header>
      {questions[currentQuestionIndex] && (
        <div className="question-container">
          <h3 className="question-text">{`Q${currentQuestionIndex + 1}. ${
            questions[currentQuestionIndex].text
          }`}</h3>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`option ${
                  selectedAnswers[questions[currentQuestionIndex].id] === option
                    ? "selected"
                    : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={() => setCurrentQuestionIndex(0)}>First</button>
        <button
          onClick={() => navigateQuestion("prev")}
          disabled={currentQuestionIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={() => navigateQuestion("next")}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        <button onClick={() => setCurrentQuestionIndex(questions.length - 1)}>
          Last
        </button>
      </div>

      <div className="action-buttons">
        <button onClick={submitQuiz} className="submit-button">
          Submit
        </button>
        <button
          onClick={() => setShowSummary(true)}
          className="check-answer-status-button submit-button"
        >
          Check Answers
        </button>
      </div>
    </div>
  );
};

export default Quiz;

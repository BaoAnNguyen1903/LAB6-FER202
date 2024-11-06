import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import "./QuizReview.css";

const QuizReview = ({ onRetakeQuiz }) => {
  const questions = useSelector((state) => state.quiz.questions);
  const selectedAnswers = useSelector((state) => state.quiz.userAnswers);
  const correctAnswers = useSelector((state) => state.quiz.correctAnswers);

  return (
    <div className="review-container">
      <header className="review-header">
        <h1>Quiz Review</h1>
      </header>
      {questions.map((question, index) => {
        const userAnswer = selectedAnswers[question.id];
        const isCorrect = userAnswer === correctAnswers[question.id];
        const isAnswered = userAnswer !== undefined;

        return (
          <div
            key={question.id}
            className={`review-question ${
              isAnswered && isCorrect ? "correct" : "incorrect"
            }`}
          >
            <p className="question-text">
              <strong>{`Q${index + 1}. ${question.text}`}</strong>
            </p>
            <div className="options">
              {question.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`option ${
                    option === userAnswer
                      ? option === correctAnswers[question.id]
                        ? "correct"
                        : "incorrect"
                      : option === correctAnswers[question.id]
                      ? "correct-answer"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={option === userAnswer}
                    readOnly
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <p className="correct-answer-text">
              Right answer is: <strong>{correctAnswers[question.id]}</strong>
            </p>
          </div>
        );
      })}
      <div className="text-center mt-3">
        <Button color="primary" onClick={onRetakeQuiz}>
          Back to Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizReview;

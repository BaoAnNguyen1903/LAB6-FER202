import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

const CheckAnswers = ({ answers, onRetakeQuiz }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center bg-dark text-white py-3">Quiz Review</h2>
      <Row className="justify-content-center">
        {answers && answers.length > 0 ? (
          answers.map((answer, index) => (
            <Col key={index} sm="6" md="4" lg="2" className="mb-3">
              <Card
                className="h-100 border-0"
                style={{
                  backgroundColor: answer.isAnswered ? "#d1e7dd" : "#f8d7da",
                  color: answer.isAnswered ? "#155724" : "#721c24",
                }}
              >
                <CardBody className="text-center">
                  <CardTitle tag="h6">Question No {index + 1}</CardTitle>
                  <p
                    className={
                      answer.isAnswered ? "text-success" : "text-danger"
                    }
                  >
                    {answer.isAnswered ? "Answered" : "Unanswered"}
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center mt-4">No answers available to review.</p>
        )}
      </Row>
      <div className="text-center mt-3">
        <Button color="primary" onClick={onRetakeQuiz}>
          Back to Quiz
        </Button>
      </div>
    </Container>
  );
};

CheckAnswers.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      isAnswered: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRetakeQuiz: PropTypes.func.isRequired,
};

export default CheckAnswers;

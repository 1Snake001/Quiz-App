import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = ({
  questions,
  setQuestions,
  randomQuestion,
  setRandomQuestion,
  getRandomQuestion,
  points,
  setPoints,
}) => {
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [enableAnswers, setEnableAnswers] = useState(true);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setEnableAnswers(false);
    if (answer.is_correct) {
      setPoints((prev) => prev + 1);
    }

    setTimeout(() => {
      setQuestions(
        questions.filter((question) => question.id !== randomQuestion.id)
      );
      setRandomQuestion("");
      setSelectedAnswer(null);
      getRandomQuestion();
      setEnableAnswers(true);
    }, 3000);
  };

  function handleQuestionAttraction() {
    navigate(`/questions`);
  }

  return (
    <div className="container">
      <div className="score">
        {questions.length !== 0 ? <h3>PONTSZÁM: {points}</h3> : null}
      </div>
      <div className="questions-number">
        {questions.length !== 0 ? (
          <h3 className="question-lenght">{questions.length} Kérdés maradt hátra!</h3>
        ) : null}
      </div>
      <div className="secondary-container">
        {questions.length !== 0 ? (
          <p>{randomQuestion && randomQuestion.question}</p>
        ) : (
          <h1 className="final-score">
            {" "}
            Köszönjük a játékot!
            <br />
            Az ön pontszáma: {points}
          </h1>
        )}
        {randomQuestion &&
          randomQuestion.answers.map((answer) => (
            <div
              className={`p-3 mb-2 ${
                enableAnswers ? "answer" : "disabled-answer"
              } ${
                selectedAnswer === answer
                  ? answer.is_correct
                    ? "bg-success"
                    : "bg-danger"
                  : "bg-primary"
              } text-white  `}
              key={answer.answer}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer.answer}
            </div>
          ))}
      </div>
      <div>
        <button
          type="button"
          onClick={handleQuestionAttraction}
          className={`btn text-primary ${
            questions.length !== 0 ? "disabled-link" : ""
          }`}
        >
          Kérdések szerkesztése
        </button>
      </div>
    </div>
  );
};

export default Questions;

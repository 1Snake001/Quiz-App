import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


const Questions = ({questions, setQuestions}) => {
  const [randomQuestion, setRandomQuestion] = useState("");

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [enableAnswers, setEnableAnswers] = useState(true);
  const [points, setPoints] = useState(0);

  const navigate = useNavigate();



  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    setRandomQuestion(randomQuestion);
  };
  
  useEffect(() => {
    getRandomQuestion();
  }, [questions]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setEnableAnswers(false);
    if (answer.is_correct) {
      setPoints((prev) => prev + 1);
    }

console.log(questions);
    // Wait for 3 seconds and generate a new question
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

console.log(questions.length);
  return (
    <div className="container">
      <div className="score">{questions.length !== 0 ? <h3>PONTSZÁM: {points}</h3> : null}</div>
      <div className="secondary-container">
        {questions.length !== 0 ? (
          <p>{randomQuestion && randomQuestion.question}</p>
        ) : (
          <h1>
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
        <button type="button"   onClick={handleQuestionAttraction} className ={ `btn text-primary ${questions.length !== 0 ? 'disabled-link': ''}`}  >Kérdések szerkesztése</button>
      </div>
    </div>
  );
};

export default Questions;

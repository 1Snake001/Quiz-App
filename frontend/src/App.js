import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateQuestions from "./components/CreateQuestions";
import Qustions from "./components/Questions";
import questionServices from "./services/Services";
import React, { useEffect as _useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState("");
  const [points, setPoints] = useState(0);

  const getAllQuestions = async () => {
    let data = await questionServices.getQuestions();
    let questions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setQuestions(questions);
  };

  _useEffect(() => {
    getAllQuestions();
  }, []);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    setRandomQuestion(randomQuestion);
  };

  _useEffect(() => {
    getRandomQuestion();
  }, [questions, randomQuestion]);

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Qustions
                questions={questions}
                setQuestions={setQuestions}
                getRandomQuestion={getRandomQuestion}
                points={points}
                setRandomQuestion={setRandomQuestion}
                setPoints={setPoints}
                randomQuestion={randomQuestion}
              />
            }
          />
          <Route
            path={"/questions"}
            element={
              <CreateQuestions
                questions={questions}
                getAllQuestions={getAllQuestions}
              />
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

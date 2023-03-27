import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateQuestions from './components/CreateQuestions';
import Qustions from './components/Questions';
import questionServices from "./services/Services";
import React, { useEffect, useState } from "react";


function App() {
  const [questions, setQuestions] = useState([]);
  const getAllQuestions = async () => {
    let data = await questionServices.getQuestions();
    let questions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setQuestions(questions);
  };
  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <main>
    <Router>
      <Routes>
        <Route path="/" element={<Qustions questions={questions} setQuestions={setQuestions}/>} />
        <Route
          path={"/questions"}
          element={<CreateQuestions questions={questions} getAllQuestions={getAllQuestions}/>}
        />
      </Routes>
    </Router>
  </main>
  );
}

export default App;

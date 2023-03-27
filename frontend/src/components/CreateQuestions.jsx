import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import qustionServices from "../services/Services";
import Input from "./Input";
import Radio from "./Radio";

const CreateQuestions = ({ questions, getAllQuestions }) => {
  useEffect(() => {
    getAllQuestions();
  }, []);

  const [fieldValues, setFieldValues] = useState({
    question: "",
    firstAnswer: "",
    secondAnswer: "", 
    thirdAnswer: "",
    fourthAnswer: "",
  });
  const navigate = useNavigate();

  const checkbox1 = useRef();
  const checkbox2 = useRef();
  const checkbox3 = useRef();
  const checkbox4 = useRef();

  const [checkedChekboxes, setcheckedChekboxes] = useState({
    firstAnswer: false,
    secondAnswer: false,
    thirdAnswer: false,
    fourthAnswer: false,
  });

  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    setcheckedChekboxes({
      firstAnswer: checkbox1.current.checked,
      secondAnswer: checkbox2.current.checked,
      thirdAnswer: checkbox3.current.checked,
      fourthAnswer: checkbox4.current.checked,
    });
  }, [selectedValue]);

  const deleteHandler = async (id) => {
    await qustionServices.deleteAttraction(id);
  await  getAllQuestions();
  };

  function handleQuestionAttraction() {
    navigate(`/`);
  }

  const onchangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const checkValidator = () => {
    let isChecked = Object.values(checkedChekboxes).includes(true);
    return isChecked;
  };

  const inputValidator = () => {
    let isEmpty = Object.values(fieldValues).includes("");
    if (isEmpty) return false;
    else return true;
  };

  const [isEveryInputsValid, setIsEveryInputValid] = useState(true);

  async function  resetValues() {

    setFieldValues({
      question: "",
      firstAnswer: "",
      secondAnswer: "",
      thirdAnswer: "",
      fourthAnswer: "",
    });

    setSelectedValue("");

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(checkValidator());
    console.log(inputValidator());
    let isValidInputs = inputValidator();
    let isValidCheckBoxes = checkValidator();

    if (isValidInputs && isValidCheckBoxes) {
      console.log("a mezők kitöltve");
      setIsEveryInputValid(true);
    
      await qustionServices.addQuestion( {
        question: fieldValues.question,
        answers: [
          {
            answer: fieldValues.firstAnswer,
            is_correct: checkedChekboxes.firstAnswer,
          },
          {
            answer: fieldValues.secondAnswer,
            is_correct: checkedChekboxes.secondAnswer,
          },
          {
            answer: fieldValues.thirdAnswer,
            is_correct: checkedChekboxes.thirdAnswer,
          },
          {
            answer: fieldValues.fourthAnswer,
            is_correct: checkedChekboxes.fourthAnswer,
          },
        ],
      });
       await getAllQuestions();
      await resetValues();
    } else {
      setIsEveryInputValid(false);
      console.log("a mezők üresek");
    }
  };


  return (
    <div className="container">
      <table className="table table-striped table-bordered">
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.question}</td>
              <td>
                <button
                  onClick={() => deleteHandler(question.id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          onClick={handleQuestionAttraction}
          className="btn text-primary"
        >
          Vissza a játékhoz
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={onchangeHandler}
          fieldValue={fieldValues.question}
          placeholder="Ide írd a kérdést"
          name="question"
          className="form-control"
        />
        <div className="inputs">
          <Input
            onChange={onchangeHandler}
            fieldValue={fieldValues.firstAnswer}
            labelText="#1"
            placeholder="Ide írd a választ"
            name="firstAnswer"
            className="form-control"
          />
          <Radio
            name="option"
            value="option1"
            checked={selectedValue === "option1"}
            labelText="Option 1"
            onChange={handleRadioChange}
            className="input"
            Ref={checkbox1}
          />
        </div>
        <div className="inputs">
          <Input
            onChange={onchangeHandler}
            fieldValue={fieldValues.secondAnswer}
            labelText="#2"
            placeholder="Ide írd a választ"
            name="secondAnswer"
            className="form-control"
          />
          <Radio
            name="option"
            value="option2"
            checked={selectedValue === "option2"}
            labelText="Option 2"
            onChange={handleRadioChange}
            className="input"
            Ref={checkbox2}
          />
        </div>
        <div className="inputs">
          <Input
            onChange={onchangeHandler}
            fieldValue={fieldValues.thirdAnswer}
            labelText="#3"
            placeholder="Ide írd a választ"
            name="thirdAnswer"
            className="form-control"
          />
          <Radio
            name="option"
            value="option3"
            checked={selectedValue === "option3"}
            labelText="Option 3"
            onChange={handleRadioChange}
            className="input"
            Ref={checkbox3}
          />
        </div>
        <div className="inputs">
          <Input
            onChange={onchangeHandler}
            fieldValue={fieldValues.fourthAnswer}
            labelText="#4"
            placeholder="Ide írd a választ"
            name="fourthAnswer"
            className="form-control"
          />
          <Radio
            name="option"
            value="option4"
            checked={selectedValue === "option4"}
            labelText="Option 4"
            onChange={handleRadioChange}
            className="input"
            Ref={checkbox4}
          />
          {!isEveryInputsValid && (
            <div>
              <h2 className="validation">Összes mező kitöltése kötelező!!!</h2>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Küldés
        </button>
      </form>
    </div>
  );
};

export default CreateQuestions;

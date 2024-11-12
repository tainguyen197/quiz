import { useState, useMemo } from "react";
import { getQuestionList } from "../../apis/getQuestionList";
import {
  getPartQuestion,
  getPartAnswer,
  getCorrectAnswerByPart,
} from "../../containers/Homepage/getListQuestion";

import "./styles.scss";
import ResultSubCard from "./ResultSubCard";
import Part6 from "./Part6";
import Part7 from "./Part7";
import Part4 from "./Part4";
import Part3 from "./Part3";

const mainPart = "PART5";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const quiz = getQuestionList() as any;
  const questions123 = useMemo(
    () => getPartQuestion(mainPart, true),
    []
  ) as any;
  const answer123 = useMemo(() => getPartAnswer(mainPart), []) as any;
  const correctAnswer123 = useMemo(
    () => getCorrectAnswerByPart(mainPart),
    []
  ) as any;

  // const { questions } = quiz;
  // const { question, choices, correctAnswer } = questions[activeQuestion];

  const { content, testAnswer, code } = questions123[activeQuestion];

  const haha = questions123.map((item) => item.code);

  // console.log("listFiveQuestion", haha.sort());

  const onClickNext = () => {
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions123.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === 1) {
      setSelectedAnswer(true as any);
    } else {
      setSelectedAnswer(false as any);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const part5 = (
    <div>
      <div>
        <span className="active-question-no">
          {addLeadingZero(activeQuestion + 1)}
        </span>
        <span className="total-question">
          /{addLeadingZero(Object.keys(answer123).length)}
        </span>
      </div>
      <p>{code}</p>
      <h4>{content}</h4>
      <ul>
        {testAnswer.map((answer, index) => (
          <li
            onClick={() => onAnswerSelected(answer, index)}
            key={index}
            className={selectedAnswerIndex === index ? "selected-answer" : null}
          >
            {answer.id}. {answer.content}
          </li>
        ))}
      </ul>
      {showHint && (
        <>
          <p>Selected Answers: {answer123[code]} </p>
          <p>
            <b>Correct Answers : </b>
            {correctAnswer123[code]?.id} - {correctAnswer123[code]?.content}{" "}
          </p>
        </>
      )}
      <div className="flex-right">
        <button
          style={{ background: "#42bd33" }}
          onClick={() => setShowHint(true)}
        >
          Check Answser
        </button>

        <button onClick={onClickNext}>
          {activeQuestion === questions123.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {!showResult ? (
        <div className="quiz-container">{<Part7 />}</div>
      ) : (
        <div className="result">
          <ResultSubCard />
        </div>
      )}
    </>
  );
};

export default Quiz;

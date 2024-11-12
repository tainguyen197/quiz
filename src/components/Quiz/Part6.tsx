import { useState, useMemo } from "react";
import { getQuestionList } from "../../apis/getQuestionList";
import {
  getPartQuestion,
  getPartAnswer,
  getCorrectAnswerByPart,
} from "../../containers/Homepage/getListQuestion";

import "./styles.scss";
import ResultSubCard from "./ResultSubCard";

const mainPart = "PART6";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const questions123 = useMemo(() => getPartQuestion(mainPart), []) as any;
  const answer123 = useMemo(() => getPartAnswer(mainPart), []) as any;
  const correctAnswer123 = useMemo(
    () => getCorrectAnswerByPart(mainPart),
    []
  ) as any;
  // const { questions } = quiz;
  // const { question, choices, correctAnswer } = questions[activeQuestion];

  const { content, code } = questions123[activeQuestion];
  const listFiveQuestion = questions123.slice(
    activeQuestion,
    activeQuestion + 5
  );

  console.log(Object.keys(correctAnswer123).length);

  const onClickNext = () => {
    setShowHint(false);
    setSelectedAnswerIndex([]);

    if (activeQuestion !== questions123.length - 1) {
      setActiveQuestion((prev) => prev + 5);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (questionIndex, answerIndex) => {
    const newArr = [...selectedAnswerIndex];
    newArr[questionIndex] = answerIndex;
    console.log("newArr", newArr, answerIndex);
    setSelectedAnswerIndex(newArr);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const part6 = listFiveQuestion.map((question, questionIndex) => {
    return (
      <div key={questionIndex}>
        <b>{question.code}</b>
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
        <ul>
          {question.testAnswer.map((answer, answerIndex) => (
            <li
              onClick={() => onAnswerSelected(questionIndex, answerIndex)}
              key={answerIndex}
              className={
                selectedAnswerIndex[questionIndex] === answerIndex
                  ? "selected-answer"
                  : null
              }
            >
              {answer.id}. {answer.content}
            </li>
          ))}
        </ul>
        {showHint && (
          <>
            <p>Selected Answers: {answer123[question.code]} </p>
            <p>
              <b> Correct Answers</b> : {correctAnswer123[question.code]?.id} -{" "}
              {correctAnswer123[question.code]?.content}{" "}
            </p>
          </>
        )}
      </div>
    );
  });

  return (
    <>
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero((activeQuestion + 5) / 5)}
            </span>
            <span className="total-question">
              /{addLeadingZero(Object.keys(answer123).length) / 5}
            </span>
          </div>
          {part6}
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
      ) : (
        <div className="result">
          <ResultSubCard />
        </div>
      )}
    </>
  );
};

export default Quiz;

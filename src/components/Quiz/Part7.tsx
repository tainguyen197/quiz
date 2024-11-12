import { useState, useMemo, useEffect } from "react";
import { getQuestionList } from "../../apis/getQuestionList";
import {
  getPartQuestion,
  getPartAnswer,
  getCorrectAnswerByPart,
} from "../../containers/Homepage/getListQuestion";

import "./styles.scss";
import ResultSubCard from "./ResultSubCard";

const mainPart = "PART7";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [index, setIndex] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const questions123 = useMemo(
    () => getPartQuestion(mainPart, null),
    []
  ) as any;
  const answer123 = useMemo(() => getPartAnswer(mainPart), []) as any;
  const correctAnswer123 = useMemo(
    () => getCorrectAnswerByPart(mainPart),
    []
  ) as any;
  // const { questions } = quiz;
  // const { question, choices, correctAnswer } = questions[activeQuestion];

  const { content, code } = questions123[activeQuestion];

  const nextQuestionIndex = questions123.findIndex(
    (question, index) => index > activeQuestion && question.type === 9,
    1
  );

  const questionLength = questions123.filter(
    (question, index) => question.type === 9
  ).length;

  const listFiveQuestion = questions123.slice(
    activeQuestion,
    nextQuestionIndex
  );

  const haha = questions123.map((item) => item.code);

  console.log("listFiveQuestion", correctAnswer123);

  const onClickNext = () => {
    setShowHint(false);
    setSelectedAnswerIndex([]);
    setIndex((cur) => cur + 1);

    if (activeQuestion !== questions123.length - 1) {
      setActiveQuestion(nextQuestionIndex);
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
    if (questionIndex === 0) return null;
    return (
      <div key={questionIndex}>
        <p>{question.code}</p>
        <b>{question.content}</b>

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
              <b>Correct Answers</b> : {correctAnswer123[question.code]?.id} -{" "}
              {correctAnswer123[question.code]?.content}{" "}
            </p>
          </>
        )}
      </div>
    );
  });

  useEffect(() => {
    const elm = document.getElementsByTagName("img")[0];

    if (!elm) return null;

    const src = elm.src;

    const newSrc = src.replace(
      "http://localhost:3000/",
      "https://elearning.viettel.vn:8680/elearning.file.api/uploads/"
    );

    elm.setAttribute("src", newSrc);
    elm.setAttribute("style", "width: 100%");
  }, [nextQuestionIndex]);

  return (
    <>
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(index)}</span>
            <span className="total-question">/{questionLength}</span>
          </div>
          <p>{listFiveQuestion[0].code}</p>
          <div
            dangerouslySetInnerHTML={{ __html: listFiveQuestion[0].content }}
          />
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

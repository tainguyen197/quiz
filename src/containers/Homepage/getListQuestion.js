import { data1 } from "./data1.js";
import { data2 } from "./data2.js";
import { data3 } from "./data3.js";
import { data4 } from "./data4.js";
import { data5 } from "./data5.js";
import { data6 } from "./data6.js";
import { data7 } from "./data7.js";
import { data8 } from "./data8.js";
import { data9 } from "./data9.js";
import { data10 } from "./data10.js";
import { data11 } from "./data11.js";
import { data12 } from "./data12.js";
import { data13 } from "./data13.js";
import { data14 } from "./data14.js";
import { data15 } from "./data15.js";
import { data16 } from "./data16.js";
import { data17 } from "./data17.js";
import { data18 } from "./data18.js";
import { data19 } from "./data19.js";
import { data20 } from "./data20.js";
import { data21 } from "./data21.js";
import { data22 } from "./data22.js";
import { data23 } from "./data23.js";

// import {sort  } from 'lodash';

const getListQuestion = (sample) => {
  const { dataTest } = sample;
  return dataTest.map((test) => test.question.code).filter(Boolean);
};

const findMax = (arr) => {
  let max = arr[0];

  arr.forEach((elm) => (elm > max ? (max = elm) : 1));

  return max;
};

const isSameSomeQuestion = (myArray1, myArray2) => {
  const rs = myArray1.concat(
    myArray2.filter((item) => myArray1.indexOf(item) < 0)
  );

  console.log(myArray1.length, myArray2.length, rs.length);
};

const isSameSomeQuestion1 = (myArray1, myArray2) => {
  const listDup = [];
  const rs = myArray1.forEach((elm) => {
    if (myArray2.includes(elm)) {
      listDup.push(elm);
    }
  });

  return listDup;
};

const cal = (data) => {
  const de = getListQuestion(data).sort();

  const max = findMax(de);
  console.log(de);

  return de;
};

const getSpecPart = (part, dataTest) => {
  const rs = [];
  dataTest.forEach(
    (item) =>
      item.question.code &&
      item.question.code.includes(part) &&
      rs.push(item.question)
  );

  return rs;
};
const getPartList = (part, questionList) => {
  const he = [];
  questionList.forEach((questions) => {
    const data = getSpecPart(part, questions.dataTest);
    he.push(data);
  });

  return he;
};

const getSpecPartEx = (part, dataTest) => {
  const rs = [];
  dataTest.forEach(
    (item) =>
      item.question.code &&
      item.question.code.includes(part) &&
      rs.push(item.question.code)
  );

  return rs;
};

const getPartListEx = (part, questionList) => {
  const he = [];
  questionList.forEach((questions) => {
    const data = getSpecPartEx(part, questions.dataTest);
    he.push(data);
  });

  return he;
};

// get single list answer
const getResultList = (part, questionList) => {
  return questionList
    .map((item) => ({ key: item.question.code, value: item.answer }))
    .filter((item) => {
      return item.key !== null && item.key.includes(part);
    });
};

const getAllResultListByPart = (part, list) => {
  const listResultByPart = [];
  list.forEach((data) => {
    const results = getResultList(part, data.dataTest);

    listResultByPart.push(results);
  });

  const newObj = {};
  const sortedObj = {};

  listResultByPart.flat().forEach((t) => {
    if (!newObj[t.key]) newObj[t.key] = t.value;
    else newObj[t.key] = newObj[t.key] + t.value.toString();
  });

  Object.keys(newObj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = newObj[key];
    });

  return sortedObj;
};

const totalData = [
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
  data15,
  data16,
  data17,
  data18,
  data19,
  data20,
  data21,
  data22,
  data23,
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getPartQuestion = (part, shouldSuffer = false) => {
  const partQ = getPartList(part, totalData).flat();

  let seen = {};
  let data = partQ.filter(function (entry) {
    // let previous;

    // Have we seen this label before?
    if (seen.hasOwnProperty(entry.code)) {
      // Yes, grab it and add this data to it
      // previous = seen[entry.label];
      // previous.data.push(entry.data);

      // Don't keep this entry, we've merged it into the previous one
      return false;
    }

    // entry.data probably isn't an array; make it one for consistency
    if (!Array.isArray(entry.data)) {
      entry.data = [entry.data];
    }

    // Remember that we've seen it
    seen[entry.code] = entry;

    // Keep this one, we'll merge any others that match into it
    return true;
  });

  shouldSuffer && shuffleArray(data);

  return data;
};

export const getPartAnswer = (part) => {
  return getAllResultListByPart(part, totalData);
};

export const getCorrectAnswer = (data) => {
  const { dataTest, bookMark } = data;

  if (!bookMark) return null;

  const newData = dataTest.filter(
    (item) => item.questionType !== -1 && item.questionType !== 9
  );

  const newBookMark = bookMark.filter((item) => item.questionType !== -1);

  if (newBookMark.length !== newData.length) {
    window.alert("Length ko bang nhau");
  }

  const listCorrect = newData.map((item, index) => ({
    key: item.question.code,
    value: newBookMark[index].isTrue
      ? item.question.testAnswer.find((ans) => `[${ans.id}]` === item.answer)
      : null,
  }));

  return listCorrect;
};

// getCorrectAnswer(data16);
// getCorrectAnswer(data5);

export const getCorrectAnswerByPart = (part) => {
  const rs = [];
  totalData.forEach((data) => {
    // console.log(getCorrectAnswer(data).forEach((item) => console.log(item)));
    const singleRs = getCorrectAnswer(data);

    const singleRsbyPart =
      singleRs && singleRs.filter((item) => item.key.includes(part));

    singleRsbyPart && rs.push(singleRsbyPart);
  });

  const newObj = {};
  const sortedObj = {};

  rs.flat().forEach((t) => {
    if (!newObj[t.key]) newObj[t.key] = t.value;
    // else newObj[t.key] = newObj[t.key] + t.value.toString();
  });

  Object.keys(newObj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = newObj[key];
    });

  console.log(sortedObj);

  return sortedObj;
};

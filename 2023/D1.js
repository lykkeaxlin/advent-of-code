var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const getCalibrationValues = (array) => {
  const [first, ...rest] = array;
  const last = rest.pop() ?? first;
  return parseInt(first + last);
};

const sumArrayNumbers = (array) =>
  array.reduce((acc, current) => acc + current, 0);

const firstPart = (input) => {
  const numbers = input.map((line) =>
    getCalibrationValues(Array.from(line).filter((x) => !isNaN(x)))
  );

  return sumArrayNumbers(numbers);
};

const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const wordToNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const secondPart = (input) => {
  const wordNumbers = input.map((i) => [...i.matchAll(regex)].map((x) => x[1]));
  const numbers = wordNumbers.map((line) =>
    getCalibrationValues(line.map((x) => wordToNumbers[x] ?? x))
  );

  return sumArrayNumbers(numbers);
};

const input = readFile();

console.log("first: ", firstPart(input));
console.log("second: ", secondPart(input));

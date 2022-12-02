var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const combScore = {
  "A X": 1 + 3,
  "A Y": 2 + 6,
  "A Z": 3 + 0,
  "B X": 1 + 0,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 1 + 6,
  "C Y": 2 + 0,
  "C Z": 3 + 3,
};

const firstPart = (input) => {
  let score = 0;

  input.forEach((x) => {
    score += combScore[x];
  });
  return score;
};

const moves = {
  "A X": 3 + 0,
  "A Y": 1 + 3,
  "A Z": 2 + 6,
  "B X": 1 + 0,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 2 + 0,
  "C Y": 3 + 3,
  "C Z": 1 + 6,
};

const secondPart = (input) => {
  let score = 0;

  input.forEach((x) => {
    score += moves[x];
  });
  return score;
};

const input = readFile();

console.log("first", firstPart(input));
console.log("second", secondPart(input));

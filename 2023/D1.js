import { readFileSync } from "fs";

const test = false;

const readFile = () =>
  readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");

const getValues = (array) => parseInt(array[0] + array[array.length - 1]);

const firstPart = (input) =>
  input
    .map((line) => getValues(Array.from(line).filter((x) => !isNaN(x))))
    .reduce((acc, current) => acc + current, 0);

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

const secondPart = (input) =>
  input
    .map((i) => [...i.matchAll(regex)].map((x) => x[1]))
    .map((line) => getValues(line.map((x) => wordToNumbers[x] ?? x)))
    .reduce((acc, current) => acc + current, 0);

const input = readFile();

console.log("first: ", firstPart(input));
console.log("second: ", secondPart(input));

import { readFileSync } from "fs";

const test = true;

const readFile = () => {
  return readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const firstPart = (input) => {};

const secondPart = (input) => {};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

var fs = require("fs");

const test = true;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const firstPart = (input) => {};

const secondPart = (input) => {};

const input = readFile();

console.log("first");
console.log("second");

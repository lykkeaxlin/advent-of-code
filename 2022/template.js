var fs = require("fs");

const test = true;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const firstPart = (input) => {
  input.forEach((element) => {
    console.log(element);
  });
};

const secondPart = (input) => {};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

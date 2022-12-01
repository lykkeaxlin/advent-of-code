var fs = require("fs");

const readFile = () => {
  //return fs.readFileSync("test.in").toString().split("\n");
  return fs.readFileSync("input.in").toString().split("\n");
};

const firstPart = (input) => {};

const secondPart = (input) => {};

const input = readFile();

console.log("first");
console.log("second");

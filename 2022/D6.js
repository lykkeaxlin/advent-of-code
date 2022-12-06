var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const solve = (input, size) => {
  for (var i = 0; i < input.length; i++) {
    const substring = input.substring(i, i + size);
    if (new Set(substring).size === size) {
      return i + size;
    }
  }
};

const input = readFile();

console.log("first:", solve(input[0], 4));
console.log("second:", solve(input[0], 14));

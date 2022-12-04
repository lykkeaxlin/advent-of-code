var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const isFullyContained = (f1, f2, s1, s2) => {
  return (f1 <= s1 && f2 >= s2) || (f1 >= s1 && f2 <= s2);
};

const firstPart = (input) => {
  let count = 0;

  input.forEach((element) => {
    const split = element.split(",");
    const f1 = parseInt(split[0].split("-")[0]);
    const f2 = parseInt(split[0].split("-")[1]);
    const s1 = parseInt(split[1].split("-")[0]);
    const s2 = parseInt(split[1].split("-")[1]);

    if (isFullyContained(f1, f2, s1, s2)) {
      count++;
    }
  });
  return count;
};

const isOverlapping = (f1, f2, s1, s2) => {
  return (s1 >= f1 && s1 <= f2) || (s1 <= f1 && f1 <= s2);
};

const secondPart = (input) => {
  let count = 0;

  input.forEach((element) => {
    const split = element.split(",");
    const f1 = parseInt(split[0].split("-")[0]);
    const f2 = parseInt(split[0].split("-")[1]);
    const s1 = parseInt(split[1].split("-")[0]);
    const s2 = parseInt(split[1].split("-")[1]);

    if (isOverlapping(f1, f2, s1, s2)) {
      count++;
    }
  });
  return count;
};

const input = readFile();

console.log("first", firstPart(input));
console.log("second", secondPart(input));

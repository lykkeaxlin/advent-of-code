var fs = require("fs");

const test = true;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const calcPriority = (sharedSubstring) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let priority = 0;

  sharedSubstring.forEach((char) => {
    if (alphabet.indexOf(char) !== -1) {
      priority += alphabet.indexOf(char) + 1;
    } else {
      priority += alphabet.toUpperCase().indexOf(char) + 27;
    }
  });
  return priority;
};

const intersection = (first, second) => {
  const intersection = new Set(
    [...first].filter((element) => second.has(element))
  );
  return intersection;
};

const firstPart = (input) => {
  let total = 0;

  input.forEach((line) => {
    const n = line.length;
    const shared = intersection(
      new Set(line.slice(0, n / 2)),
      new Set(line.slice(n / 2, n))
    );
    total += calcPriority(shared);
  });
  return total;
};

const secondPart = (input) => {
  let total = 0;

  for (var i = 0; i < input.length; i += 3) {
    const firstTwo = intersection(new Set(input[i]), new Set(input[i + 1]));
    const shared = intersection(firstTwo, new Set(input[i + 2]));
    total += calcPriority(shared);
  }
  return total;
};

const input = readFile();

console.log("first", firstPart(input));
console.log("second", secondPart(input));

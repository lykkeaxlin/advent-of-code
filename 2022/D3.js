var fs = require("fs");

const test = true;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const calcPriority = (intersection) => {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyz" + "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  let priority = 0;

  intersection.forEach((char) => {
    priority += alphabet.indexOf(char) + 1;
  });
  return priority;
};

const intersection = (first, second) => {
  return new Set([...first].filter((element) => second.has(element)));
};

const firstPart = (input) => {
  let total = 0;

  input.forEach((line) => {
    const n = line.length;
    const intersection = intersection(
      new Set(line.slice(0, n / 2)),
      new Set(line.slice(n / 2, n))
    );
    total += calcPriority(intersection);
  });
  return total;
};

const secondPart = (input) => {
  let total = 0;

  for (var i = 0; i < input.length; i += 3) {
    const firstTwo = intersection(new Set(input[i]), new Set(input[i + 1]));
    const intersection = intersection(firstTwo, new Set(input[i + 2]));
    total += calcPriority(intersection);
  }
  return total;
};

const input = readFile();

console.log("first", firstPart(input));
console.log("second", secondPart(input));

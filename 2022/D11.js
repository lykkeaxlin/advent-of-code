var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const createMonkeys = (input) => {
  const monkyes = [];
  const chunkSize = 7;

  for (let i = 0; i < input.length; i += chunkSize) {
    let monkey = {};
    const chunk = input.slice(i, i + chunkSize);
    monkey.startingItems = chunk[1].split(":")[1].split(",").map(Number);
    monkey.op = chunk[2].split(" ")[6];
    monkey.opVal = chunk[2].split(" ").slice(-1)[0];
    monkey.test = parseInt(chunk[3].split(" ")[5]);
    monkey.trueThrow = parseInt(chunk[4].split(" ").slice(-1)[0]);
    monkey.falseThrow = parseInt(chunk[5].split(" ").slice(-1)[0]);
    monkey.count = 0;
    monkyes.push(monkey);
  }
  return monkyes;
};

const calcWorryLevel = (old, op, opVal) => {
  return op === "*"
    ? isNaN(parseInt(opVal))
      ? old * old
      : old * parseInt(opVal)
    : isNaN(parseInt(opVal))
    ? old + old
    : old + parseInt(opVal);
};

const getLevel = (monkeys) => {
  return monkeys
    .map((monkey) => monkey.count)
    .sort()
    .reverse()
    .slice(0, 2)
    .reduce((a, b) => a * b);
};

const firstPart = (input) => {
  const monkeys = createMonkeys(input);

  for (var i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      monkey.startingItems.forEach((item) => {
        let worryLevel = calcWorryLevel(item, monkey.op, monkey.opVal);
        worryLevel = Math.floor(worryLevel / 3);
        monkey.count += 1;

        if (worryLevel % monkey.test === 0) {
          monkeys[monkey.trueThrow].startingItems.push(worryLevel);
        } else {
          monkeys[monkey.falseThrow].startingItems.push(worryLevel);
        }
      });
      monkey.startingItems = [];
    });
  }
  return getLevel(monkeys);
};

const secondPart = (input) => {};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

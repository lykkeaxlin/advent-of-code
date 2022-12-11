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
    const chunk = input.slice(i, i + chunkSize);
    monkyes.push({
      startingItems: chunk[1].split(":")[1].split(",").map(Number),
      op: chunk[2].split(" ")[6],
      opVal: chunk[2].split(" ").slice(-1)[0],
      test: parseInt(chunk[3].split(" ")[5]),
      trueThrow: parseInt(chunk[4].split(" ").slice(-1)[0]),
      falseThrow: parseInt(chunk[5].split(" ").slice(-1)[0]),
      count: 0,
    });
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
    .map((m) => m.count)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
};

const solve = (input, n) => {
  const monkeys = createMonkeys(input);
  const mod = monkeys.map((monkey) => monkey.test).reduce((a, b) => a * b, 1);

  for (var i = 0; i < n; i++) {
    monkeys.forEach((monkey) => {
      monkey.startingItems.forEach((item) => {
        monkey.count++;
        let worryLevel = calcWorryLevel(item, monkey.op, monkey.opVal);
        worryLevel = n === 20 ? Math.floor(worryLevel / 3) : worryLevel % mod;
        const throwTo =
          worryLevel % monkey.test === 0 ? monkey.trueThrow : monkey.falseThrow;
        monkeys[throwTo].startingItems.push(worryLevel);
      });
      monkey.startingItems = [];
    });
  }
  return getLevel(monkeys);
};

const input = readFile();

console.log("first:", solve(input, 20));
console.log("second:", solve(input, 10000));

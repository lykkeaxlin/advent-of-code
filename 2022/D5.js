var fs = require("fs");

const test = false;

const stackSize = test ? 3 : 9;

// TODO: parse :)))
const getStacks = () => {
  return test
    ? [["Z", "N"], ["M", "C", "D"], ["P"]]
    : [
        ["N", "B", "D", "T", "V", "G", "Z", "J"],
        ["S", "R", "M", "D", "W", "P", "F"],
        ["V", "C", "R", "S", "Z"],
        ["R", "T", "J", "Z", "P", "H", "G"],
        ["T", "C", "J", "N", "D", "Z", "Q", "F"],
        ["N", "V", "P", "W", "G", "S", "F", "M"],
        ["G", "C", "V", "B", "P", "Q"],
        ["Z", "B", "P", "N"],
        ["W", "P", "J"],
      ];
};

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const moveCrate = (n, from, to, stacks) => {
  for (var i = 0; i < n; i++) {
    const crate = stacks[from - 1].pop();
    stacks[to - 1].push(crate);
  }
};

const getAnswer = (stacks) => {
  return stacks.map((a) => a.slice(a.length - 1)).join("");
};

const firstPart = (input) => {
  const stacks = getStacks();
  const moves = input.slice(stackSize + 1);

  moves.forEach((move) => {
    const split = move.split(" ");
    const n = parseInt(split[1]);
    const from = parseInt(split[3]);
    const to = parseInt(split[5]);
    moveCrate(n, from, to, stacks);
  });
  return getAnswer(stacks);
};

const moveCrates = (n, from, to, stacks) => {
  const toMove = [];
  for (var i = 0; i < n; i++) {
    const letter = stacks[from - 1].pop();
    toMove.push(letter);
  }
  stacks[to - 1] = stacks[to - 1].concat(toMove.reverse());
};

const secondPart = (input) => {
  const stacks = getStacks();
  const moves = input.slice(stackSize + 1);

  moves.forEach((move) => {
    const split = move.split(" ");
    const n = parseInt(split[1]);
    const from = parseInt(split[3]);
    const to = parseInt(split[5]);
    moveCrates(n, from, to, stacks);
  });
  return getAnswer(stacks);
};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

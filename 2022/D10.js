var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const getSignalStrength = (values) => {
  let strength = 0;

  for (var i = 20; i < values.length; i += 40) {
    strength += values[i] * i;
  }
  return strength;
};

const printCRT = (crt) => {
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 40; j++) {
      process.stdout.write(crt[i][j]);
    }
    console.log();
  }
};

const shift = (state, newVal, values, i) => {
  state.x += state.x_1;
  state.x_1 = state.x_2;
  state.x_2 = newVal;
  values[i] = state.x;
};

const firstPart = (input) => {
  let i = 1;
  let state = { x: 1, x_1: 0, x_2: 0 };
  const values = [1];

  let crt = Array(6)
    .fill(" ")
    .map(() => Array(40).fill(" "));

  input.forEach((element) => {
    const row = element.split(" ");
    const instruction = row[0];

    if (instruction === "noop") {
      shift(state, 0, values, i);
      i++;
    } else {
      shift(state, parseInt(row[1]), values, i);
      i++;
      shift(state, 0, values, i);
      i++;
    }
  });

  values.slice(1).forEach((val, index) => {
    const row = Math.floor(index / 40);
    const col = index % 40;

    if (Math.abs(val - col) <= 1) {
      crt[row][col] = "#";
    }
  });

  console.log("second part:");
  printCRT(crt);
  return getSignalStrength(values);
};

const input = readFile();

console.log("first:", firstPart(input));

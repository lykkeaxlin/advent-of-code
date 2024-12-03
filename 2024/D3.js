import { readFileSync } from 'fs';

const test = false;

const readFile = () =>
  readFileSync(test ? 'test.in' : 'input.in')
    .toString()
    .split('\n')[0];

const getNumbers = (operation) =>
  operation
    .split(',')
    .map((x) => x.replace(/[^0-9]/g, ''))
    .map(Number);

const firstPart = (input) => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex);
  var result = 0;

  matches.forEach((op) => {
    const [v1, v2] = getNumbers(op);
    result += v1 * v2;
  });

  return result;
};

const secondPart = (input) => {
  const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
  const matches = input.match(regex);
  var enabled = true;
  var result = 0;

  matches.forEach((op) => {
    if (op.startsWith("don't")) {
      enabled = false;
    } else if (op.startsWith('do')) {
      enabled = true;
    }

    if (enabled && !op.startsWith('do')) {
      const [v1, v2] = getNumbers(op);
      result += v1 * v2;
    }
  });
  return result;
};

const input = readFile();

console.log('first:', firstPart(input));
console.log('second:', secondPart(input));

import { readFileSync } from 'fs';

const test = false;

const readFile = () =>
  readFileSync(test ? 'test.in' : 'input.in')
    .toString()
    .split('\n');

const isRowSafe = (numbers) => {
  let isIncreasing = null;

  for (let index = 0; index < numbers.length - 1; index++) {
    const number = numbers[index];
    const nextNumber = numbers[index + 1];
    const diff = Math.abs(number - nextNumber);

    if (isIncreasing === null) {
      if (number < nextNumber) {
        isIncreasing = true;
      } else if (number > nextNumber) {
        isIncreasing = false;
      }
    }

    if (isIncreasing && number > nextNumber) {
      return false;
    }
    if (!isIncreasing && number < nextNumber) {
      return false;
    }
    if (diff > 3 || diff < 1) {
      return false;
    }
  }

  return true;
};

const firstPart = (input) => {
  var count = 0;

  for (let row of input) {
    const numbers = row.split(' ').map(Number);
    const isSafe = isRowSafe(numbers);

    if (isSafe) {
      count++;
    }
  }

  return count;
};

const secondPart = (input) => {
  var count = 0;

  for (let row of input) {
    const numbers = row.split(' ').map(Number);
    var isSafe = isRowSafe(numbers);

    if (!isSafe) {
      for (let i = 0; i < numbers.length; i++) {
        const copy = [...numbers];
        copy.splice(i, 1);
        isSafe = isRowSafe(copy);

        if (isSafe) {
          break;
        }
      }
    }

    if (isSafe) {
      count++;
    }
  }

  return count;
};

const input = readFile();

console.log('first:', firstPart(input));
console.log('second:', secondPart(input));

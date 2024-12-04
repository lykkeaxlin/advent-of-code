import { readFileSync } from 'fs';

const test = false;

const readFile = () =>
  readFileSync(test ? 'test.in' : 'input.in')
    .toString()
    .split('\n');

const word = 'XMAS';

const isValidPosition = (matrix, row, col) =>
  row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;

const wordExistsInDirection = (matrix, row, col, newRow, newCol) => {
  for (let i = 0; i < word.length; i++) {
    const currentRow = row + i * newRow;
    const currentCol = col + i * newCol;

    if (
      !isValidPosition(matrix, currentRow, currentCol) ||
      matrix[currentRow][currentCol] !== word[i]
    ) {
      return false;
    }
  }

  return true;
};

const firstPart = (input) => {
  const matrix = input.map((row) => row.split(''));

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  var count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 'X') {
        for (const [newRow, newCol] of directions) {
          if (wordExistsInDirection(matrix, row, col, newRow, newCol)) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

const hasXmas = (matrix, row, col) => {
  const directions = [
    [-1, -1, 1, 1],
    [-1, 1, 1, -1],
  ];

  for (const [r1, c1, r2, c2] of directions) {
    if (matrix[row][col] !== 'A') {
      return false;
    }

    const topLeft = [row + r1, col + c1];
    const bottomRight = [row + r2, col + c2];
    const topRight = [row + r1, col - c1];
    const bottomLeft = [row + r2, col - c2];

    if (
      !isValidPosition(matrix, topLeft[0], topLeft[1]) ||
      !isValidPosition(matrix, bottomRight[0], bottomRight[1]) ||
      !isValidPosition(matrix, topRight[0], topRight[1]) ||
      !isValidPosition(matrix, bottomLeft[0], bottomLeft[1])
    ) {
      continue;
    }

    const topLeftBottomRight =
      (matrix[topLeft[0]][topLeft[1]] === 'M' &&
        matrix[bottomRight[0]][bottomRight[1]] === 'S') ||
      (matrix[topLeft[0]][topLeft[1]] === 'S' &&
        matrix[bottomRight[0]][bottomRight[1]] === 'M');

    const topRightBottomLeft =
      (matrix[topRight[0]][topRight[1]] === 'M' &&
        matrix[bottomLeft[0]][bottomLeft[1]] === 'S') ||
      (matrix[topRight[0]][topRight[1]] === 'S' &&
        matrix[bottomLeft[0]][bottomLeft[1]] === 'M');

    return topLeftBottomRight && topRightBottomLeft;
  }

  return false;
};

const secondPart = (input) => {
  const matrix = input.map((row) => row.split(''));
  let count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (hasXmas(matrix, row, col)) {
        count++;
      }
    }
  }

  return count;
};

const input = readFile();

console.log('first:', firstPart(input));
console.log('second:', secondPart(input));

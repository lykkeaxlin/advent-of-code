var fs = require("fs");

const test = true;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const parseMatrix = (input) => {
  const matrix = [];
  input.forEach((element, i) => {
    const row = element.split("");
    matrix[i] = [];

    row.forEach((nbr, j) => {
      matrix[i][j] = parseInt(nbr);
    });
  });
  return matrix;
};

const getTopNeighbours = (i, j, n, matrix) => {
  let neighbours = [];

  for (var x = 0; x < i; x++) {
    neighbours.push(matrix[x][j]);
  }
  return neighbours;
};

const getBottomNeighbours = (i, j, n, matrix) => {
  let neighbours = [];

  for (var x = i + 1; x < n; x++) {
    neighbours.push(matrix[x][j]);
  }
  return neighbours;
};

const getLeftNeighbours = (i, j, n, matrix) => {
  let neighbours = [];

  for (var x = 0; x < j; x++) {
    neighbours.push(matrix[i][x]);
  }
  return neighbours;
};

const getRightNeighbours = (i, j, n, matrix) => {
  let neighbours = [];
  let score = 0;

  for (var x = j + 1; x < n; x++) {
    neighbours.push(matrix[i][x]);
  }
  return neighbours;
};

const isEdge = (i, j, n) => {
  return i === 0 || j === 0 || i === n || j === n;
};

const isVisible = (i, j, n, matrix) => {
  const current = matrix[i][j];
  return (
    Math.max(...getTopNeighbours(i, j, n, matrix)) < current ||
    Math.max(...getBottomNeighbours(i, j, n, matrix)) < current ||
    Math.max(...getLeftNeighbours(i, j, n, matrix)) < current ||
    Math.max(...getRightNeighbours(i, j, n, matrix)) < current ||
    isEdge(i, j, n - 1)
  );
};

const firstPart = (input) => {
  let count = 0;
  const matrix = parseMatrix(input);
  const n = matrix.length;
  matrix.forEach((row, i) => {
    row.forEach((col, j) => {
      if (isVisible(i, j, n, matrix)) {
        count++;
      }
    });
  });
  return count;
};

// refactor
const getScore = (scores, top, bottom, left, right, current) => {
  let t = 0,
    l = 0,
    r = 0,
    b = 0;

  for (const x of top) {
    t++;
    if (x >= current) {
      break;
    }
  }

  for (const x of bottom) {
    b++;
    if (x >= current) {
      break;
    }
  }

  for (const x of left) {
    l++;
    if (x >= current) {
      break;
    }
  }

  for (const x of right) {
    r++;
    if (x >= current) {
      break;
    }
  }
  scores.push(r * l * b * t);
};

const secondPart = (input) => {
  let scores = [];

  const matrix = parseMatrix(input);
  const n = matrix.length;
  matrix.forEach((row, i) => {
    row.forEach((col, j) => {
      getScore(
        scores,
        getTopNeighbours(i, j, n, matrix).reverse(),
        getBottomNeighbours(i, j, n, matrix),
        getLeftNeighbours(i, j, n, matrix).reverse(),
        getRightNeighbours(i, j, n, matrix),
        matrix[i][j]
      );
    });
  });
  return scores;
};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

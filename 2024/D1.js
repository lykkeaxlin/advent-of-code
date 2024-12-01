import { readFileSync } from 'fs';

const test = false;

const readFile = () =>
  readFileSync(test ? 'test.in' : 'input.in')
    .toString()
    .split('\n');

const getLists = (input) => {
  const left = [];
  const right = [];

  input.forEach((x) => {
    const [l, r] = x.split(' ').filter(Boolean).map(Number);
    left.push(l);
    right.push(r);
  });

  return [left, right];
};

const firstPart = (input) => {
  var dist = 0;

  const [left, right] = getLists(input);

  left.sort();
  right.sort();

  left.forEach((x, i) => {
    dist += Math.abs(x - right[i]);
  });

  return dist;
};

const getCounts = (list) => {
  const distinct = [...new Set(list)];
  const counts = {};

  distinct.forEach((nbr) => {
    counts[nbr] = list.filter((x) => x === nbr).length;
  });

  return counts;
};

const secondPart = (input) => {
  const [left, right] = getLists(input);
  const counts = getCounts(right);
  var score = 0;

  left.forEach((x) => {
    score += (counts[x] ?? 0) * x;
  });

  return score;
};

const input = readFile();

console.log('first:', firstPart(input));
console.log('second:', secondPart(input));

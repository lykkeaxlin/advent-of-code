import { readFileSync } from 'fs';

const test = false;

const readFile = () =>
  readFileSync(test ? 'test.in' : 'input.in')
    .toString()
    .split('\n');

const parseInput = (input) => {
  const rules = {};
  const updates = [];

  input.forEach((element) => {
    if (element.includes('|')) {
      const [n1, n2] = element.split('|').map(Number);
      if (n1 in rules) {
        rules[n1].push(n2);
      } else {
        rules[n1] = [n2];
      }
    } else if (element !== '') {
      updates.push(element.split(',').map(Number));
    }
  });

  return { rules, updates };
};

const isCorrectlyOrdered = (rules, nbrs) =>
  nbrs.every(
    (nbr, i) => !rules[nbr]?.some((x) => nbrs.slice(0, i).includes(x))
  );

const firstPart = ({ rules, updates }) =>
  updates
    .filter((x) => isCorrectlyOrdered(rules, x))
    .reduce((sum, x) => sum + x[Math.floor(x.length / 2)], 0);

const reorder = (rules, nbrs) =>
  nbrs.sort((a, b) =>
    rules[a]?.includes(b) ? -1 : rules[b]?.includes(a) ? 1 : 0
  );

const secondPart = ({ rules, updates }) =>
  updates
    .filter((x) => !isCorrectlyOrdered(rules, x))
    .map((x) => reorder(rules, x))
    .reduce((sum, x) => sum + x[Math.floor(x.length / 2)], 0);

const input = readFile();

console.log('first:', firstPart(parseInput(input)));
console.log('second:', secondPart(parseInput(input)));

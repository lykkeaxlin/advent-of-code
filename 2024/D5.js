import { readFileSync } from 'fs';

const test = true;

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
      updates.push(element);
    }
  });

  return [rules, updates];
};

const isCorrectlyOrdered = (rules, nbrs) => {
  for (let i = 0; i < nbrs.length; i++) {
    const nbr = nbrs[i];
    const list = nbrs.slice(0, i);
    if (rules[nbr]?.some((x) => list.includes(x))) {
      return false;
    }
  }
  return true;
};

const firstPart = (input) => {
  const [rules, updates] = parseInput(input);
  var sum = 0;

  updates.forEach((update) => {
    const nbrs = update.split(',').map(Number);
    var correct = true;

    for (let i = 0; i < nbrs.length; i++) {
      if (!isCorrectlyOrdered(rules, nbrs)) {
        correct = false;
        break;
      }
    }

    if (correct) {
      sum += nbrs[Math.floor(nbrs.length / 2)];
    }
  });

  return sum;
};

const reorder = (rules, nbrs) =>
  nbrs.sort((a, b) =>
    rules[a]?.includes(b) ? -1 : rules[b]?.includes(a) ? 1 : 0
  );

const secondPart = (input) => {
  const [rules, updates] = parseInput(input);
  let sum = 0;

  updates.forEach((update) => {
    const nbrs = update.split(',').map(Number);

    if (!isCorrectlyOrdered(rules, nbrs)) {
      const reordered = reorder(rules, nbrs);

      sum += reordered[Math.floor(reordered.length / 2)];
    }
  });

  return sum;
};

const input = readFile();

console.log('first:', firstPart(input));
console.log('second:', secondPart(input));

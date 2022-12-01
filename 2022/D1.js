var fs = require("fs");

const readFile = () => {
  //return fs.readFileSync("test.in").toString().split("\n");
  return fs.readFileSync("input.in").toString().split("\n");
};

const firstPart = (input) => {
  var cals = [0];
  let i = 0;

  input.forEach((x) => {
    if (isNaN(parseInt(x))) {
      i++;
      cals[i] = 0;
    } else {
      cals[i] += parseInt(x);
    }
  });
  return cals;
};

const getMax = (cals) => {
  return Math.max(...cals);
};

const secondPart = (cals) => {
  const top = cals.sort((a, b) => a - b).reverse();
  return top.slice(0, 3).reduce((a, b) => a + b, 0);
};

const input = readFile();
const cals = firstPart(input);

console.log("first", getMax(cals));
console.log("second", secondPart(cals));

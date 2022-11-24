import { readFileSync } from "fs";

const readFile = () => {
  return readFileSync("2022/test.in").toString().split("\n");
};

const input = readFile();

const firstPart = () => {};
const secondPart = () => {};

console.log(firstPart());
console.log(secondPart());

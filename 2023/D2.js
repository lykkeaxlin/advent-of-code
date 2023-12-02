import { readFileSync } from "fs";

const test = false;

const readFile = () => {
  return readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n")
    .map((row) => row.split(":")[1].split(";"));
};

const processRecords = (input) =>
  input.map((game, index) => {
    const record = { blue: 0, red: 0, green: 0, index: index + 1 };

    game.forEach((hand) => {
      hand.split(",").map((x) => {
        const [value, colour] = x.trim().split(" ");
        if (parseInt(value) > record[colour]) {
          record[colour] = parseInt(value);
        }
      });
    });

    return record;
  });

const firstPart = (input) => {
  const limits = { red: 12, green: 13, blue: 14 };
  const records = processRecords(input);

  return records
    .filter((x) => Object.keys(limits).every((key) => x[key] <= limits[key]))
    .reduce((acc, { index }) => acc + index, 0);
};

const secondPart = (input) => {
  const records = processRecords(input);

  return records.reduce((sum, { red, green, blue }) => sum + red * green * blue, 0);
};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

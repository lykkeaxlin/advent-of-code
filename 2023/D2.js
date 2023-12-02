import { readFileSync } from "fs";

const test = false;

const readFile = () => {
  return readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n")
    .map((row) => row.split(":")[1].split(";"));
};

const processRecords = (input, comparator) =>
  input.map((game) => {
    const record = { blue: 0, red: 0, green: 0 };

    game.forEach((hand) => {
      hand.split(",").map((x) => {
        const [value, colour] = x.trim().split(" ");
        if (comparator(parseInt(value), record[colour])) {
          record[colour] = parseInt(value);
        }
      });
    });

    return record;
  });

const firstPart = (input) => {
  const limits = { red: 12, green: 13, blue: 14 };
  const records = processRecords(input, (value, current) => value < current);

  return records.filter((game) =>
    Object.keys(limits).every((colour) => game[colour] <= limits[colour])
  );
};

const secondPart = (input) => {
  const records = processRecords(input, (value, current) => value > current);

  return records
    .map((obj) => Object.values(obj).reduce((acc, value) => acc * value, 1))
    .reduce((acc, value) => acc + value, 0);
};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input));

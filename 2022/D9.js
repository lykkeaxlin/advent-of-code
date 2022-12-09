var fs = require("fs");

const test = false;
const size = test ? 5 : 20;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const moveHead = (head, dir) => {
  let x = head.x;
  let y = head.y;

  if (dir === "R") {
    y++;
  } else if (dir === "U") {
    x--;
  } else if (dir === "L") {
    y--;
  } else if (dir === "D") {
    x++;
  }
  return { x, y };
};

const moveTail = (head, tail) => {
  const dx = head.x - tail.x;
  const dy = head.y - tail.y;
  let x = tail.x;
  let y = tail.y;

  if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
    return { x, y };
  } else if (dx === 0) {
    y = dy === 2 ? y + 1 : y - 1;
  } else if (dy === 0) {
    x = dx === 2 ? x + 1 : x - 1;
  } else {
    y = dy > 0 ? y + 1 : y - 1;
    x = dx > 0 ? x + 1 : x - 1;
  }
  return { x, y };
};

const firstPart = (input) => {
  let head = { x: size - 1, y: 0 };
  let tail = { x: size - 1, y: 0 };
  const visited = new Set();

  input.forEach((element) => {
    const line = element.split(" ");
    const dir = line[0];
    const steps = parseInt(line[1]);

    for (var step = 0; step < steps; step++) {
      head = moveHead(head, dir);
      tail = moveTail(head, tail);
      visited.add(tail.x + "," + tail.y);
    }
  });
  return visited.size;
};

const secondPart = (input, length) => {
  let head = { x: size - 1, y: 0 };
  let tails = new Array(length).fill({ x: size - 1, y: 0 });
  const visited = new Set();

  input.forEach((element) => {
    const line = element.split(" ");
    const dir = line[0];
    const steps = parseInt(line[1]);

    for (var step = 0; step < steps; step++) {
      head = moveHead(head, dir);

      for (var i = 0; i < tails.length; i++) {
        tails[i] = moveTail(i === 0 ? head : tails[i - 1], tails[i]);
      }
      visited.add(tails[length - 1].x + "," + tails[length - 1].y);
    }
  });
  return visited.size;
};

const input = readFile();

console.log("first:", firstPart(input));
console.log("second:", secondPart(input, 9));

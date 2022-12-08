var fs = require("fs");

const test = false;

const readFile = () => {
  return fs
    .readFileSync(test ? "test.in" : "input.in")
    .toString()
    .split("\n");
};

const getAllNestedPaths = (sums, path) => {
  return Object.fromEntries(
    Object.entries(sums).filter(([k, v]) => k.startsWith(path) && path !== k)
  );
};

const moveDir = (path, cmd) => {
  if (cmd === "..") {
    const split = path.split("/").slice(0, -1).join("/");
    return split.length === 0 ? "/" : split;
  } else if (cmd === "/") {
    return cmd;
  } else {
    return path.length === 1 ? path + cmd : path + "/" + cmd;
  }
};

const hasNumber = (str) => {
  return /\d/.test(str);
};

const filterMax = (sums, max) => {
  const filtered = Object.fromEntries(
    Object.entries(sums).filter(([k, v]) => v <= max)
  );

  return Object.values(filtered).reduce((a, b) => a + b, 0);
};

const parseDirs = (input) => {
  let path = "/";
  let dirs = {};

  input.forEach((element) => {
    if (element.split(" ")[1] === "cd") {
      path = moveDir(path, element.split(" ")[2]);
    } else if (hasNumber(element.split(" ")[0])) {
      const size = element.split(" ")[0];
      const fileName = element.split(" ")[1];
      if (path in dirs) {
        const currentFiles = dirs[path];
        currentFiles.push({ fileName, size });
      } else {
        dirs[path] = [{ fileName, size }];
      }
    } else if (element.split(" ")[0] === "dir") {
      if (!(path in dirs)) {
        dirs[path] = [];
      }
    }
  });
  return dirs;
};

const calcSums = (dirs) => {
  let sums = {};

  for (const [key, value] of Object.entries(dirs)) {
    sums[key] = 0;

    value.forEach((v) => {
      sums[key] += parseInt(v.size);
    });
  }

  for (const [key, value] of Object.entries(sums)) {
    const nestedPaths = getAllNestedPaths(sums, key);

    const sumNested = Object.values(nestedPaths).reduce((a, b) => a + b, 0);
    sums[key] += sumNested;
  }
  return sums;
};

const secondPart = (sums) => {
  const DISK_SPACE = 70000000;
  const UNUSED_SPACE = 30000000;

  const space = UNUSED_SPACE - DISK_SPACE + sums["/"];

  const candidates = Object.keys(sums).filter((dir) => sums[dir] >= space);
  let min = total;

  candidates.forEach((cand) => {
    if (sums[cand] < min) {
      min = sums[cand];
    }
  });
  return min;
};

const input = readFile();
const dirs = parseDirs(input);
const sums = calcSums(dirs);

console.log("first:", filterMax(sums, 100000));
console.log("second:", secondPart(sums));

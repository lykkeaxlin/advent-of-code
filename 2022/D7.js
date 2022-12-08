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
  for (const [key, _] of Object.entries(sums)) {
    const nestedPaths = getAllNestedPaths(sums, key);
    const sumNested = Object.values(nestedPaths).reduce((a, b) => a + b, 0);
    sums[key] += sumNested;
  }

  const filtered = Object.values(sums).filter((sum) => sum <= max);
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
      if (path in dirs) {
        dirs[path] += parseInt(size);
      } else {
        dirs[path] = parseInt(size);
      }
    } else if (element.split(" ")[0] === "dir") {
      if (!(path in dirs)) {
        dirs[path] = 0;
      }
    }
  });
  return dirs;
};

const secondPart = (sums) => {
  const DISK_SPACE = 70000000;
  const UNUSED_SPACE = 30000000;
  return Object.values(sums)
    .filter((sum) => sum >= UNUSED_SPACE - DISK_SPACE + sums["/"])
    .sort()
    .reverse()[0];
};

const input = readFile();
const dirs = parseDirs(input);

console.log("first:", filterMax(dirs, 100000));
console.log("second:", secondPart(dirs));

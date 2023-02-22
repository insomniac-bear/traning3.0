const fs = require('fs');

function prepareDiego (count, n) {
  const sortedUniqueN = [];

  if (Number(count) === 0) {
    return [];
  }
  const uniqueSet = new Set(n);

  for (let value of uniqueSet) {
    sortedUniqueN.push(Number(value));
  }

  sortedUniqueN.sort((a, b) => a - b);

  return sortedUniqueN;
}

function lBinSearch (arr, searchValue, l = 0, r = arr.length) {
  while (l < r) {
    let m = parseInt((l + r) / 2);
    if (arr[m] >= searchValue) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return l;
}

let fileContent = fs.readFileSync('input.txt', 'utf8');

const data = fileContent.toString().split('\n');
const countOfStickers = Number(data[0]);
const n = prepareDiego(countOfStickers, data[1].split(' '));
const k = Number(data[2]);
const p = data[3].split(' ').map(it => Number(it));

let result;

if (k === 0) {
  result = '';
} else {
  result = '';
  p.forEach((it) => {
    result = result + lBinSearch(n, Number(it)) + '\n';
  });
}

fs.writeFileSync("output.txt", result.toString());
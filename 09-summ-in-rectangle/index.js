const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');
let result = '';

const params = fileContent[0].split(' ');
const M = Number(params[1]);
const N = Number(params[0]);

const matrix = fileContent.slice(1, 1 + N).map(it => it.split(' ').map(it => Number(it)));
const queries = fileContent.slice(1 + N).map((it) => it.split(' ').map(it => Number(it)));

const pref = [[]];
for (let i = 0; i <= M; i++) {
  pref[0].push(0);
}

for (let y = 1; y <= N; y++) {
  pref.push([]);
  pref[y].push(0);
  for (let x = 1; x <= M; x++) {
    const sum = matrix[y - 1][x - 1] + pref[y - 1][x] + pref[y][x - 1] - pref[y - 1][x - 1];
    pref[y].push(sum);
  }
}

const fn = (x1, y1, x2, y2, pref) => {
  return pref[x2][y2] - pref[x1 - 1][y2] - pref[x2][y1 - 1] + pref[x1 - 1][y1 - 1];
};


for(let i = 0; i < queries.length; i++) {
  result = result + fn(queries[i][0], queries[i][1], queries[i][2], queries[i][3], pref) + '\n';
}

fs.writeFileSync("output.txt", result.toString());
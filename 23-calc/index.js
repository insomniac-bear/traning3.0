const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim();

let N = Number(fileContent);

const min = (a, b) => {
  if (a <= b) {
    return a;
  }
  return b;
}

const dp = [0, 0];
const numbers = [1];

for (let i = 2; i <= N; i++) {
  let countOfStep = dp[i - 1] + 1;

  if (i % 2 === 0) {
    countOfStep = min(countOfStep, dp[i / 2] + 1);
  }
  if (i % 3 === 0) {
    countOfStep = min(countOfStep, dp[i / 3] + 1);
  }
  dp.push(countOfStep);
}

let j = N;

while (j > 1) {
  numbers.push(j);
  if (dp[j] === dp[j - 1] + 1) {
    j = j - 1;
  } else if (j % 2 === 0 && dp[j] === dp[j / 2] + 1) {
    j = j / 2;
  } else if (j % 3 === 0 && dp[j] === dp[j / 3] + 1) {
    j = j / 3;
  }
}
numbers.sort((a, b) => a - b);

const result = dp[dp.length - 1] + '\n' + numbers.join(' ');
fs.writeFileSync("output.txt", result.toString());

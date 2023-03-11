const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split(' ');

const k = Number(fileContent[1]);
const N = Number(fileContent[0]);

let result;

if (k > 1 && N > 1) {
  const steps = [1, 1];
  let countOfSteps = 0;
  for (let i = 1; i < k; i++) {
    for (let j = i; j > 0; j--) {
      countOfSteps += steps[i - j];
    }
    steps.push(countOfSteps + 1);
  }

  const moveToN = [...steps];

  for (let i = k + 1; i < N; i++) {
    let countOfSteps = 0;
    for (let j = 1; j <= k; j++) {
      countOfSteps += moveToN[i - j];
    }
    moveToN.push(countOfSteps);
  }
  result = moveToN[N - 1] + '\n';
} else {
  result = 1;
}


fs.writeFileSync("output.txt", result.toString());

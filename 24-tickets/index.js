const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map((it) => it.trim());

const virtualPeople = [[3700, 3700, 3700], [3700, 3700, 3700], [3700, 3700, 3700]];

const N = Number(fileContent[0].trim());
const variants = fileContent
  .slice(1, N + 1)
    .map(
      it =>
        it
          .split(' ')
          .map(it => Number(it))
  );

  variants.push(...virtualPeople);

const min = (a, b, c) => {
  return [a, b, c].sort((a, b) => a - b)[0];
}

const dp = new Array(N + 3).fill(0);

for (let i = 0; i < N; i++) {
  dp[i] = min(dp.at(i - 1) + variants.at(i)[0], dp.at(i - 2) + variants.at(i - 1)[1], dp.at(i - 3) + variants.at(i - 2)[2]);
}

const result = dp[N - 1] + '\n';
fs.writeFileSync("output.txt", result.toString());

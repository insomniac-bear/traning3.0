const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim();

const n = Number(fileContent);

const rows = [1, 2, 4, 7];
if (n > 3) {
  let j = 0;
  for (let i = 4; i <= n; i++) {
    rows.push(rows[i - 1] * 2 - rows[j]);
    j += 1;
  }
}

const result = rows[n] + '\n';

fs.writeFileSync("output.txt", result.toString());

const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');
let result = 0;
const data = fileContent.toString().split('\n');

for (let i = 1; i < data.length - 1; i++) {
  if (Number(data[i]) > Number(data[i + 1])) {
    result += Number(data[i + 1]);
  } else {
    result += Number(data[i]);
  }
}

fs.writeFileSync("output.txt", result.toString());
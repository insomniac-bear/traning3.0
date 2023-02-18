const fs = require('fs');

function beautyStrLength(s, count) {
  const symbolsIdx = {};
  let result = 0;
  let idx = 0;

  for (let char of s) {
    if (!symbolsIdx[char]) {
      symbolsIdx[char] = [];
    }

    symbolsIdx[char].push(Number(idx));

    idx += 1;
  }

  for (key in symbolsIdx) {
    const arr = symbolsIdx[key];

    let start = 0;
    let end = 0;
    let includePoints = 1;

    while (true) {

      const charLength = arr[end] - arr[start] + 1;
      const needToInsert = charLength - includePoints;
      const fullLength = charLength + count - needToInsert;

      if (needToInsert <= count) {
        result = fullLength > result ? fullLength : result;
      }

      if (needToInsert <= count) {
        if (end < arr.length - 1) {
          end = end + 1;
          includePoints = includePoints + 1;
        } else {
          start = start + 1;
          includePoints = includePoints - 1;
        }

      } else {
        includePoints = includePoints - 1;
        start = start + 1;
      }

      if (start >= arr.length - 1) {
        break;
      }
    }
  }

    return result;

}

let fileContent = fs.readFileSync('input.txt', 'utf8');

const [actionsCount, str] = fileContent.toString().split('\n');
const result = beautyStrLength(str, Number(actionsCount));

fs.writeFileSync("output.txt", result.toString());

const fs = require('fs');

function printChar(s) {
  const symbolsCount = {};
  let maxSymbolCount = 0;

  for (let char of s) {
    if (!symbolsCount.hasOwnProperty(char)) {
      symbolsCount[char] = 0;
    }
    symbolsCount[char] += 1;

    if (symbolsCount[char] > maxSymbolCount) {
      maxSymbolCount = symbolsCount[char];
    }
  }

  const chars = Object.keys(symbolsCount).sort().join('');
  let result = '';
  for (i = maxSymbolCount; i > 0; i --) {
    for(let char of chars) {

      if (symbolsCount[char] >= i) {
        result += '#';
      } else {
        result += ' ';
      }
    }
    result += '\r\n';
  }
  result += chars;
  return result;
}

const re = /\s|\n/gi;
let fileContent = fs.readFileSync("input.txt", "utf8");

const str = fileContent.toString().replace(re, '');

fs.writeFileSync("output.txt", printChar(str));
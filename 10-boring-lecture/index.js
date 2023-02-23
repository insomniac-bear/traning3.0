const fs = require('fs');

let word = fs.readFileSync('input.txt', 'utf8').toString().trim();
let result = '';
const letters = {};

for (let i = 0; i < word.length; i++) {
  if (!letters[word[i]]) {
    letters[word[i]] = 0;
  }

  letters[word[i]] = letters[word[i]] + ((i + 1) * (word.length - i));
}

const chars = Object.keys(letters).sort().join('');

for (let char of chars) {
  result = result + char + ': ' + letters[char] + '\n';
}

fs.writeFileSync("output.txt", result.toString());
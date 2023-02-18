const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const data = fileContent.toString().split('\n');

const n = Number(data[0]);
const k = Number(data[1]);
const r = Number(data[2]);
const s = Number(data[3]);

let result;

const modForRows = n % 2 === 0 ? 0 : 1;
const countOfRows = Math.floor(n / 2) + modForRows;
const modForFillVariants = k % 2 === 0 ? 0 : 1;
const rowsForFullRound = Math.floor(k / 2) + modForFillVariants;

const countsOfRowAfterPeter = countOfRows - r;

console.log(rowsForFullRound);
const isVariantOfPeterRepeat = countsOfRowAfterPeter && countsOfRowAfterPeter - rowsForFullRound >= 0 ? true : false;

console.log(isVariantOfPeterRepeat)

// fs.writeFileSync("output.txt", result.toString());
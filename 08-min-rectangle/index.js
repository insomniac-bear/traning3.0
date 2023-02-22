const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').trim();

const data = fileContent.split('\n');

const coords = [];

for (let i = 1; i < data.length; i++) {
  coords.push(data[i].split(' '));
};

let minX = Number(coords[0][0].trim());
let minY = Number(coords[0][1].trim());
let maxX = Number(coords[0][0].trim());
let maxY = Number(coords[0][1].trim());

coords.forEach(it => {
  if (Number(it[0]) < minX) {
    minX = Number(it[0].trim());
  } else if (Number(it[0]) > maxX) {
    maxX = Number(it[0].trim());
  }
  if (Number(it[1]) < minY) {
    minY = Number(it[1].trim());
  } else if (Number(it[1]) > maxY) {
    maxY = Number(it[1].trim());
  }
});

const result = minX + ' ' + minY + ' ' + maxX + ' ' + maxY + '\n';

fs.writeFileSync("output.txt", result.toString());
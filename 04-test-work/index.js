const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const data = fileContent.toString().split('\n');

const n = Number(data[0]);
const k = Number(data[1]);
const r = Number(data[2]);
const s = Number(data[3]);

let result;

const peterMod = s === 2 ? 0 : 1;

const nextPlaceWithVariant = r * 2 - peterMod + k;
const beforePlaceWithVariant = r * 2 - peterMod - k;

if (nextPlaceWithVariant > n && beforePlaceWithVariant <= 0) {
  result = -1;
} else {
  const nextRowIsFill = nextPlaceWithVariant % 2 > 0 ? 1 : 0;
  const nextRowWithVariant = Math.floor(nextPlaceWithVariant / 2) + nextRowIsFill;
  const nextSideWithVariant = nextPlaceWithVariant % 2 === 0 ? 2 : 1;

  const beforeRowIsFill = beforePlaceWithVariant % 2 > 0 ? 1 : 0;
  const beforeRowWithVariant = Math.floor(beforePlaceWithVariant / 2) + beforeRowIsFill;
  const beforeSideWithVariant = beforePlaceWithVariant % 2 === 0 ? 2 : 1;

  if (nextPlaceWithVariant > n) {
    result = `${beforeRowWithVariant} ${beforeSideWithVariant}`;
  } else if (nextRowWithVariant - r <= r - beforeRowWithVariant) {
    result = `${nextRowWithVariant} ${nextSideWithVariant}`;
  } else {
    result = `${beforeRowWithVariant} ${beforeSideWithVariant}`;
  }
}

fs.writeFileSync("output.txt", result.toString());
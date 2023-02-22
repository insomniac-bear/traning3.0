const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const data = fileContent.toString().split('\n');
let systems = [data[2].split(' ')];

for (let i = 3; i < data.length; i++) {
  const newSystem = data[i].split(' ');
  systems = systems.filter(item => !(Number(item[0]) <= Number(newSystem[1]) && Number(item[1]) >= Number(newSystem[0])));
  systems.push(newSystem);
}
const result = `${systems.length}` + '\n';

fs.writeFileSync("output.txt", result);

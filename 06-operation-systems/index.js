const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim();

const data = fileContent.split('\n');

console.log(data[1]);

let result;

if (Number(data[1]) === 0) {
  result = '0' + '\n';
} else {
  let systems = [data[2].split(' ')];
  for (let i = 3; i < data.length; i++) {
    const newSystem = data[i].split(' ');
    systems = systems.filter(item => !(Number(item[0]) <= Number(newSystem[1]) && Number(item[1]) >= Number(newSystem[0])));
    systems.push(newSystem);
  }
  result = `${systems.length}` + '\n';
}



fs.writeFileSync("output.txt", result);

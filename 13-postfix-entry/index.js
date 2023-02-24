const fs = require('fs');

let string = fs.readFileSync('input.txt', 'utf8').toString().trim().split(' ');
const stack = [];

for (let i = 0; i < string.length; i++) {
  switch (string[i]) {
    case '+':
      if (stack.length <= 1) {
        break;
      } else {
        const result = stack[stack.length - 2] + stack[stack.length - 1];
        stack.pop();
        stack.pop();
        stack.push(result);
      }
      break;
    case '-':
      if (stack.length <= 1) {
        break;
      } else {
        const result = stack[stack.length - 2] - stack[stack.length - 1];
        stack.pop();
        stack.pop();
        stack.push(result);
      }
      break;
    case '*':
      if (stack.length <= 1) {
        break;
      } else {
        const result = stack[stack.length - 2] * stack[stack.length - 1];
        stack.pop();
        stack.pop();
        stack.push(result);
      }
      break;
    default:
      stack.push(Number(string[i]));
      break;
  }
}

const result = stack[stack.length - 1] + '\n';
fs.writeFileSync("output.txt", result.toString());
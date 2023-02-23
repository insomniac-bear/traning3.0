const fs = require('fs');

let string = fs.readFileSync('input.txt', 'utf8').toString().trim();

const fn = (str) => {
  let result = 'yes';
  let isWork = true;
  let i = 0;
  const stack = [];

  while (isWork && i < str.length) {
    switch(str[i]) {
      case '(':
        stack.push(str[i]);
        break;
      case '[':
        stack.push(str[i]);
        break;
      case '{':
        stack.push(str[i]);
        break;
      case ')':
        if (stack[stack.length - 1] && stack[stack.length - 1] === '(') {
          stack.pop();
        } else {
          result = 'no';
          isWork = false;
        }
        break;
      case ']':
        if (stack[stack.length - 1] && stack[stack.length - 1] === '[') {
          stack.pop();
        } else {
          result = 'no';
          isWork = false;
        }
        break;
      case '}':
        if (stack[stack.length - 1] && stack[stack.length - 1] === '{') {
          stack.pop();
        } else {
          result = 'no';
          isWork = false;
        }
          break;
      default:
        break;
    }
    i += 1;
  }
  if (stack.length) result = 'no';
  return result;
}

const result = fn(string);

fs.writeFileSync("output.txt", result.toString());
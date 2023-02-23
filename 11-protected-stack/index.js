const fs = require('fs');

let stack = [];

const protectedStack = (commands) => {
  let result = '';
  let isWork = true;
  let idx = 0;

  while (isWork) {
    let val;
    let c = '';

    if (commands[idx].includes('push')) {
      command = commands[idx].split(' ')[0];
      val = commands[idx].split(' ')[1];
    } else {
      command = commands[idx];
    }

    switch (command) {
      case 'push':
        stack.push(val);
        result += 'ok' + '\n';
        break;
      case 'pop':
        if (!stack.length) {
          result += 'error' + '\n';
        } else {
          result += stack.pop() + '\n';
        }
        break;
      case 'back':
        if (!stack.length) {
          result += 'error' + '\n';
        } else {
          result += stack[stack.length - 1] + '\n';
        }
        break;
      case 'size':
        result += stack.length + '\n';
        break;
      case 'clear':
        stack = [];
        result += 'ok' + '\n';
        break;
      case 'exit':
        result += 'bye' + '\n';
        isWork = false;
        break;
      default:
        break;
    }
    idx += 1;
  };

  return result;
}

let commands = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');
let result = '';

result = protectedStack(commands);

fs.writeFileSync("output.txt", result.toString());
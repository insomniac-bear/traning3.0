const fs = require('fs');

class Queue {
  constructor() {
    this.queue = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }

  push(n) {
    this.queue.push(n);
    this.length += 1;
    this.tail = this.tail === 0 ? 0 : this.tail + 1;
    return 'ok';
  }

  pop() {
    if (!this.length) {
      return 'error';
    }
    const val = this.queue[this.head];
    this.head += 1;
    this.length -= 1;
    return val;
  }

  front() {
    if (!this.length) {
      return 'error';
    }
    return this.queue[this.head];
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.queue = [];
    return 'ok';
  }

  exit() {
    return 'bye';
  }
}

let queue = new Queue();

const protectedQueue = (commands) => {
  let result = '';
  let isWork = true;
  let idx = 0;

  while (isWork) {
    let val;

    if (commands[idx].includes('push')) {
      command = commands[idx].split(' ')[0];
      val = commands[idx].split(' ')[1];
    } else {
      command = commands[idx];
    }

    switch (command) {
      case 'push':
        result += queue.push(val) + '\n';
        break;
      case 'pop':
        result += queue.pop() + '\n';
        break;
      case 'front':
        result += queue.front() + '\n';
        break;
      case 'size':
        result += queue.size() + '\n';
        break;
      case 'clear':
        result += queue.clear() + '\n';
        break;
      case 'exit':
        result += queue.exit() + '\n';
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

result = protectedQueue(commands);

fs.writeFileSync("output.txt", result.toString());
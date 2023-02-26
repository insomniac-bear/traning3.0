const fs = require('fs');

class Dequeue {
  constructor() {
    this.dequeue = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.maxLength = 100;
  }

  pushFront(n) {
    if (this.length !== 0) {
      this.head = this.head === 0 ? this.maxLength : this.head - 1;
    }
    this.length += 1;
    this.dequeue[this.head] = n;
    return 'ok';
  }

  pushBack(n) {
    if (this.length !== 0) {
      this.tail = this.tail === this.maxLength ? 0 : this.tail + 1;
    }
    this.length += 1;
    this.dequeue[this.tail] = n;
    return 'ok';
  }

  popFront() {
    if (!this.length) {
      return 'error';
    }
    const val = this.dequeue[this.head];
    if (this.length !== 1) {
      this.head = this.head === 100 ? 0 : this.head + 1;
    }
    this.length -= 1;
    return val;
  }

  popBack() {
    if (!this.length) {
      return 'error';
    }
    const val = this.dequeue[this.tail];
    if (this.length !== 1) {
      this.tail = this.tail === 0 ? 100 : this.tail - 1;
    }
    this.length -= 1;
    return val;
  }

  front() {
    if (!this.length) {
      return 'error';
    }
    return this.dequeue[this.head];
  }

  back() {
    if (!this.length) {
      return 'error';
    }
    return this.dequeue[this.tail];
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.dequeue = [];
    return 'ok';
  }

  exit() {
    return 'bye';
  }
}

let dequeue = new Dequeue();

const protectedDequeue = (commands) => {
  let result = '';
  let isWork = true;
  let idx = 0;

  while (isWork) {
    let val = '';

    if (commands[idx].includes('push_front') || commands[idx].includes('push_back')) {
      command = commands[idx].split(' ')[0];
      val = commands[idx].split(' ')[1];
    } else {
      command = commands[idx];
    }

    switch (command) {
      case 'push_front':
        result += dequeue.pushFront(val) + '\n';
        break;
      case 'push_back':
        result += dequeue.pushBack(val) + '\n';
        break;
      case 'pop_front':
        result += dequeue.popFront() + '\n';
        break;
      case 'pop_back':
        result += dequeue.popBack() + '\n';
        break;
      case 'front':
        result += dequeue.front() + '\n';
        break;
      case 'back':
        result += dequeue.back() + '\n';
        break;
      case 'size':
        result += dequeue.size() + '\n';
        break;
      case 'clear':
        result += dequeue.clear() + '\n';
        break;
      case 'exit':
        result += dequeue.exit() + '\n';
        isWork = false;
        break;
      default:
        break;
    }
    idx += 1;
   };
  return result;
}

let commands = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map(it => it.trim());
let result = '';

result = protectedDequeue(commands);

fs.writeFileSync("output.txt", result.toString());
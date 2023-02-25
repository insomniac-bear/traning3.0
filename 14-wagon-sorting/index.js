const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');
const wagonsLength = Number(fileContent[0]);
const wagonNumbers = fileContent[1].split(' ').map(it => Number(it));

class Stack {
  constructor() {
    this.stack = [];
    this.isEmpty = true;
    this.size = 0;
  }

  push(val) {
    if (this.isEmpty) {
      this.isEmpty = false;
    }
    this.stack.push(val);
    this.size += 1;
  }

  pop() {
    if (this.isEmpty) {
      throw new Error('Stack is empty');
    }
    this.size -= 1;
    return this.stack.pop();
  }

  getSize() {
    return this.size;
  }

  getPeak() {
    return this.stack[this.stack.length - 1];
  }

  isStackEmpty() {
    return this.isEmpty;
  }
}

const checkRangeOfWagons = (wagons) => {
  let isSorting = true;
  const stack = new Stack();
  let wagonForOutput = 1;
  let idx = 0;
  while (idx < wagonsLength && isSorting) {
    if (stack.isStackEmpty()) {
      stack.push(wagons[idx]);
    } else {
      let lastWagon = stack.getPeak();
      if (wagons[idx] > lastWagon) {
        while (wagons[idx] > lastWagon && isSorting) {
          if (lastWagon === wagonForOutput) {
            wagonForOutput += 1;
            lastWagon = stack.pop();
          } else {
            isSorting = false;
          }
          lastWagon = stack.getPeak();
        }
        stack.push(wagons[idx]);
      } else {
        stack.push(wagons[idx]);
      }
    }
    idx += 1;
  }

  return isSorting;
}

const result = checkRangeOfWagons(wagonNumbers) ? 'YES' + '\n' : 'NO' + '\n';

fs.writeFileSync("output.txt", result.toString());
const fs = require('fs');

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

  getStack() {
    return this.stack;
  }

  isStackEmpty() {
    return this.isEmpty;
  }
}

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');
const length = Number(fileContent[0]);
const landline = fileContent[1].split(' ').map(it => Number(it));

const resultArr = new Array(length);
const stack = new Stack();

for (let i = 0; i < length; i++) {
  if (stack.getSize() === 0) {
    stack.push({
      val: landline[i],
      idx: i,
    });
  } else {
    let peak = stack.getPeak();
    while (stack.getSize() && peak.val > landline[i]) {
      const targetCity = stack.pop();
      resultArr[targetCity.idx] = i;
      peak = stack.getPeak();
    }
      stack.push({
      val: landline[i],
      idx: i,
    });
  }
}

if (stack.getSize()) {
  while(stack.getSize()) {
    const targetCity =stack.pop();
    resultArr[targetCity.idx] = -1;
  }
}

const result = resultArr.join(' ') + '\n';

fs.writeFileSync("output.txt", result.toString());
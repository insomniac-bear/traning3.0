const fs = require('fs');

const heap = [];

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

const insert = (k) => {
  heap.push(k);
  let pos = heap.length - 1;
  while (pos > 0 && heap[pos] > heap[Math.floor((pos - 1) / 2)]) {
    swap(heap, pos, Math.floor((pos - 1) / 2));
    pos = Math.floor((pos - 1) / 2);
  }
};

const extract = () => {
  const res = heap[0];
  heap[0] = heap[heap.length - 1];
  let pos = 0;
  while (pos * 2 + 1 < heap.length - 1) {
    let maxChildIdx = pos * 2 + 1;
    if (heap[pos * 2 + 2] > heap[maxChildIdx]) {
      maxChildIdx = pos * 2 + 2;
    }
    if (heap[pos] < heap[maxChildIdx]) {
      swap(heap, pos, maxChildIdx);
      pos = maxChildIdx;
    } else {
      break;
    }
  }
  heap.pop();
  return res;
};

const workWithHeap = (commands) => {
  let res = '';
  const commandCount = Number(commands[0].trim());

  if (commandCount === 0) {
    return res + '\n';
  }

  let value = 0;
  let command = '';
  for (let i = 1; i <= commandCount; i++) {
    if (commands[i].length > 1) {
      command = commands[i].split(' ')[0].trim();
      value = Number(commands[i].split(' ')[1].trim());
    } else {
      command = commands[i].trim();
    }

    switch(command) {
      case '0':
        insert(value);
        break;
      case '1':
        res += extract() + '\n';
        break;
      default:
        break;
    }
  }
  return res;
};

let commands = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map(it => it.trim());
const result = workWithHeap(commands);

fs.writeFileSync("output.txt", result.toString());

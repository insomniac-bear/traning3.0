const fs = require('fs');

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

const sort = (heap) => {
  let heapEnd = heap.length - 1;
  while (heapEnd > 0) {
    let res = heap[0];
    heap[0] = heap[heapEnd];
    let pos = 0;

    while (pos * 2 + 1 < heapEnd) {
      let maxChildIdx = pos * 2 + 1;
      if (Number(heap[pos * 2 + 2]) > Number(heap[maxChildIdx])) {
        maxChildIdx = pos * 2 + 2;
      }
      if (Number(heap[pos]) < Number(heap[maxChildIdx])) {
        swap(heap, pos, maxChildIdx);
        pos = maxChildIdx;
      } else {
        break;
      }
    }

    heap[heapEnd] = res;
    heapEnd -= 1;
  }
};

const makeHeap = (arr) => {
  const firstParentIdx = Math.floor(arr.length / 2) - 1;

  for (let i = firstParentIdx; i >= 0; i--) {
    let pos = i;
    while (pos * 2 + 1 < arr.length) {
      let maxChildIdx = pos * 2 + 1;
      if (Number(arr[maxChildIdx]) < Number(arr[pos * 2 + 2])) {
        maxChildIdx = pos * 2 + 2;
      }
      if (arr[pos] < arr[maxChildIdx]) {
        swap(arr, pos, maxChildIdx);
      }
      pos = maxChildIdx;
    }
  }
};

let fileContent = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const arr = fileContent[1].trim().split(' ').map(it => Number(it.trim()));

makeHeap(arr);
sort(arr);

const result = arr.join(' ') + '\n';

fs.writeFileSync("output.txt", result.toString());

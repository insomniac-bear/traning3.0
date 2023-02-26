const fs = require('fs');

class Queue {
  constructor(arr) {
    this.queue = arr;
    this.length = arr.length;
    this.head = 0;
    this.tail = arr.length - 1;
    this.maxLength = 10;
  }

  push(n) {
    if (this.tail < this.maxLength - 1) {
      this.queue[this.tail + 1] = n;
      this.length += 1;
      this.tail = this.tail + 1;
    } else {
      this.queue[0] = n;
      this.length += 1;
      this.tail = 0;
    }
  }

  pop() {
    if (!this.length) {
      return false;
    }
    const val = this.queue[this.head];
    this.head = (this.head === this.maxLength - 1) ? 0 : this.head + 1;
    this.length -= 1;
    return val;
  }

  size() {
    return this.length;
  }

  getQueue() {
    return this.queue;
  }
}

const game = (player1, player2) => {
  let isGame = true;
  let countOfStep = 0;
  let result = '';

  while (isGame) {
    const cardOfFirst = player1.pop();
    const cardOfSecond = player2.pop();

    countOfStep += 1;


    if (cardOfFirst === 0) {
      if (cardOfSecond === 9) {
        player1.push(cardOfFirst);
        player1.push(cardOfSecond);
      } else {
        player2.push(cardOfFirst);
        player2.push(cardOfSecond);
      }
    } else if (cardOfSecond === 0) {
      if (cardOfFirst === 9) {
        player2.push(cardOfFirst);
        player2.push(cardOfSecond);
      } else {
        player1.push(cardOfFirst);
        player1.push(cardOfSecond);
      }
    } else if (cardOfFirst > cardOfSecond ) {
      player1.push(cardOfFirst);
      player1.push(cardOfSecond);
    } else {
      player2.push(cardOfFirst);
      player2.push(cardOfSecond);
    }

    if (!player1.size()) {
      isGame = false;
      result = `second ${countOfStep}` + '\n';
    }

    if (!player2.size()) {
      isGame = false;
      result = `first ${countOfStep}` + '\n';
    }

    if (countOfStep >= 10**6) {
      isGame = false;
      result = 'botva' + '\n';
    }
  }
  return result;
};

let cards = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const player1 = new Queue(cards[0].trim().split(' ').map(it => Number(it)));
const player2 = new Queue(cards[1].trim().split(' ').map(it => Number(it)));

let result = game(player1, player2);
fs.writeFileSync("output.txt", result.toString());

const revertToSecond = (arr) => {
  return (Number(arr[0]) * 60 + Number(arr[1])) * 60 + Number(arr[2]);
}

const revertToFoolTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const ss = seconds - minutes * 60 >= 10 ? `${seconds - minutes * 60}` : `0${seconds - minutes * 60}`;
  const mm = minutes - hours * 60 >= 10 ? `${minutes - hours * 60}` : `0${minutes - hours * 60}`;

  if (hours >= 24) {
    hours = hours - 24;
  }
  const hh = hours < 10 ? `0${hours}` : `${hours}`;

  return hh + ':' + mm + ':' + ss;
}

const fn = (fileContent) => {
  const data = fileContent.toString().split('\n');

  const sended = data[0].split(':');
  const sendedInSeconds = revertToSecond(sended);

  const exactTime = data[1].split(':');
  const exactTimeInSeconds = revertToSecond(exactTime);

  const incomingTime = data[2].split(':');
  const incomingTimeInSeconds = revertToSecond(incomingTime);

  const timeToDelayInSeconds = incomingTimeInSeconds > sendedInSeconds ? Math.round((incomingTimeInSeconds - sendedInSeconds) / 2) : Math.round(((incomingTimeInSeconds + 24 * 60 * 60) - sendedInSeconds) / 2);

  const exactInputTimeInSeconds = exactTimeInSeconds + timeToDelayInSeconds;
  return revertToFoolTime(exactInputTimeInSeconds);
}

process.stdin.on('data', data => {
  res = fn(data);
  process.stdout.write(res + '');
  process.exit();
});

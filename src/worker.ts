import { WorkerCommand } from "./interafaces";

function sendNotification(message: string) {
  new Notification(message, {
    icon: "/mini-tomato.svg",
  });
}

onmessage = function (e: MessageEvent) {
  const message: WorkerCommand = e.data;
  switch (message.command) {
    case "start":
      const interval = startTimer(message.timeout!);
      postMessage({ command: "timerStarted", intervalId: interval });
      break;
    case "stop":
      stopTimer(message.intervalId!);
      postMessage({ command: "timerStopped", intervalId: e.data.id });
      break;
    default:
      break;
  }
};

function startTimer(timeout: number): NodeJS.Timer {
  let date = new Date();
  date.setHours(0, timeout, 0);
  const interval = setInterval(() => {
    date.setSeconds(date.getSeconds() - 1);
    postMessage({ command: "tick", time: date });

    if (date.getSeconds() === 0 && date.getMinutes() === 0 && !!interval) {
      sendNotification("Pomidor is finished!");
      postMessage({ command: "timerFinished" });
      stopTimer(interval);
    }
  }, 1000);
  return interval;
}

function stopTimer(id: NodeJS.Timer) {
  clearInterval(id);
}
const a = 1;
export default a;

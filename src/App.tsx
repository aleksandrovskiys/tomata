import { useState } from "react";

function App() {
  const [timer, setTimer] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const [timeout, setTimeout] = useState<number | null>(null);
  const [interval, setIntervalValue] = useState<NodeJS.Timer | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const formattedTime = timer.toTimeString().split(" ")[0];
  function clearTimer() {
    if (interval) {
      clearInterval(interval);
      setIntervalValue(null);
    }
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    setTimer(newDate);
  }

  function stopTimer() {
    if (interval) {
      clearInterval(interval);
      setIntervalValue(null);
    }
  }

  const updateTimer = () => {
    setTimer((prevTimer) => {
      const newTimerValue = new Date(prevTimer);
      newTimerValue.setSeconds(prevTimer.getSeconds() - 1);
      return newTimerValue;
    });
  };
  if (timer.getSeconds() === 0 && timer.getMinutes() === 0 && !!interval) {
    setIsFinished(true);
    clearTimer();
  }
  return (
    <div>
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished" : null}</h2>
      <input
        type="number"
        onChange={(e) => setTimeout(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          if (!interval) {
            if (!!timeout) {
              const newDate = new Date();
              newDate.setHours(0, timeout, 0);
              setTimer(newDate);
            }
            const intervalNumber = setInterval(updateTimer, 1000);
            setIsFinished(false);
            setIntervalValue(intervalNumber);
          }
        }}
      >
        Start
      </button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={clearTimer}>Clear</button>
    </div>
  );
}

export default App;

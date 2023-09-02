import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const [timeout, setTimeout] = useState<number>(15);
  const [interval, setIntervalValue] = useState<NodeJS.Timer | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const formattedTime = timer.toTimeString().split(" ")[0];

  const handleKeyPress = (event: KeyboardEvent) => {
    console.log("key pressed", event.key);
    switch (event.key) {
      case "r":
        runTimer();
        event.stopPropagation();
        break;
      case "s":
        stopTimer();
        break;
      case "c":
        clearTimer();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  const runTimer = () => {
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
  };

  const clearTimer = () => {
    stopTimer();
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    setTimer(newDate);
  };

  function stopTimer() {
    console.log("interval", interval);
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
    <div className="app-container">
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished!" : null}</h2>
      <label>
        Start pomidor for&nbsp;
        <input
          type="number"
          className="timeout-input"
          autoFocus
          value={timeout}
          data-e2e="timeout-input"
          onChange={(e) => {
            if (e.target.value && parseInt(e.target.value) > 0) {
              setTimeout(parseInt(e.target.value));
            }
          }}
        />
        &nbsp;minutes
      </label>

      <div className="control-panel">
        <button accessKey="r" className="control-button" onClick={runTimer}>
          Run
        </button>
        <button accessKey="s" className="control-button" onClick={stopTimer}>
          Stop
        </button>
        <button accessKey="c" className="control-button" onClick={clearTimer}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;

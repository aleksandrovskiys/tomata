import { useEffect, useState } from "react";
import "./App.css";

function sendNotification(message: string) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

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
    switch (event.key) {
      case "r":
      case "Enter":
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
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    if (timer.getSeconds() === 0 && timer.getMinutes() === 0 && !!interval) {
      clearTimer();
      setIsFinished(true);
      sendNotification("Pomidor is finished!");
    }
  }, [timer, interval]);

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
        <button className="control-button" onClick={runTimer}>
          Run
        </button>
        <button className="control-button" onClick={stopTimer}>
          Stop
        </button>
        <button
          className="control-button"
          onClick={() => {
            clearTimer();
            setIsFinished(false);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { WorkerCommand } from "./interafaces";

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

  const worker = useMemo<Worker>(
    () => new Worker(new URL("./worker.ts", import.meta.url)),
    []
  );

  worker.onmessage = (e: MessageEvent) => {
    const message: WorkerCommand = e.data;
    switch (message.command) {
      case "timerStarted":
        if (message.intervalId) {
          setIntervalValue(message.intervalId);
        } else {
          console.error("Interval id is not defined");
        }
        break;
      case "timerStopped":
        setIntervalValue(null);
        clearTimer();
        break;
      case "timerFinished":
        setIsFinished(true);
        break;
      case "tick":
        updateTimer(message.time!);
        break;
      default:
        break;
    }
  };

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

  const runTimer = () => {
    worker.postMessage({ command: "start", timeout });
    setIsFinished(false);
  };

  const clearTimer = () => {
    stopTimer();
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    setTimer(newDate);
  };

  function stopTimer() {
    if (interval) {
      worker.postMessage({ command: "stop", intervalId: interval });
    }
  }

  const updateTimer = (newDate: Date) => {
    setTimer(newDate);
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

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { WorkerCommand } from "./interafaces";
import { Button } from "./components/Button";
import { TimeoutInput } from "./components/TimeoutInput";

function App() {
  const [timer, setTimer] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const [timeout, setTimeout] = useState<number | null>(25);
  const [interval, setIntervalValue] = useState<NodeJS.Timer | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const formattedTime = timer.toTimeString().split(" ")[0];

  const worker = useMemo<Worker>(
    () => new Worker(new URL("./worker.ts", import.meta.url)),
    []
  );

  const runTimer = () => {
    if (!timeout || timeout <= 0) {
      alert("Please set timeout");
      return;
    }
    let date = new Date();
    date.setHours(0, timeout, 0);
    setTimer(date);
    worker.postMessage({ command: "start", timeout });
    setIsFinished(false);
  };

  const clearTimer = () => {
    stopTimer();
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    setTimer(newDate);
    setIsFinished(false);
  };

  function stopTimer() {
    if (interval) {
      worker.postMessage({ command: "stop", intervalId: interval });
    }
  }

  const updateTimer = (newDate: Date) => {
    setTimer(newDate);
  };

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
        if (interval) {
          stopTimer();
        } else {
          runTimer();
          event.stopPropagation();
        }
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

  return (
    <div className="app-container">
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished!" : null}</h2>
      <label>
        Start pomidor for&nbsp;
        <TimeoutInput timeout={timeout} setTimeout={setTimeout} autoFocus />
        &nbsp;minutes
      </label>

      <div className="control-panel">
        {interval === null ? (
          <Button className="control-button" onClick={runTimer} text="Run" />
        ) : (
          <Button className="control-button" onClick={stopTimer} text="Stop" />
        )}
        <Button
          className="control-button"
          onClick={() => {
            clearTimer();
            setIsFinished(false);
          }}
          text="Clear"
        />
      </div>
    </div>
  );
}

export default App;

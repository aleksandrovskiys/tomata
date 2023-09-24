import { useEffect, useMemo, useState } from "react";
import "./TimerPage.css";
import { WorkerCommand } from "../../interafaces";
import { Button } from "../common/Button/Button";
import { TimeoutInput } from "../MainPage/TimeoutInput";
import PomodoroList from "../MainPage/PomodoroList";
import AppContainer from "../common/AppContainer/AppContainer";
import usePomodoros from "../../hooks/usePomodoros";
import { pluralize } from "../../utils";

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
  const {
    pomodoros,
    setPomodoros,
    isLoading: pomodorosIsLoading,
  } = usePomodoros();

  const worker = useMemo<Worker>(
    () => new Worker(new URL("../../worker.ts", import.meta.url)),
    [],
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
    setPomodoros([]);
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
        setIntervalValue(null);
        setIsFinished(true);
        const newPomodoros = [...pomodoros];
        newPomodoros.push({
          finished: new Date(),
          duration: timeout!,
        });
        setPomodoros(newPomodoros);
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
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  if (pomodorosIsLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AppContainer>
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished!" : null}</h2>
      <label className="timer-timeout-label">
        Start pomodoro for&nbsp;
        <TimeoutInput timeout={timeout} setTimeout={setTimeout} autoFocus />
        &nbsp;{pluralize(timeout || 0, "minute")}
      </label>

      <div className="control-panel">
        {interval === null ? (
          <Button onClick={runTimer} text="Run" />
        ) : (
          <Button onClick={stopTimer} text="Stop" />
        )}
        <Button
          onClick={() => {
            clearTimer();
            setIsFinished(false);
          }}
          text="Clear"
        />
      </div>
      <PomodoroList
        pomodoros={pomodoros.sort((a, b) => (a.finished > b.finished ? -1 : 1))}
      />
    </AppContainer>
  );
}

export default App;

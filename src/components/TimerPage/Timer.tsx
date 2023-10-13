import { useEffect, useMemo, useRef, useState } from "react";
import "./TimerPage.css";
import { Pomodoro, WorkerCommand } from "../../interafaces";
import { TimeoutInput } from "./TimeoutInput";
import Button from "../common/Button/Button";
import TaskInput from "./TaskInput";

interface Props {
  addPomodoro: (pomodoro: Pomodoro) => void;
  tasks: string[];
}

const Timer = ({ addPomodoro, tasks }: Props) => {
  const [timer, setTimer] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const [timeout, setTimeout] = useState<number | null>(25);
  const [interval, setIntervalValue] = useState<NodeJS.Timer | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [task, setTask] = useState<string>("");
  const taskInputRef = useRef<HTMLInputElement>(null);
  const formattedTime = timer.toTimeString().split(" ")[0];

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
    setTask("");
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
        const newPomodoro = {
          finished: new Date(),
          duration: timeout!,
          task,
        };
        addPomodoro(newPomodoro);
        break;
      case "tick":
        updateTimer(message.time!);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (
      taskInputRef.current === document.activeElement &&
      event.key !== "Enter"
    ) {
      return;
    }

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

  return (
    <>
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished!" : null}</h2>

      <TimeoutInput timeout={timeout} setTimeout={setTimeout} autoFocus />
      <TaskInput
        ref={taskInputRef}
        task={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
        tasks={tasks}
        disabled={interval !== null}
      />

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
    </>
  );
};

export default Timer;

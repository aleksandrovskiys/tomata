import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./TimerPage.css";
import { Pomodoro, WorkerCommand } from "../../interafaces";
import { TimeoutInput } from "./TimeoutInput";
import Button from "../common/Button/Button";
import TaskInput from "./TaskInput";

interface Props {
  addPomodoro: (pomodoro: Pomodoro) => void;
  tasks: string[];
}
const setCursorAtTheEnd = (element: HTMLDivElement) => {
  const range = document.createRange();
  const sel = window.getSelection();
  if (sel) {
    range.setStart(element, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

const Timer = ({ addPomodoro, tasks }: Props) => {
  const [timer, setTimer] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const [timeout, setTimeoutValue] = useState<number | null>(25);
  const [interval, setIntervalValue] = useState<NodeJS.Timer | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [task, setTask] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<string>("");
  const taskInputRef = useRef<HTMLInputElement>(null);
  const formattedTime = timer.toTimeString().split(" ")[0];

  const getMatchingTask = useCallback(
    (task: string) => {
      if (tasks.length === 0) {
        return "";
      }

      return tasks.filter((el) =>
        el.toLowerCase().startsWith(task.trim().toLowerCase()),
      )[0];
    },
    [tasks],
  );

  useEffect(() => {
    const placeholder = task
      ? getMatchingTask(task)?.slice(task.length) || ""
      : "";

    setAutocomplete(placeholder);
  }, [getMatchingTask, task, tasks]);

  const taskInputSetFocus = () => {
    if (
      document.activeElement !== taskInputRef.current &&
      taskInputRef.current &&
      taskInputRef.current.innerText !== ""
    ) {
      setCursorAtTheEnd(taskInputRef.current!);
    }
    taskInputRef.current?.focus();
  };

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

  function toggleTimer(event: KeyboardEvent) {
    if (interval) {
      stopTimer();
    } else {
      runTimer();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (taskInputRef.current === document.activeElement) {
      switch (event.key) {
        case " ":
          if (event.ctrlKey && !!autocomplete) {
            setTask(task + autocomplete);
            if (taskInputRef.current) {
              taskInputRef.current.innerText = task + autocomplete;
            }
            setCursorAtTheEnd(taskInputRef.current!);
            event.preventDefault();
          }
          break;
        case "Enter":
          toggleTimer(event);
          break;
        default:
          break;
      }
    } else {
      switch (event.key) {
        case "r":
        case "Enter":
          toggleTimer(event);
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
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <h1>{formattedTime}</h1>
      <h2>{isFinished ? "Finished!" : null}</h2>

      <TimeoutInput timeout={timeout} setTimeout={setTimeoutValue} autoFocus />
      <TaskInput
        ref={taskInputRef}
        task={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
        tasks={tasks}
        inputSetFocus={taskInputSetFocus}
        autocomplete={autocomplete}
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

import { Pomodoro } from "../../interafaces";

interface Props {
  pomodoro: Pomodoro;
}
export function PomodoroListElement({ pomodoro }: Props) {
  return (
    <li>
      {pomodoro.finished.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23",
      })}{" "}
      {pomodoro.duration} minute
      {pomodoro.task ? " work on " + pomodoro.task : ""}{" "}
    </li>
  );
}

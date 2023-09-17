import { Pomodoro } from "../../interafaces";

interface Props {
  pomodoro: Pomodoro;
  key: number;
}
export function PomodoroListElement({ pomodoro, key }: Props) {
  return (
    <li key={key}>
      {pomodoro.finished.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23",
      })}{" "}
      {pomodoro.duration} minute
      {String(pomodoro.duration).endsWith("1") ? "" : "s"}
    </li>
  );
}

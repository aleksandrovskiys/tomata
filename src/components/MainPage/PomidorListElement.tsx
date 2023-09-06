import { Pomidor } from "../../interafaces";

interface Props {
  pomidor: Pomidor;
  key: number;
}
export function PomidorListElement({ pomidor, key }: Props) {
  return (
    <li key={key}>
      {pomidor.finished.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23",
      })}{" "}
      {pomidor.duration} minute
      {String(pomidor.duration).endsWith("1") ? "" : "s"}
    </li>
  );
}

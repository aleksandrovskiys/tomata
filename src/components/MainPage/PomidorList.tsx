import { Pomodoro } from "../../interafaces";
import { PomodoroListElement } from "./PomodoroListElement";

interface Props {
  pomodoros: Pomodoro[];
}
export const PomodoroList = ({ pomodoros }: Props) => {
  return (
    <div>
      <ul>
        {pomodoros.map((pomidor, idx) => (
          <PomodoroListElement pomodoro={pomidor} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default PomodoroList;

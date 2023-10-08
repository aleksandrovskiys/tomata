import { pluralize } from "../../utils";
import "./TimerPageInput.css";

interface TimeoutInputProps extends React.ComponentProps<"input"> {
  timeout: number | null;
  setTimeout: (timeout: number | null) => void;
}

export function TimeoutInput({
  timeout,
  setTimeout,
  ...args
}: TimeoutInputProps): JSX.Element {
  return (
    <label className="timer-timeout-label">
      Start pomodoro for&nbsp;
      <input
        type="number"
        className="timeout-input timer-page-input"
        value={timeout!}
        onChange={(e) => {
          if (e.target.value && parseInt(e.target.value) > 0) {
            setTimeout(parseInt(e.target.value));
          } else {
            setTimeout(0);
          }
        }}
        {...args}
      />
      &nbsp;{pluralize(timeout || 0, "minute")}
    </label>
  );
}

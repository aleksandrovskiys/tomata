import { pluralize } from "../../utils";
import "./TimeoutInput.css";

interface TimeoutInputProps extends React.HTMLAttributes<HTMLInputElement> {
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
        className="timeout-input"
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

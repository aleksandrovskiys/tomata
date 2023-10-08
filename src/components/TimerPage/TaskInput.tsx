import { forwardRef } from "react";
import "./TimerPageInput.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  task: string;
}
const TaskInput = forwardRef(
  (
    { task, onChange, ...rest }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label className="timer-timeout-label">
        to work on &nbsp;
        <input
          className="timer-page-input task-input"
          type="text"
          value={task}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
      </label>
    );
  },
);

export default TaskInput;

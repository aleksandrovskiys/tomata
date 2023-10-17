import { forwardRef } from "react";
import "./TimerPageInput.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputSetFocus?: () => void;
  tasks: string[];
  task: string;
  autocomplete: string;
}
const TaskInput = forwardRef(
  (
    { task, onChange, tasks, inputSetFocus, autocomplete, ...rest }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label className="timer-timeout-label">
        <div className="task-input-text">to work on</div>
        <div
          className="timer-page-input task-input noselect"
          onClick={inputSetFocus}
        >
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              onChange({
                target: {
                  value: e.currentTarget.innerText,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            ref={ref}
            {...rest}
          />
          <span style={{ color: "darkgrey" }}>{autocomplete}</span>
        </div>
      </label>
    );
  },
);

export default TaskInput;

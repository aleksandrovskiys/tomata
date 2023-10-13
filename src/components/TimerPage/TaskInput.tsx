import { forwardRef } from "react";
import "./TimerPageInput.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tasks: string[];
  task: string;
}
const TaskInput = forwardRef(
  (
    { task, onChange, tasks, ...rest }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const getMatchingTask = (task: string) => {
      if (tasks.length === 0) {
        return "";
      }

      return tasks.filter((el) =>
        el.toLowerCase().startsWith(task.trim().toLowerCase()),
      )[0];
    };

    const placeholder = task
      ? getMatchingTask(task)?.slice(task.length) || ""
      : "";

    return (
      <label className="timer-timeout-label">
        <div className="task-input-text">to work on</div>
        <div className="timer-page-input task-input noselect">
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
          <span style={{ color: "darkgrey" }}>{placeholder}</span>
        </div>
      </label>
    );
  },
);

export default TaskInput;

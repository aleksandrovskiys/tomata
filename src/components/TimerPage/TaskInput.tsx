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
    const taskAutocompletionRef = ref as React.RefObject<HTMLSpanElement>;
    const placeholder = task
      ? tasks
          .filter((el) => el.toLowerCase().startsWith(task.toLowerCase()))[0]
          .slice(task.length) || ""
      : "";

    console.log("task input rerender", task, tasks);
    return (
      <label className="timer-timeout-label">
        <div className="task-input-text">to work on</div>
        <div
          className="timer-page-input task-input"
          contentEditable={true}
          onInput={(e) => {
            if (e.currentTarget.innerText === "") {
              taskAutocompletionRef.current!.innerText = "";
            }
            e.preventDefault();
            onChange({
              target: { value: e.currentTarget.childNodes[0].nodeValue },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          ref={ref}
          {...rest}
        >
          <span ref={taskAutocompletionRef} style={{ color: "darkgrey" }}>
            {placeholder}
          </span>
        </div>
      </label>
    );
  },
);

export default TaskInput;

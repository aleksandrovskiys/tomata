interface TimeoutInputProps extends React.HTMLAttributes<HTMLInputElement> {
  timeout: number;
  setTimeout: (timeout: number) => void;
}

export function TimeoutInput({
  timeout,
  setTimeout,
  ...args
}: TimeoutInputProps): JSX.Element {
  return (
    <input
      type="number"
      className="timeout-input"
      value={timeout}
      onChange={(e) => {
        if (e.target.value && parseInt(e.target.value) > 0) {
          setTimeout(parseInt(e.target.value));
        }
      }}
      {...args}
    />
  );
}

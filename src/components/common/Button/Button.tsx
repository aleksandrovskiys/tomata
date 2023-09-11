import "./Button.css";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, onClick, ...args }: Props) {
  return (
    <button className="control-button" onClick={onClick} {...args}>
      {text}
    </button>
  );
}

export default Button;

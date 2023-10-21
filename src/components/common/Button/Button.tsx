import "./Button.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ text, onClick, ...args }: ButtonProps) {
  return (
    <button className="control-button" onClick={onClick} {...args}>
      {text}
    </button>
  );
}

export default Button;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: Props) {
  return (
    <button className="control-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

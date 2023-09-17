import "./Form.css";
interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ children, onSubmit, className }: Props) {
  return (
    <form noValidate className={className + " form"} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;

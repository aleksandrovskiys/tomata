import "./Form.css";
interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ children, onSubmit, className, ...rest }: Props) {
  return (
    <form
      noValidate
      className={className + " form"}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  );
}

export default Form;

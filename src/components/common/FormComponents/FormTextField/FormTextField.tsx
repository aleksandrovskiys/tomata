import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import "./FormTextField.css";

interface Props<T extends FieldValues>
  extends UseControllerProps<T>,
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "placeholder" | "className" | "type"
  > { }

function FormInputField<T extends FieldValues>(props: Props<T>) {
  const { name, control, rules, className, type } = props;
  const { field, fieldState } = useController({ name, control, rules });

  const errorMessage = fieldState.invalid
    ? fieldState.error?.message
    : "Invalid value";
  return (
    <>
      <input
        {...props}
        type={type}
        className={className}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
      />
      {fieldState.invalid && <p className="error-block">{errorMessage}</p>}
    </>
  );
}

export default FormInputField;

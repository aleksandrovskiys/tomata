import { useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";
import { RegisterInputs } from "./RegisterPage";

interface Props {
  onSubmit: (data: RegisterInputs) => void;
}

const RegistrationForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control, getValues } = useForm<RegisterInputs>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="register-form"
        noValidate
      >
        <FormInputField
          autoFocus
          name="email"
          className="register-text-input"
          type="email"
          control={control}
          rules={emailValidationRules}
          placeholder="email"
        />
        <FormInputField
          name="password"
          className="register-text-input"
          placeholder="password"
          control={control}
          type="password"
          rules={{
            required: "Password is a required field",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 symbols long",
            },
          }}
        />
        <FormInputField
          name="passwordConfirmation"
          className="register-text-input"
          placeholder="confirm"
          control={control}
          type="password"
          rules={{
            required: "Password confirmation is a required field",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 symbols long",
            },
            validate: (value) => {
              return value === getValues("password") || "Passwords don't match";
            },
          }}
        />
        <Button onClick={handleSubmit(onSubmit)} text="Register" />
      </form>
    </>
  );
};

export default RegistrationForm;

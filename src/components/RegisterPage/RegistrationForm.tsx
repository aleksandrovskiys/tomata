import { useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
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
      <Form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
        <FormInputField
          autoFocus
          name="email"
          type="email"
          control={control}
          rules={emailValidationRules}
          placeholder="email"
        />
        <FormInputField
          name="password"
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
      </Form>
    </>
  );
};

export default RegistrationForm;

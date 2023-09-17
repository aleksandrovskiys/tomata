import { FieldValues, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";

export interface LoginInputs extends FieldValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginInputs) => void;
}

export function LoginForm({ onSubmit }: Props) {
  const { handleSubmit, control } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        type="password"
        control={control}
        rules={{
          required: "Password is a required field",
        }}
        placeholder="password"
      />
      <Button type="submit" text="Login" onClick={handleSubmit(onSubmit)} />
    </Form>
  );
}

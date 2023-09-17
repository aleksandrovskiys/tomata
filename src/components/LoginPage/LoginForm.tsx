import { FieldValues, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";

export interface LoginInputs extends FieldValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const { handleSubmit, control } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginInputs) => {
    console.log(data);
  };

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

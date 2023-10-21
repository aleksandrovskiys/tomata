import { FieldValues, useForm } from "react-hook-form";
import { AuthenticationButtonContainer } from "../common/AuthenticationButtonContainer/AuthenticationButtonContainer";
import AuthFormButton from "../common/AuthFormButton/AuthFormButton";
import Form from "../common/Form/Form";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";

export interface LoginInputs extends FieldValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginInputs) => void;
  onGoogleLoginClicked: () => void;
}

export function LoginForm({ onSubmit, onGoogleLoginClicked }: Props) {
  const { handleSubmit, control } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "320px" }}>
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
      <AuthenticationButtonContainer>
        <AuthFormButton
          type="submit"
          text="Login"
          onClick={handleSubmit(onSubmit)}
          style={{ margin: "0" }}
        />
        <AuthFormButton
          type="button"
          text="Login with Google"
          onClick={onGoogleLoginClicked}
        />
      </AuthenticationButtonContainer>
    </Form>
  );
}

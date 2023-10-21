import { useForm } from "react-hook-form";
import { AuthenticationButtonContainer } from "../common/AuthenticationButtonContainer/AuthenticationButtonContainer";
import AuthFormButton from "../common/AuthFormButton/AuthFormButton";
import Form from "../common/Form/Form";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";
import { RegisterInputs } from "./RegisterPage";

interface Props {
  onSubmit: (data: RegisterInputs) => void;
  onSignUpWithGoogleClicked: () => void;
}

const RegistrationForm = ({ onSubmit, onSignUpWithGoogleClicked }: Props) => {
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
      <Form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
        style={{ maxWidth: "320px" }}
      >
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
        <AuthenticationButtonContainer>
          <AuthFormButton
            onClick={handleSubmit(onSubmit)}
            text="Register"
            type="submit"
          />
          <AuthFormButton
            onClick={onSignUpWithGoogleClicked}
            text="Sign Up With Google"
            type="button"
          />
        </AuthenticationButtonContainer>
      </Form>
    </>
  );
};

export default RegistrationForm;

import AppContainer from "../common/AppContainer/AppContainer";
import Button from "../common/Button/Button";
import { useForm, FieldValues } from "react-hook-form";
import "./RegisterPage.css";
import FormInputField from "../common/FormComponents/FormTextField/FormTextField";
import { emailValidationRules } from "../common/FormComponents/rules";
import { register } from "../../api/api";

interface Inputs extends FieldValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage = () => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: Inputs) {
    console.log("On submit", data);
    try {
      await register({ email: data.email, password: data.password }).then(() => alert("Registration successful!")).catch(err => console.log(err));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <AppContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="register-form" noValidate>
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
          rules={{ required: "Password is a required field", minLength: { value: 8, message: "Password should be minimum 8 symbols long" } }}
        />
        <FormInputField
          name="passwordConfirmation"
          className="register-text-input"
          placeholder="confirm"
          control={control}
          type="password"
          rules={{ required: "Password confirmation is a required field", minLength: { value: 8, message: "Password should be minimum 8 symbols long" } }}
        />

        <Button onClick={handleSubmit(onSubmit)} text="Register" />
      </form>
    </AppContainer>
  );
};

export default RegisterPage;

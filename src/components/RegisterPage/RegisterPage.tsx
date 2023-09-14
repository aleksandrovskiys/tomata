import React from "react";

import AppContainer from "../common/AppContainer/AppContainer";
import { FieldValues } from "react-hook-form";
import "./RegisterPage.css";
import { register } from "../../api/api";
import RegistrationErrorBlock from "./RegistrationErrorBlock";
import RegistrationForm from "./RegistrationForm";

export interface RegisterInputs extends FieldValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage = () => {
  const [error, setError] = React.useState<string>("");

  async function onSubmit(data: RegisterInputs) {
    await register({ email: data.email, password: data.password })
      .then(() => alert("Registration successful!"))
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <AppContainer>
      <h2>Register</h2>
      {!!error ? (
        <RegistrationErrorBlock
          error={error}
          onResetError={() => setError("")}
        />
      ) : (
        <RegistrationForm onSubmit={onSubmit} />
      )}
    </AppContainer>
  );
};

export default RegisterPage;

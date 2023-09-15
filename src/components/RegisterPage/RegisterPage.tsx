import React from "react";

import AppContainer from "../common/AppContainer/AppContainer";
import { FieldValues } from "react-hook-form";
import "./RegisterPage.css";
import { register } from "../../api/api";
import RegistrationErrorBlock from "./RegistrationErrorBlock";
import RegistrationForm from "./RegistrationForm";
import RegistrationSuccessful from "./RegistrationSuccessful";

export interface RegisterInputs extends FieldValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage = () => {
  const [error, setError] = React.useState<string>("");
  const [registrationSuccessful, setRegistrationSuccessful] = React.useState<
    boolean | undefined
  >(undefined);
  const [registerIsLoading, setRegisterIsLoading] =
    React.useState<boolean>(false);

  async function onSubmit(data: RegisterInputs) {
    setRegisterIsLoading(true);
    await register({ email: data.email, password: data.password })
      .then(() => {
        setRegistrationSuccessful(true);
        setRegisterIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setRegisterIsLoading(false);
        setRegistrationSuccessful(false);
      });
  }

  if (registerIsLoading)
    return (
      <AppContainer>
        <h2>Loading...</h2>
      </AppContainer>
    );

  return (
    <AppContainer>
      <h2>Register</h2>
      {!!registrationSuccessful ? (
        <RegistrationSuccessful />
      ) : registrationSuccessful === false ? (
        <RegistrationErrorBlock
          error={error}
          onResetError={() => {
            setError("");
            setRegistrationSuccessful(undefined);
          }}
        />
      ) : (
        <RegistrationForm onSubmit={onSubmit} />
      )}
    </AppContainer>
  );
};

export default RegisterPage;

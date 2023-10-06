import { login } from "../../api/api";
import AppContainer from "../common/AppContainer/AppContainer";
import { LoginForm, LoginInputs } from "./LoginForm";
import React from "react";

export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(data: LoginInputs) {
    setError(null);
    setIsLoggedIn(false);
    login(data)
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setError(err);
        setIsLoggedIn(false);
      });
  }

  return (
    <AppContainer>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <LoginForm onSubmit={onSubmit} />
      )}
    </AppContainer>
  );
}

export default LoginPage;

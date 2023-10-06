import { login } from "../../api/api";
import AppContainer from "../common/AppContainer/AppContainer";
import { LoginForm, LoginInputs } from "./LoginForm";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader/Loader";

export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { saveToken } = useAuth();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: LoginInputs) {
    setError(null);
    setIsLoggedIn(false);
    login(data)
      .then((res) => {
        setIsLoggedIn(true);
        saveToken(res.token);
        navigate("/");
      })
      .catch((err: string) => {
        setError(err);
        setIsLoggedIn(false);
        saveToken(null);
      });
  }

  React.useEffect(() => {
    if (!!user) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AppContainer>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      {isLoggedIn ? (
        <>
          <p>You are logged in!</p>
          <p>Redirecting...</p>
        </>
      ) : (
        <LoginForm onSubmit={onSubmit} />
      )}
    </AppContainer>
  );
}

export default LoginPage;

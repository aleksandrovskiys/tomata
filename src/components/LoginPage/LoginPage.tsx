import AppContainer from "../common/AppContainer/AppContainer";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <AppContainer>
      <h2>Login</h2>
      <LoginForm />
    </AppContainer>
  );
}

export default LoginPage;

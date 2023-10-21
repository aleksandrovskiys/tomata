import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import TimerPage from "./components/TimerPage/TimerPage";
import "./App.css";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import { AuthProvider } from "./hooks/useAuth";
import DefaultNavbar from "./components/common/NavigationBar/DefaultNavbar/DefaultNavbar";
import GoogleAuthCallback from "./components/GoogleAuthCallback/GoogleAuthCallback";
import GoogleSignupCallback from "./components/GoogleSignupCallback/GoogleSignupCallback";

export function App() {
  const integrationActivated = process.env.REACT_APP_INTEGRATION_ACTIVATED;

  return (
    <>
      <AuthProvider>
        <DefaultNavbar integrationActivated={integrationActivated} />
        <Routes>
          <Route
            path="/"
            element={<TimerPage />}
            errorElement={<h1>Oopsies, this page is not implemented yet...</h1>}
          />

          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="/openid/callback" element={<GoogleAuthCallback />} />
          <Route
            path="/openid/signup-callback"
            element={<GoogleSignupCallback />}
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

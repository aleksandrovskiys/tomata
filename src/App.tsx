import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import TimerPage from "./components/TimerPage/TimerPage";
import TopBar from "./components/common/NavigationBar/TopBar/TopBar";
import "./App.css";
import NavbarLink from "./components/common/NavigationBar/NavbarLink/NavbarLink";

export function App() {
  const integrationActivated = process.env.REACT_APP_INTEGRATION_ACTIVATED;
  return (
    <>
      <TopBar>
        <NavbarLink to="/">Timer</NavbarLink>
        {integrationActivated === "true" ? (
          <>
            <NavbarLink to="/login">Login</NavbarLink>
            <NavbarLink to="/register">Register</NavbarLink>
          </>
        ) : null}
      </TopBar>
      <Routes>
        <Route
          path="/"
          element={<TimerPage />}
          errorElement={<h1>Oopsies, this page is not implemented yet...</h1>}
        />

        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

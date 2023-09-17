import { NavLink, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import TimerPage from "./components/TimerPage/TimerPage";
import TopBar from "./components/common/NavigationBar/TopBar";
import "./App.css";

export function App() {
  return (
    <>
      <TopBar>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
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
